// import { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios'; // Make sure to import axios

// // Create the auth context
// const AuthContext = createContext(null);

// // Custom hook to use the auth context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const verifyToken = async (token) => {
//     // Set the authorization header
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
//     try {
//       // Make a request to your authentication verification endpoint
//       const response = await axios.get('/api/auth/verify');
//       return response.data.valid; // Assuming your API returns a valid flag
//     } catch (error) {
//       console.error("Token validation failed:", error);
//       return false;
//     }
//   };

//   useEffect(() => {
//     // Load and verify user data from localStorage on initial mount
//     const loadUser = async () => {
//       const storedUser = localStorage.getItem("user");
      
//       if (storedUser) {
//         try {
//           const userData = JSON.parse(storedUser);
          
//           // Verify the token with backend
//           if (userData.token && await verifyToken(userData.token)) {
//             setUser(userData);
//           } else {
//             // Token invalid or expired
//             localStorage.removeItem("user");
//             setUser(null);
//           }
//         } catch (error) {
//           console.error("Error parsing stored user data:", error);
//           localStorage.removeItem("user");
//         }
//       }
      
//       setLoading(false);
//     };

//     loadUser();
//   }, []);

//   // Function to handle login
//   const login = (userData) => {
//     // Make sure the token is included in userData
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
    
//     // Set the authorization header for future requests
//     if (userData && userData.token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
//     }
//   };

//   // Function to handle logout
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     // Remove the authorization header
//     delete axios.defaults.headers.common['Authorization'];
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          const isValid = await verifyToken(userData.token);
          if (isValid) {
            setUser(userData);
            axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
          } else {
            logout();
          }
        } catch (error) {
          console.error("Error parsing stored user data:", error);
          logout();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await axios.get("/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.valid;
    } catch (error) {
      console.error("Token validation failed:", error);
      return false;
    }
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading ? children : <div>Loading...</div>} {/* ✅ Waits for auth state */}
    </AuthContext.Provider>
  );
};
