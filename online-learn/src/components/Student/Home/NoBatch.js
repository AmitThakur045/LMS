import React, { useState, useEffect, useLayoutEffect } from "react";
import HomeDrawer from "../HomeDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";

const NoBatch = () => {
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
      <div id="main" class="flex h-screen w-full bg-gray-50 items-center">
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
        <div
          class="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700"
        >
          <div class="w-full lg:w-1/2 mx-8">
            <div class="text-5xl text-[#156d8e] font-dark font-extrabold mb-8">
              No Batch Found! <br />
              <br />
              Login after some time
            </div>
            {/* <p class="text-2xl md:text-3xl font-light leading-normal mb-8">
      We will be back
    </p> */}
          </div>
          <div class="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
            <img
              src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
              class=""
              alt="Page not found"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NoBatch;
