import React, { useState } from "react";
import axios from "axios";

const TrackUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");

    setLoading(true);

    const formData = new FormData();
    // CRITICAL: Append text fields BEFORE the file
    formData.append("title", title);
    formData.append("audio", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/tracks/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      console.log("Uploaded to Cloudinary as:", response.data.url);
      alert(`Track "${title}" uploaded successfully!`);
      setTitle(""); // Clear input
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Upload failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container pt-24 min-h-screen bg-gray-900 flex flex-col items-center">
      <h2 className="text-white text-3xl font-bold mb-6">
        Upload Drowsy Track
      </h2>

      <form
        onSubmit={handleUpload}
        className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md"
      >
        <div className="mb-4">
          <label className="text-gray-400 block mb-2">Track Name</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="e.g. Deep Forest Rain"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="text-gray-400 block mb-2">Audio File</label>
          <input
            type="file"
            accept="audio/*"
            className="text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            onChange={handleFileChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-bold text-white transition ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Processing..." : "Upload to Library"}
        </button>
      </form>
    </div>
  );
};

export default TrackUpload;
