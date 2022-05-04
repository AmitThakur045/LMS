import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Avatar } from "@mui/material";
const Header = () => {
  return (
    <div className="flex text-white bg-[#262c62] w-full flex-[0.1] items-center justify-between px-8">
      <h1 className="font-semibold text-lg">Admin</h1>
      <div className="flex items-center text-[#9a9a9a] space-x-5  ">
        <NotificationsIcon className="hover:text-white transition-all duration-150 cursor-pointer" />
        <div className="flex items-center hover:text-white transition-all duration-150 cursor-pointer space-x-2 text-sm">
          <Avatar sx={{ width: 24, height: 24 }} />
          <p>Melvin Johnson</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
