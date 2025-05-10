import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = () => {
  const [text, setText] = useState("");
  const quillRef = useRef(null);

  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "document.txt";
    link.click();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  };

  return (
    <div >
      <span><h2 style={{ fontFamily: "Arial, sans-serif" }}>Write Your Blog</h2></span>
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
          onClick={handleDownload}
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
