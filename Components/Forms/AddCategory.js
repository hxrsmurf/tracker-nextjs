import { Button, Modal, TextField, Typography } from "@mui/material";
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
  const [updateCategory, setupdateCategory] = useState();

  const handleAdd = (event) => {
    console.log(updateCategory);
    handleHideFormModal()
    setupdateCategory(null)
  };

  return (
    <>
      <Modal open={show} onClose={handleHideFormModal}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a Category
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "20ch" },
                background: "white",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="category"
                label="category"
                variant="outlined"
                onChange={(event) => setupdateCategory(event.target.value)}
              />
              <Button variant="contained" onClick={() => handleAdd()}>
                Add
              </Button>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
