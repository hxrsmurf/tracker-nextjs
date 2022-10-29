import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import LoginButton from "./LoginButton";

export default function Navigation() {

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item sm={10}>
          <Button variant="contained"> Dashboard </Button>
        </Grid>
        <Grid item>
          <LoginButton />
        </Grid>
      </Grid>
    </div>
  );
}