import React from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in">
      <div className="">
        <div>
          <h5 className="text-1xl font-medium">{title}</h5>
          <span className="text-sm text-slate-500">{date}</span>
        </div>
        <MdOutlinePushPin className="" onClick={onPinNote} />
      </div>
      <p className="">{content?.slice(0, 60)}</p>
      <div className="">
        <div className="text-sm text-slate-500">{tags}</div>

        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600 text-2xl"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-500 text-2xl"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
