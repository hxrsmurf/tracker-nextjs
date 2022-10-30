import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import CatagoryListing from "./CatagoryListing";
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

  if (!session.user) return <>Loading...</>;

  return (
    <div>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Button
            variant="contained"
            style={{ marginRight: "1rem" }}
            onClick={() => router.push("/")}
          >
            Dashboard
          </Button>
        </Grid>

        {!session ? (
          <></>
        ) : (
          <>
            <CatagoryListing />
          </>
        )}
        <Grid item>
          <LoginButton />
        </Grid>
      </Grid>
    </div>
  );
}