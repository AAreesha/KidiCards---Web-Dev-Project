import { useEffect, useState } from 'react';
import { getFirestore, collection, getDoc, doc, onSnapshot } from 'firebase/firestore';
import { auth } from '../../firebase'; // Ensure auth is imported
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
                const userId = auth.currentUser.uid; // Get current user's ID
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
            unsubscribe(); // Clean up the listener on component unmount
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="score-page">
            <NavBar />
            <h1 className="score-heading">Your Scores</h1>
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
