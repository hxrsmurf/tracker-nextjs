import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import LoginButton from "./LoginButton";

export default function Navigation() {
  const router = useRouter();

  return (
    <div>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Button variant="contained" onClick={() => router.push("/")}>
            Dashboard
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => router.push("/movies")}>
            Movies
          </Button>
        </Grid>
        <Grid item>
          <LoginButton />
        </Grid>
      </Grid>
    </div>
  );
}