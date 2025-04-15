import React, { useState } from "react";
import ProfileInfo from "./Cards/profileInfo";
import {
  BrowserRouter,
  Routes,
  Route,
  Router,
  Navigate,
  useNavigate,
} from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";

const Navbar = () => {
  let [searchQuery, setSearchQuery] = useState(""); //searchbar specific state
  let navigate = useNavigate();

  let onLogout = () => {
    navigate("/login");
  };

  let handleSearch = () => {}; //searchbar specific func

  let onClearSearch = () => {
    //searchbar specific func
    setSearchQuery("");
  };
  return (
    <div className="flex items-center justify-between bg-white px-6 py-2 drop-shadow">
      <h2 className="text-2xl font-medium text-black py-2">NOTO</h2>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileInfo onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
