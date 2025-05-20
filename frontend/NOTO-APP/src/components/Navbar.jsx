import React from "react";
import ProfileInfo from "./Cards/profileInfo";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";

const Navbar = ({
  userInfo,
  searchQuery,
  setSearchQuery,
  handleSearch,
  onClearSearch,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/dashboard";

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between bg-white px-6 py-2 drop-shadow">
      <h2 className="text-2xl font-medium text-black py-2">NOTO</h2>
      {isHomePage && (
        <>
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
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
