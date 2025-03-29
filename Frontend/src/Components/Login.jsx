import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLoginData({
            ...loginData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        console.log("Form Data before sending:", loginData);
    
        if (!loginData.email || !loginData.password) {
            setErrorMessage("All fields are required!");
            setIsLoading(false);
            return;
        }
    
        console.log("Form Submitted", loginData);
    
        try {
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
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
            console.log(result); // Log the full response to verify the structure
            
            // Check if response has a success flag
            if (result.success) {
                // Safely access user object and its properties
                const jwtToken = result.jwtToken || result.token;
                const user = result.user || {};
                const name = user?.name || "User";
                const role = user?.role || "student";
                
                // Store token and simple values as regular strings
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                localStorage.setItem('userRole', role);
                
                // Store complete user info as properly formatted JSON
                if (user) {
                    const userInfo = {
                        name: name,
                        email: user.email || loginData.email,
                        role: role,
                        id: user.id || user._id || ""
                    };
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));
                }
                
                console.log("User Role: ", role);
                
                // Navigate based on role
                switch(role.toLowerCase()) {
                    case 'admin':
                        navigate('/admindashboard');
                        break;
                    case 'iet':
                        navigate('/ietdashboard');
                        break;
                    case 'ieee':
                        navigate('/ieeedashboard');
                        break;
                    case 'acm':
                        navigate('/acmdashboard');
                        break;
                    case 'ie':
                        navigate('/iedashboard');
                        break;
                    case 'iste':
                        navigate('/istedashboard');
                        break;
                    default:
                        navigate('/studentdashboard');
                }
            } else {
                // Handle server-side error messages
                if (result.error && result.error.details && result.error.details.length > 0) {
                    setErrorMessage(result.error.details[0].message);
                } else {
                    setErrorMessage(result.message || "Login failed. Please try again.");
                }
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
                            <div className="p-4 mb-4 text-sm rounded-lg bg-red-900 text-red-100 border border-red-800" role="alert">
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
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input 
                                            id="remember" 
                                            name="remember" 
                                            type="checkbox" 
                                            checked={loginData.remember} 
                                            onChange={handleChange} 
                                            className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-blue-600" 
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="/forgot-password" className="text-sm font-medium text-blue-400 hover:text-blue-300">
                                    Forgot password?
                                </a>
                            </div>
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className={`w-full text-white ${isLoading ? 'bg-blue-700 opacity-70' : 'bg-blue-600 hover:bg-blue-700'} focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-200 flex justify-center items-center`}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </>
                                ) : "Sign in"}
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