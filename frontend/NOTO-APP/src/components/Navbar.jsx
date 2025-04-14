import React from "react";
import ProfileInfo from "./Cards/profileInfo";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-white px-6 py-2 drop-shadow">
      <h2 className="text-2xl font-medium text-black py-2">NOTO</h2>
      <ProfileInfo />
    </div>
  );
};

export default Navbar;
