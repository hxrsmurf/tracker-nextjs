import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import LoginButton from "./LoginButton";

export default function Navigation() {

  return (
    <div>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Button variant="contained"> Dashboard </Button>
        </Grid>
        <Grid item>
          <Button variant="contained"> Movies </Button>
        </Grid>
        <Grid item>
          <LoginButton />
        </Grid>
      </Grid>
    </div>
  );
}