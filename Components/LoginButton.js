import { Button } from "@mui/material";
import { signIn, signOut } from "next-auth/react";

export default function LoginButton({ session }) {
  if (!session)
    return (
      <Button variant="contained" onClick={() => signIn()}>
        Login
      </Button>
    );

  return (
    <Button variant="contained" onClick={() => signOut()}>
      Logout
    </Button>
  );
}