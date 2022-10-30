import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Grid } from "@mui/material";
import Link from "next/link";

export default function Footer() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        width: "50%",
        textAlign: "center",
      }}
    >
      <hr style={{ width: "25%" }}></hr>
      <Grid
        style={{ marginTop: 0, marginBottom: "1rem", textAlign: "center" }}
        justifyContent="center"
        container
        spacing={2}
      >
        <Grid item>
          <YouTubeIcon />
        </Grid>
        <Grid item>
          <TwitterIcon />
        </Grid>{" "}
        <Grid item>
          <GitHubIcon />
        </Grid>
      </Grid>
      <Grid>
        <Grid item><Link href="/privacy">Privacy Policy</Link></Grid>
      </Grid>
    </div>
  );
}