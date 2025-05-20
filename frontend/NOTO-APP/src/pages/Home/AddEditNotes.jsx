import React, { useEffect, useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let [tags, setTags] = useState([]);
  let [error, setError] = useState(null); // Error state

  let addNewNote = async () => {
    console.log("Sending:", { title, content, tags });
    try {
      let response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // <-- FIXED LINE
      } else {
        setError("Something went wrong while adding the note."); // fallback
      }
    }
  };

  let editNote = async () => {
    console.log("Updating", { title, content, tags });
    try {
      let response = await axiosInstance.put(`edit-note/${noteData._id}`, {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // <-- FIXED LINE
      } else {
        setError("Something went wrong while updating the note."); // fallback
      }
    }
  };

  let handleAddNote = () => {
    if (!title) {
      setError("Title is required"); // Set error state
      return; // Prevent further execution if title is empty
    }
    if (!content) {
      setError("Content is required"); // Set error state
      return; // Prevent further execution if content is empty
    }

    setError(""); // Reset error state

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  useEffect(() => {
    if (type === "edit" && noteData) {
      setTitle(noteData.title || "");
      setContent(noteData.content || "");
      setTags(noteData.tags || []);
    }
  }, [type, noteData]);

  return (
    <div>
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-1 mt-7 mr-4 hover:bg-red-400 transition-colors duration-200"
        onClick={onClose}
      >
        <MdClose className="text-xl text-black" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go To Gym At 5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
      {/* Display error message */}
      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
