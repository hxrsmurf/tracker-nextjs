import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};

export default function AddCategory({ show, handleHideFormModal }) {
  return (
    <>
      <Modal open={show} onClose={handleHideFormModal}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a Category
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}