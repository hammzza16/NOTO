import React from "react";
import { getInitials } from "../../utils/helper";
const ProfileInfo = ({ onLogout, userInfo }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-200">
        {getInitials(userInfo?.name || "")}
      </div>

      <div>
        <p className="text-2xl font-medium mt-0.5">
          {userInfo?.name || "Anonymous"}
        </p>
        <button
          className="text-sm text-slate-500 font-semibold underline underline-offset-2 hover:text-slate-700 hover:underline decoration-2 transition-all duration-200"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
