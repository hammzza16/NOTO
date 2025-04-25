import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  let addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  let handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  let handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded"
            >
              # {tag}
              <button
                onClick={() => {
                  handleRemoveTag(tag);
                }}
                className="ml-2 text-red-500 hover:text-red-700 transition-colors"
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2  p-2  rounded-lg  bg-white">
        <input
          type="text"
          placeholder="Enter a tag..."
          className="flex-1 text-sm px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
        />

        <button
          className="w-9 h-9 flex items-center justify-center rounded-md border border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
          onClick={() => {
            addNewTag();
          }}
        >
          <MdAdd className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
