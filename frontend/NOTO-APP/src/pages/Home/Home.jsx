import React, { use, useState } from "react";
import Navbar from "../../components/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";

const home = () => {
  //defining functions
  let [openAddEditModal, setopenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <>
      <div>
        <Navbar />
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-4 mt-8">
            <NoteCard
              title="Meeting on 16th May"
              date="15th April 2025"
              content="A meeting to be taken place on 16th may"
              tags="#meeting"
              isPinned={true}
              onEdit={() => {}}
              onPinNote={() => {}}
              onDelete={() => {}}
            />
            <NoteCard
              title="Meeting on 16th May"
              date="15th April 2025"
              content="A meeting to be taken place on 16th may"
              tags="#meeting"
              isPinned={true}
              onEdit={() => {}}
              onPinNote={() => {}}
              onDelete={() => {}}
            />
            <NoteCard
              title="Meeting on 16th May"
              date="15th April 2025"
              content="A meeting to be taken place on 16th may"
              tags="#meeting"
              isPinned={true}
              onEdit={() => {}}
              onPinNote={() => {}}
              onDelete={() => {}}
            />
            <NoteCard
              title="Meeting on 16th May"
              date="15th April 2025"
              content="A meeting to be taken place on 16th may"
              tags="#meeting"
              isPinned={true}
              onEdit={() => {}}
              onPinNote={() => {}}
              onDelete={() => {}}
            />
            <NoteCard
              title="Meeting on 16th May"
              date="15th April 2025"
              content="A meeting to be taken place on 16th may"
              tags="#meeting"
              isPinned={true}
              onEdit={() => {}}
              onPinNote={() => {}}
              onDelete={() => {}}
            />
            <NoteCard
              title="Meeting on 16th May"
              date="15th April 2025"
              content="A meeting to be taken place on 16th may"
              tags="#meeting"
              isPinned={true}
              onEdit={() => {}}
              onPinNote={() => {}}
              onDelete={() => {}}
            />
            <NoteCard
              title="Meeting on 16th May"
              date="15th April 2025"
              content="A meeting to be taken place on 16th may"
              tags="#meeting"
              isPinned={true}
              onEdit={() => {}}
              onPinNote={() => {}}
              onDelete={() => {}}
            />
            <NoteCard
              title="Meeting on 16th May"
              date="15th April 2025"
              content="A meeting to be taken place on 16th may"
              tags="#meeting"
              isPinned={true}
              onEdit={() => {}}
              onPinNote={() => {}}
              onDelete={() => {}}
            />
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
