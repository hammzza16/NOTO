import React from "react";
import Navbar from "../../components/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";

const home = () => {
  //defining functions

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
          onClick={() => {}}
        >
          <MdAdd className="text-[32px] text-white" />
        </button>
      </div>
    </>
  );
};

export default home;
