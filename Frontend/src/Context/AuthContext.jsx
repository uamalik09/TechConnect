 import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// // AuthProvider: Manages login state and provides login/logout functions
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Load user data from localStorage when the app starts
//   useEffect(() => {
//     const storedUser = localStorage.getItem("userData");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   // Function to log in
//   const login = (userData) => {
//     localStorage.setItem("userData", JSON.stringify(userData));
//     setUser(userData);
//   };

//   // Function to log out
//   const logout = () => {
//     localStorage.removeItem("userData");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to access authentication state
// export const useAuth = () => {
//   return useContext(AuthContext);
// };
// import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Load from localStorage if available
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Function to handle login
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // Store in localStorage
    };

    // Function to handle logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user"); // Clear localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
