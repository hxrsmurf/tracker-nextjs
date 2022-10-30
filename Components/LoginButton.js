import Button from "@mui/material/Button";
import { signIn } from "next-auth/react";

export default function LoginButton({ session }) {
  if (!session)
    return (
      <Button variant="contained" onClick={() => signIn()}>
        Login
      </Button>
    );
}