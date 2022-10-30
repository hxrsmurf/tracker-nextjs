import { Logout, Settings } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AccountMenu({ session }) {
  if (!session) return <>Loading Account Menu...</>;
  if (!session.user) return <>Loading Account Menu User...</>;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickSettings = () => {
    router.push("/settings");
  };

  return (
    <>
      <Avatar sx={{ width: 48, height: 48 }} src={session.user.image}>
        {session.user.name.charAt(0)}
      </Avatar>
    </>
  );
}