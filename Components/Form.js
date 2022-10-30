import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useState } from "react";
import { useRouter } from "next/router";

export default function BasicTextFields({ type, user }) {
  const [data, setData] = useState();
  const router = useRouter()

  const handleSubmit = (event) => {
    async function submit(event) {
        const data_user = "user=" + user
        const data_event = "&data=" + event
        const data_type = "&type=" + type
        const res = await fetch("/api/dynamodb?" + data_user + data_event + data_type, { method: 'PUT'})
        const resp = await res.json()

        // Not the best way, but hey it works. I think there's a callback I could do
        router.reload()
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
