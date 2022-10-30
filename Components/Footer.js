import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

import { Grid } from "@mui/material";
import Link from "next/link";

export default function Footer() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: "2rem" }}
    >
      <hr style={{ width: "25%" }}></hr>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: ".5rem" }}
      >
        <Grid item>
          <YouTubeIcon />
        </Grid>
        <Grid item>
          <TwitterIcon />
        </Grid>
        <Grid item>
          <GitHubIcon />
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: ".5rem" }}
      >
        <Grid item>
          <Link href="/privacy">Privacy Policy</Link>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: ".5rem" }}
      >
        <Grid item>Copyright © 2022 hxrsmurf</Grid>
      </Grid>
    </Grid>
  );
}