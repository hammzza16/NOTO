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
        navigate("/login");
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
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
    return () => {};
  }, []);

  return (
    <>
      <div>
        <Navbar userInfo={userInfo} />
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-4 mt-8">
            {allNotes.map((item, index) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={moment(item.createdOn).format("Do MM YYYY")}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => {}}
                onPinNote={() => {}}
                onDelete={() => {}}
              />
            ))}
          </div>
        </div>
        <button
          className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
          onClick={() => {
            setopenAddEditModal({
              isShown: true,
              type: "add",
              data: null,
            });
          }}
        >
          <MdAdd className="text-[32px] text-white" />
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
          />
        </Modal>
      </div>
    </>
  );
};

export default home;
