import React from "react";
import 'quill/dist/quill.snow.css';

export default function Document({ title, body, onClick }) {
  return (
    <div className="document-container" onClick={onClick}>
      <div className="document-top">
        <div dangerouslySetInnerHTML={{ __html: body }}></div>
      </div>
      <div className="document-bottom">
        <span>{title}</span>
      </div>
    </div>
  );
}
