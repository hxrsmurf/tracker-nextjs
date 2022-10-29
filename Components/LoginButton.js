import { Button } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import AccountMenu from "./AccountMenu";

export default function LoginButton() {
  const { data: session } = useSession()

  if (!session) return (
    <Button variant="contained" onClick={() => signIn()}>Login</Button>
  )
  return (
    <AccountMenu session={session}/>
  )
}