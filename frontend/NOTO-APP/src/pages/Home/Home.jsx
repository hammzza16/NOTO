import React from "react";
import Navbar from "../../components/Navbar";
import NoteCard from "../../components/Cards/NoteCard";

const home = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="container mx-auto">
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
    </>
  );
};

export default home;
