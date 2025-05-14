import React, { useState } from "react";
import ProfileInfo from "./Cards/profileInfo";
import {
  BrowserRouter,
  Routes,
  Route,
  Router,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";

const Navbar = ({ userInfo }) => {
  let [searchQuery, setSearchQuery] = useState(""); //searchbar specific state
  let navigate = useNavigate();
  let location = useLocation();
  const isHomePage = location.pathname === "/dashboard";
  let onLogout = () => {
    localStorage.clear();
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
      {isHomePage && (
        <>
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => {
              setSearchQuery(target.value);
            }}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </>
      )}
    </div>
  );
};

export default Navbar;
