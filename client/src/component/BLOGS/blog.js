import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios"
axios.defaults.withCredentials = true;


const TextEditor = () => {
  const [text, setText] = useState("");
  const [heading, setHeading] = useState("");
  const userId = localStorage.getItem("userId"); // State for heading
  const quillRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  };

  // Send blog to backend
 const handlePost = async () => {
  if (!heading.trim() || !text.trim()) {
    alert("Please enter both heading and blog body.");
    return;
  }
  try {
   const token = localStorage.getItem("accessToken");
if (!token) {
  alert("You must be logged in to post a blog.");
  return;
}
await axios.post(
  "http://localhost:8000/api/v1/blogs",
  {
    title: heading,
    content: text,
    author: userId,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
    alert("Blog posted successfully!");
    setHeading("");
    setText("");
  } catch (error) {
    alert("Failed to post blog.");
    console.error(error);
  }
};

  return (
    <div>
      <span>
        <h2 style={{ fontFamily: "Arial, sans-serif" }}>Write Your Blog</h2>
      </span>
      <input
        type="text"
        value={heading}
        onChange={e => setHeading(e.target.value)}
        placeholder="Enter blog heading..."
        style={{
          width: "900px",
          padding: "10px",
          marginBottom: "15px",
          fontSize: "1.2rem",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
      />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={text}
        onChange={setText}
        placeholder='Write your blog here...'
        style={{
          height: "600px",
          width: "900px",
          marginBottom: "20px",
          backgroundColor: "rgb(255, 255, 255)",
          borderRadius: "15px",
          padding: "10px"
        }}
      />
      <div style={{ textAlign: "center" }}>
        <button
          onClick={handlePost}
          style={{ margin: "35px", padding: "10px 20px", borderRadius: "5px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }}>
          POST
        </button>
        <button
          onClick={handleCopy}
          style={{ margin: "10px", padding: "10px 20px", borderRadius: "5px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer" }}>
          Draft
        </button>
      </div>
    </div>
  );
};

export default TextEditor;