import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import AccountMenu from "./AccountMenu";

export default function LoginButton({session}) {

  if (!session) return <Button variant="contained" onClick={() => signIn()}>Login</Button>

  // This is required as the session sometimes is null/undefined and caused issues with sub-component
  if (session.user) return <AccountMenu/>

  return (
    <Button variant="contained" onClick={() => signIn()}>Login</Button>
  )
}