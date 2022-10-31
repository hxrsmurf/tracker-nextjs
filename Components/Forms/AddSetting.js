import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useSession } from "next-auth/react";
import { useState } from "react";

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

export default function AddSetting({ show, handleHideFormModal, type }) {
  const [setting, setSetting] = useState();
  const { data: session } = useSession();

  const handleAdd = () => {
    const submitData = async () => {
      const data_user = "user=" + session.user.email;
      const data_event = "&data=" + setting;
      const data_type = "&type=" + type;
      const res = await fetch(
        "/api/db/DBUserProfile?" + data_user + data_event + data_type,
        { method: "PUT" }
      );
      const req = await res.json();
    };
    submitData();
    handleHideFormModal();
    setSetting(null);
  };

  return (
    <>
      <Modal open={show} onClose={handleHideFormModal}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a {type}
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
                id="setting"
                label={type}
                variant="outlined"
                onChange={(event) => setSetting(event.target.value)}
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