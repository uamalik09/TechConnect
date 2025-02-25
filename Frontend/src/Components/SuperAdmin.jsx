import { useEffect, useState } from "react";

export default function SuperAdminPanel() {
  const [users, setUsers] = useState([]);

  // Fetch users when component loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token in localStorage:", token);
    fetch("http://localhost:8080/superadmin/get-all-users") // Correct API endpoint
      .then((res) => res.json())
      .then((data) => setUsers(data.users)) // Access users array from response
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Function to assign admin role
  const assignAdmin = (email) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (userRole !== "admin") {
        alert("You are not authorized to perform this action.");
        return;
    }

    fetch("http://localhost:8080/superadmin/make-admin", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`,
            "Authorization": localStorage.getItem("token"),
        },
        body: JSON.stringify({ email }) // Send email in request body
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.success) {
            setUsers(users.map((user) =>
                user.email === email ? { ...user, role: "admin" } : user
            ));
        } else {
            alert(data.message);
        }
    })
    .catch((err) => console.error("Error assigning admin:", err));
};

  return (
    <div className="min-h-screen p-10 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Super Admin Panel</h1>
      <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email} className="border-b border-gray-600">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">
                {user.role !== "admin" && (
                  <button 
                    onClick={() => assignAdmin(user.email)} 
                    className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
                    Make Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
