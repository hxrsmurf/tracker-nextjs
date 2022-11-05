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
    <div>
      <Grid container spacing={1}>
        <Grid item>
          <div>
            <Button variant="contained" onClick={() => router.push('/')}>Dashboard</Button>
          </div>
        </Grid>

        {!session ? <></> : <MenuItems session={session} />}

        <Grid item>
          <LoginButton session={session} />
        </Grid>

        {!session ? <></> :
          <>
            <Grid item style={{ marginLeft: 'auto' }}>
              <AccountMenu session={session} />
            </Grid>
          </>}
      </Grid>
    </div>
  );
}