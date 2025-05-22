import React, { use, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import moment from "moment";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const home = () => {
  //defining functions
  let [openAddEditModal, setopenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  let [userInfo, setUserInfo] = useState("null");
  let [allNotes, setAllNotes] = useState([]);
  let [error, setError] = useState("");
  let [searchQuery, setSearchQuery] = useState("");
  let [filteredNotes, setFilteredNotes] = useState([]);
  let [viewNoteModal, setViewNoteModal] = useState({
    isShown: false,
    data: null,
  });

  let navigate = useNavigate();

  let getUserInfo = async () => {
    try {
      let response = await axiosInstance.get("/get-user");
      console.log(response.data); //
      if (response.data) {
        setUserInfo(response.data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/LogReg");
      }
    }
  };

  // Get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      console.log(response.data.notes);
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
        setFilteredNotes(response.data.notes); // ← Add this
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  //passing onEdit
  let handleEdit = (noteDetails) => {
    setopenAddEditModal({ isShown: true, type: "edit", data: noteDetails });
  };

  let handleDelete = async (noteDetails) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      let response = await axiosInstance.delete(
        `/delete-note/${noteDetails._id}`
      );

      if (response.status === 200) {
        await getAllNotes(); // Always refresh notes after successful delete
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong while deleting the note.");
      }
    }
  };

  let handlePinNote = async (noteDetails) => {
    try {
      let response = await axiosInstance.put(
        `/update-note-pinned/${noteDetails._id}`,
        { isPinned: !noteDetails.isPinned }
      );

      if (response.status === 200) {
        await getAllNotes(); // Always refresh notes after successful delete
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong while Pinning the note.");
      }
    }
  };

  const handleSearch = () => {
    const filtered = allNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (note.tags &&
          note.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          ))
    );
    setFilteredNotes(filtered);
  };

  const onClearSearch = () => {
    setSearchQuery("");
    setFilteredNotes(allNotes);
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes(); // getting all the notes on the home page and storing it in a state variable named allNotes
    return () => {};
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const handleViewNote = (note) => {
    setViewNoteModal({ isShown: true, data: note });
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <div sticky top-0 z-50 bg-white shadow>
        <Navbar
          userInfo={userInfo}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      </div>
      <div className="flex-1 overflow-y-auto h-[calc(100vh-64px)] px-6 py-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredNotes.map((item, index) => (
            <NoteCard
              key={item._id}
              title={item.title}
              date={moment(item.createdOn).format("Do MM YYYY")}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={() => handleEdit(item)}
              onPinNote={() => handlePinNote(item)}
              onClick={() => handleViewNote(item)}
              onDelete={() => {
                handleDelete(item);
              }}
            />
          ))}
        </div>
      </div>
      <button
        className="w-20 h-20 flex items-center justify-center rounded-2xl bg-primary text-white shadow-xl hover:bg-blue-600 hover:shadow-blue-400/50 active:scale-95 transition-all duration-300 ease-in-out group absolute right-10 bottom-10"
        onClick={() => {
          setopenAddEditModal({
            isShown: true,
            type: "add",
            data: null,
          });
        }}
      >
        <MdAdd className="text-[32px] group-hover:rotate-90 transform transition-transform duration-300" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {
          setopenAddEditModal({ isShown: false, type: "add", data: null });
        }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-2/5 p-6 scroll-auto"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setopenAddEditModal({ isShown: false, type: "add", data: null })
          }
          getAllNotes={getAllNotes}
        />
      </Modal>
      <Modal
        isOpen={viewNoteModal.isShown}
        onRequestClose={() => setViewNoteModal({ isShown: false, data: null })}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.2)" },
        }}
        contentLabel=""
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-2/5 p-6 scroll-auto"
      >
        {viewNoteModal.data && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              {viewNoteModal.data.title}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {moment(viewNoteModal.data.createdOn).format("Do MMMM YYYY")}
            </p>
            <p className="mb-4">{viewNoteModal.data.content}</p>
            {viewNoteModal.data.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {viewNoteModal.data.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-200 rounded text-sm text-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default home;
