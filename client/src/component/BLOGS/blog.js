import React, { useState } from "react";
import { Editor } from "primereact/editor";

export default function Blog() { // Renamed to "Blog"
    const [text, setText] = useState('');

    return (
        <>
        <span ><h1>Write your Blog</h1></span>

        <div className="card">
                    <Editor 
                value={text} 
                onTextChange={(e) => setText(e.htmlValue)} 
                style={{ height: '320px' }} 
            />
        </div>
        </>
    );
}