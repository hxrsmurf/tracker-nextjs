import { Button } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession()

  if (!session) return (
    <Button variant="contained" onClick={() => signIn()}>Login</Button>
  )
  return (
    <Button variant="contained" onClick={() => signOut()}>Logout</Button>
  )
}