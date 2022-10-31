import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import AccountMenu from "./AccountMenu";
import LoginButton from "./LoginButton";
import MenuItems from "./MenuItems";

export default function Navigation() {
  const { data: session } = useSession();
  const router = useRouter()

  return (
    <>
      <Grid container spacing={2}>
      <Grid item>
        <Button variant="contained" onClick={() => router.push('/')}>Dashboard</Button>
      </Grid>
      {!session ? <></> : <MenuItems session={session}/>}
        <Grid item style={{marginLeft: "1rem"}}>
          <LoginButton session={session} />
        </Grid>
        {!session ? <></> :
        <>
          <Grid item>
            <AccountMenu session={session}/>
          </Grid>
        </>}
      </Grid>
    </>
  );
}