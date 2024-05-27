import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useGetSingleDocumentQuery, useUpdateDocumentMutation } from "../services/api";

const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

export default function TextEditor() {
  const { id: documentId } = useParams();
  console.log(documentId)

  const [updateDocument, {isSuccess, updateDocumentSuccess}] = useUpdateDocumentMutation()
  const {data:singleDocumentData, isSuccess: singleDocumentSuccess} = useGetSingleDocumentQuery({id: documentId})

  const [ctrlS, setCtrlS] = useState(false);

  const [title, setTitle] = useState("")

  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();


  const handleTitleSubmit = async (e)=> {
    e.preventDefault()
    await updateDocument({id: documentId, title})
  }

  useEffect(()=> {
    if(singleDocumentSuccess){
      setTitle(singleDocumentData?.document?.title)
    }
  }, [singleDocumentSuccess])

  useEffect(()=> {
    if(updateDocumentSuccess){
      setTitle("")
    }
  }, [updateDocumentSuccess])

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    setQuill(q);
    q.disable();
    q.setText("Loading...");
  }, []);

  useEffect(() => {
    const s = io("http://localhost:8000/", {
      transports: ["websocket"], // Explicitly enable WebSocket transport
      withCredentials: true,
    });
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);
    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);
    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });
    socket.emit("get-document", documentId);
  }, [socket, quill, documentId]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        console.log("Ctrl+S pressed");
        //will do something here later
      }
    };

    const handleKeyUp = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        console.log("ctrl+s released");
        //will do something here later
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      <form className="editor-title-container">
        <input
          type="text"
          placeholder="Document name"
          className="editor-title-input"
          value={title}
          onChange={e=> setTitle(e.target.value)}
        />
        <button type="submit" onClick={handleTitleSubmit}>Save Document Name</button>
      </form>
      <div className="container" ref={wrapperRef}></div>
    </>
  );
}
