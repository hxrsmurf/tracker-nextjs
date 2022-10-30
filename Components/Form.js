import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";

export default function BasicTextFields({ type, user }) {
  const [data, setData] = useState();
  const handleSubmit = (event) => {
    async function submit(event) {
        const res = await fetch("/api/dynamodb?user=" + user + "&data=" + event, { method: 'PUT'})
        const resp = await res.json()
    }
    submit(event)
  };

  return (
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
        disabled
        id="user"
        label="User"
        variant="outlined"
        defaultValue={user}
      />
      <TextField
        id="data"
        label="Data"
        variant="outlined"
        onChange={(event) => setData(event.target.value)}
      />
      <Button
        style={{ marginTop: "1rem" }}
        variant="contained"
        onClick={() => handleSubmit(data)}
      >
        Submit
      </Button>
    </Box>
  );
}
