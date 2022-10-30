import Grid from "@mui/material/Grid";
import { useSession } from "next-auth/react";

import AccountMenu from "./AccountMenu";
import LoginButton from "./LoginButton";
import MenuItems from "./MenuItems";

export default function Navigation() {
  const { data: session } = useSession();
  return (
    <>
      <Grid container spacing={2}>
      {!session ? <></> : <MenuItems session={session}/>}
        <Grid item>
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