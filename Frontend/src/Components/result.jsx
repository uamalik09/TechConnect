import React from "react";
import { useLocation } from "react-router-dom";

const Result = () => {
    const location = useLocation();
    const submitted = location.state?.submitted;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            {submitted && (
                <div className="bg-green-500 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md mb-4">
                    🎉 Quiz Submitted Successfully!
                </div>
            )}
        </div>
    );
};

export default Result;
