import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20rem",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 10,
  borderRadius: "3px",
  p: 4,
};

const SubAdminModal = ({ showSubAdminModal, setShowSubAdminModal }) => {
  const handleClose = () => {
    setShowSubAdminModal(false);
  };
  return (
    <Modal
      open={showSubAdminModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <div className="flex flex-col items-center justify-center h-[10rem] space-y-4">
          <h1 className="text-center font-bold text-[18px] text-[#b31a1a]">
            You are not authorized for this action !!
          </h1>
          <Button onClick={handleClose} variant="contained">
            Okay
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default SubAdminModal;
