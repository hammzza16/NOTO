import React from "react";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";
import { AiFillOpenAI } from "react-icons/ai";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
  onClick,
  onSummarise,
}) => {
  return (
    <div
      className="bg-white border border-slate-200 shadow-sm rounded-xl p-4 space-y-3 relative hover:shadow-xl hover:scale-[1.01] transition-all duration-300 ease-in-out min-h-[140px] min-w-[260px]"
      onClick={onClick}
    >
      <div className="">
        <div className="flex justify-between items-start">
          <div>
            <h6 className="text-base font-semibold text-slate-800">
              {title?.length > 20 ? `${title.slice(0, 20)}...` : title}
            </h6>
            <span className="text-xs text-slate-500">{date}</span>
          </div>
        </div>
      </div>

      <MdPushPin
        className={`absolute top-3 right-3 text-xl text-slate-400 hover:text-yellow-700 cursor-pointer transition-colors duration-200 ${
          isPinned ? "text-yellow-400" : ""
        }`}
        //onClick={onPinNote}//
        onClick={(e) => {
          e.stopPropagation(); // <---- stop event bubbling here
          onPinNote();
        }}
      />

      <p className="text-sm text-slate-700">
        {content?.length > 60 ? `${content.slice(0, 60)}...` : content}
      </p>

      <div className="">
        <div className="text-xs text-slate-500 italic">
          {tags.map((item) => `#${item} `)}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <MdCreate
            className=" text-xl text-slate-600 hover:text-green-600 transition-colors duration-200 cursor-pointer"
            //onClick={onEdit}
            onClick={(e) => {
              e.stopPropagation(); // <---- stop event bubbling here
              onEdit();
            }}
          />
          <MdDelete
            className="hover:text-red-500 text-xl text-slate-600 transition-colors duration-200 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // <---- stop event bubbling here
              onDelete();
            }}
          />
          <AiFillOpenAI
            className="hover:text-blue-500 text-xl text-slate-600 transition-colors duration-200 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // <---- stop event bubbling here
              onSummarise();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
