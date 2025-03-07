// components/QuizSubmissions.jsx
import { useState, useEffect } from "react";

const QuizSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/questions/iet/cipher/submissions', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setSubmissions(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching submissions:", error);
            setError("Failed to load submissions");
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mb-6">
            <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
                Quiz Submissions
            </h2>
            
            {error ? (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase">Score</th>
                                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase">Submitted At</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            {submissions.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="py-4 px-4 border-b border-gray-200 text-center">
                                        No submissions found.
                                    </td>
                                </tr>
                            ) : (
                                submissions.map((submission) => (
                                    <tr key={submission._id}>
                                        <td className="py-3 px-4 border-b border-gray-200">
                                            {submission.userId.name} ({submission.userId.email})
                                        </td>
                                        <td className="py-3 px-4 border-b border-gray-200">
                                            {submission.score} / {submission.answers.length}
                                        </td>
                                        <td className="py-3 px-4 border-b border-gray-200">
                                            {new Date(submission.submittedAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default QuizSubmissions;