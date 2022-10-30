// It was the icons...
import Logout from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
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
    console.log(event);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickSettings = () => {
    router.push("/settings");
  };

  return (
    <>
      <Avatar
        sx={{ width: 48, height: 48 }}
        src={session.user.image}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        onHover={console.log("kevin")}
      >
        {session.user.name.charAt(0)}
      </Avatar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClickSettings()}>
          <SettingsIcon fontSize="small" style={{ marginRight: "1rem" }} />
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => signOut()}>
          <Logout fontSize="small" style={{ marginRight: "1rem" }} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
