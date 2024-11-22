import { useEffect, useState } from 'react';
import { getFirestore, collection, getDoc, doc, onSnapshot } from 'firebase/firestore';
import { auth } from '../../firebase';
import NavBar from '../../components/NavBar/NavBar';
import './scores.css';

const ScorePage = () => {
    const [scores, setScores] = useState({ english: {}, urdu: {} });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const db = getFirestore();
        
        // Fetch categories from Firestore
        const unsubscribe = onSnapshot(collection(db, "categories"), (snapshot) => {
            setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        // Fetch user scores from Firestore
        const fetchScores = async () => {
            try {
                const userId = auth.currentUser.uid;
                const userRef = doc(db, `users/${userId}`);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setScores(userData.scores || { english: {}, urdu: {} });
                } else {
                    console.log('No user document found.');
                }
            } catch (error) {
                console.error("Error fetching user scores:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchScores();

        return () => {
            unsubscribe();
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }


    // Top scoring category
    const topCategory = categories.reduce((top, category) => {
        const englishScore = scores.english?.[category.id] ?? 0;
        const urduScore = scores.urdu?.[category.id] ?? 0;
        const totalCategoryScore = englishScore + urduScore;

        return totalCategoryScore > (top?.totalScore || 0)
            ? { name: category.name, totalScore: totalCategoryScore }
            : top;
    }, null);

    // Remaining categories to complete
    const completedCategories = categories.filter((category) => {
        const englishScore = scores.english?.[category.id] ?? 0;
        const urduScore = scores.urdu?.[category.id] ?? 0;
        return englishScore > 0 || urduScore > 0;
    }).length;

    const remainingCategories = categories.length - completedCategories;

        // Calculate overall progress
    const totalScores = Object.values(scores.english).reduce((sum, score) => sum + score, 0) +
    Object.values(scores.urdu).reduce((sum, score) => sum + score, 0);
    console.log("Scores",totalScores)
    const progress = Math.min((completedCategories / categories.length) * 100, 100);


    return (
        <div className="score-page">
            <NavBar />
            <h1 className="score-heading">Your Scores</h1>

            {/* Motivational Statement */}
            <div className="motivation">
                {progress === 100
                    ? "Fantastic work! You've mastered all categories!"
                    : progress > 50
                    ? "Great job! You're more than halfway there!"
                    : "Keep going! Every step counts toward your goal!"}
            </div>

            {/* Progress Bar */}
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="progress-text">Overall Progress: {Math.round(progress)}%</p>

            {/* Cards for Insights */}
            <div className="cards-container">
                <div className="card">
                    <h2>Top Scoring Category</h2>
                    <p>{topCategory ? topCategory.name : "No scores yet"}</p>
                    <p>Score: {topCategory ? topCategory.totalScore : 0}</p>
                </div>
                <div className="card">
                    <h2>Categories Left</h2>
                    <p>{remainingCategories} categories to go!</p>
                </div>
            </div>

            {/* Scores Table */}
            <table className="score-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>English Score</th>
                        <th>Urdu Score</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>{scores.english?.[category.id] ?? 0}</td>
                            <td>{scores.urdu?.[category.id] ?? 0}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScorePage;
