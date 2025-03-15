import { useEffect, useState } from "react";
import axios from "axios";
import { FaClipboardList } from "react-icons/fa";


const AcmCode = () => {
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:8080/coding/acm/getcode", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setLinks(res.data);
    } catch (error) {
      setError("Error fetching links. Please try again.");
      console.error("Error fetching links:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addOrUpdateLink = async () => {
    if (!url) return;
    try {
      if (editing) {
        await axios.put(`http://localhost:8080/coding/acm/update/${editing}`, { url }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditing(null);
      } else {
        await axios.post("http://localhost:8080/coding/acm/addcode", { url }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setUrl("");
      fetchLinks();
    } catch (error) {
      setError("Error saving link. Please try again.");
      console.error("Error adding/updating link:", error.response?.data || error.message);
    }
  };

  const deleteLink = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/coding/acm/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLinks();
    } catch (error) {
      setError("Error deleting link. Please try again.");
      console.error("Error deleting link:", error.response?.data || error.message);
    }
  };

  const editLink = (id, existingUrl) => {
    setUrl(existingUrl);
    setEditing(id);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addOrUpdateLink();
    }
  };

  const truncateUrl = (url) => {
    return url.length > 40 ? url.substring(0, 40) + "..." : url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 mb-2">
            ACM CODING PANEL
          </h1>
          <p className="text-gray-300">
            Manage coding platform links for ACM members
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 border border-gray-700">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter Coding Platform Link"
              className="flex-1 border border-gray-600 bg-gray-700 p-3 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className={`px-6 py-3 rounded font-medium transition-all ${
                editing
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={addOrUpdateLink}
            >
              {editing ? "Update Link" : "Add Link"}
            </button>
            {editing && (
              <button
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded font-medium transition-all"
                onClick={() => {
                  setEditing(null);
                  setUrl("");
                }}
              >
                Cancel
              </button>
            )}
          </div>
          {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
        </div>

        {/* Links List */}
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Coding Platform Links</h2>
          </div>

          {isLoading ? (
            <div className="p-8 text-center">
              <div className="inline-block w-8 h-8 border-4 border-gray-500 border-t-yellow-500 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-400">Loading links...</p>
            </div>
          ) : links.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No links added yet. Add your first coding platform link above.
            </div>
          ) : (
            <ul className="divide-y divide-gray-700">
              {links.map((link) => (
                <li
                  key={link._id}
                  className="p-4 hover:bg-gray-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 break-all">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 hover:underline flex items-center"
                      >
                        <span className="mr-2">🔗</span>
                        {link.url}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2 self-end sm:self-auto">
                      <button
                        onClick={() => editLink(link._id, link.url)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded transition-colors flex items-center"
                      >
                        <span className="mr-1">✏️</span> Edit
                      </button>
                      <button
                        onClick={() => deleteLink(link._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors flex items-center"
                      >
                        <span className="mr-1">🗑️</span> Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcmCode;