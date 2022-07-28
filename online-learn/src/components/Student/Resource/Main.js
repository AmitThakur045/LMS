import React, { useState, useEffect, useLayoutEffect } from "react";
import HomeDrawer from "../HomeDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";

const Main = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth < 678) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // adding the absolte property to form when window width is <= 678px
  useEffect(() => {
    let element = document.getElementById("main");
    if (isMobile === true) {
      element.classList.add("absolute");
    } else {
      element.classList.remove("absolute");
    }
  }, [isMobile]);

  return (
    <>
      <div
        id="main"
        className="flex bg-white w-full items-center justify-center h-full"
      >
        {isMobile && (
          <div className="absolute h-[5rem] justify-end text-black right-4 top-5">
            {isOpen ? (
              <CancelIcon fontSize="large" onClick={() => setIsOpen(false)} />
            ) : (
              <MenuIcon fontSize="large" onClick={() => setIsOpen(true)} />
            )}
          </div>
        )}
        {isOpen && <HomeDrawer isOpen={isOpen} setIsOpen={setIsOpen} />}
        <h1 className="text-[32px] font-semibold text-[#af2525]">
          Coming Soon...
        </h1>
      </div>
    </>
  );
};

export default Main;
