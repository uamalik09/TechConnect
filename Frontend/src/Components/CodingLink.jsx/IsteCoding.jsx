import { useEffect, useState } from "react";
import axios from "axios";

const IsteCode = () => {
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  const [editing, setEditing] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/coding/iste/getcode", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setLinks(res.data);
    } catch (error) {
      console.error("Error fetching links:", error.response?.data || error.message);
    }
  };

  const addOrUpdateLink = async () => {
    if (!url) return;
    try {
      if (editing) {
        await axios.put(`http://localhost:8080/coding/iste/update/${editing}`, { url }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditing(null);
      } else {
        await axios.post("http://localhost:8080/coding/iste/addcode", { url }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setUrl("");
      fetchLinks();
    } catch (error) {
      console.error("Error adding/updating link:", error.response?.data || error.message);
    }
  };

  const deleteLink = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/coding/iste/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLinks();
    } catch (error) {
      console.error("Error deleting link:", error.response?.data || error.message);
    }
  };

  const editLink = (id, existingUrl) => {
    setUrl(existingUrl);
    setEditing(id);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
      <h1 className="text-2xl font-bold mb-4">ISTE CODING PANEL</h1>
      <input
        type="text"
        placeholder="Enter Coding Platform Link"
        className="border p-2 rounded w-80"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
        onClick={addOrUpdateLink}
      >
        {editing ? "Update Link" : "Add Link"}
      </button>

      <ul className="mt-5 w-80">
        {links.map((link) => (
          <li key={link._id} className="flex justify-between p-2 bg-white shadow rounded mb-2">
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
              {link.url}
            </a>
            <div>
              <button
                onClick={() => editLink(link._id, link.url)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteLink(link._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IsteCode;