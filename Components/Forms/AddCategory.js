import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSession } from "next-auth/react";
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
  const {data: session} = useSession()

  const handleAdd = () => {
    const submitData = async () => {
        const data_user = "user=" + session.user.email
        const data_event = "&data=" + updateCategory
        const data_type = "&type=category"
        const res = await fetch("/api/db/DBUserProfile?" + data_user + data_event + data_type, { method: 'PUT'})
        const req = await res.json()
    }
    submitData()
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
