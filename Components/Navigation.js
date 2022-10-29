import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoginButton from "./LoginButton";

export default function Navigation() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return (
      <Grid container justifyContent="space-between">
        <Grid item>
          <Button variant="contained" onClick={() => router.push("/")}>
            Dashboard
          </Button>
        </Grid>
        <Grid item>
          <LoginButton />
        </Grid>
      </Grid>
    );
  }

  return (
    <div>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Button variant="contained" onClick={() => router.push("/")}>
            Dashboard
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => router.push("/spotify")}>
            Spotify
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => router.push("/movies")}>
            Movies
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => router.push("/tv")}>
            TV
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => router.push("/youtube")}>
            YouTube
          </Button>
        </Grid>
        <Grid item>
          <LoginButton />
        </Grid>
      </Grid>
    </div>
  );
}