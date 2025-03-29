import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"; // Import useAuth

function Login() {
    const { login } = useAuth(); // Use the AuthContext
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        if (!loginData.email || !loginData.password) {
            setErrorMessage("All fields are required!");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: loginData.email,
                    password: loginData.password,
                }),
            });

            const result = await response.json();
            console.log(result);

            if (result.success) {
                const user = {
                    name: result.user?.name || "User",
                    email: result.user?.email || loginData.email,
                    role: result.user?.role || "student",
                    token: result.jwtToken || result.token
                };

                login(user);

                switch (user.role.toLowerCase()) {
                    case 'admin': navigate('/admindashboard'); break;
                    case 'iet': navigate('/ietdashboard'); break;
                    case 'ieee': navigate('/ieeedashboard'); break;
                    case 'acm': navigate('/acmdashboard'); break;
                    case 'ie': navigate('/iedashboard'); break;
                    case 'iste': navigate('/istedashboard'); break;
                    default: navigate('/studentdashboard');
                }
            } else {
                setErrorMessage(result.message || "Login failed. Please try again.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setErrorMessage("An error occurred. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-3xl font-bold text-white">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Tech Connect</span>
                </a>
                <div className="w-full bg-gray-800 rounded-xl shadow-xl border border-gray-700 md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                            Sign in to your account
                        </h1>

                        {errorMessage && (
                            <div className="p-4 mb-4 text-sm rounded-lg bg-red-900 text-red-100 border border-red-800">
                                <span className="font-medium">Error:</span> {errorMessage}
                            </div>
                        )}

                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    value={loginData.email} 
                                    onChange={handleChange} 
                                    className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                                    placeholder="name@nitk.edu.in" 
                                    required 
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    value={loginData.password} 
                                    onChange={handleChange} 
                                    placeholder="••••••••" 
                                    className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                                    required 
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className={`w-full text-white ${isLoading ? 'bg-blue-700 opacity-70' : 'bg-blue-600 hover:bg-blue-700'} focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                            >
                                {isLoading ? "Signing in..." : "Sign in"}
                            </button>
                            <p className="text-sm font-light text-gray-400">
                                Don't have an account yet? <a href="/signup" className="font-medium text-blue-400 hover:text-blue-300">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;