import React from 'react'; 
import { InputTextarea } from "primereact/inputtextarea";

export default function TextCard() {
    return (
        <div className="card flex justify-content-center">
            <InputTextarea invalid rows={5} cols={30} />
        </div>
    )
}