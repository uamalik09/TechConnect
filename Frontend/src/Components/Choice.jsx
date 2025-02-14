import { Link } from "react-router-dom";
import { FaUserGraduate, FaUserShield } from "react-icons/fa";

export default function ChoicePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Choose Your Role</h1>
      <div className="flex gap-8">
        {/* Student Card */}
        <Link to="/login" className="group">
          <div className="bg-blue-600 p-6 rounded-lg shadow-lg text-center w-64 hover:scale-105 transition transform hover:bg-blue-700">
            <FaUserGraduate size={60} className="text-white mx-auto mb-4 group-hover:rotate-6 transition" />
            <h2 className="text-2xl font-semibold">Student</h2>
          </div>
        </Link>
        {/* Admin Card */}
        <Link to="/adminlogin" className="group">
          <div className="bg-green-600 p-6 rounded-lg shadow-lg text-center w-64 hover:scale-105 transition transform hover:bg-green-700">
            <FaUserShield size={60} className="text-white mx-auto mb-4 group-hover:rotate-6 transition" />
            <h2 className="text-2xl font-semibold">Admin</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}
