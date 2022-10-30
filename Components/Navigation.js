import { Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import LoginButton from "./LoginButton";

export default function Navigation() {
  const { data: session } = useSession();
  return (
    <>
      <Grid>
        <Grid item>
          <LoginButton session={session} />
        </Grid>
      </Grid>
    </>
  );
}