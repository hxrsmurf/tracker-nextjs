import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export default function BasicTextFields({ type, user }) {
  if (!user) return "Nothing";

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
      <TextField id="data" label="Data" variant="outlined" />
      <Button style={{ marginTop: "1rem" }} variant="contained">
        Submit
      </Button>
    </Box>
  );
}
