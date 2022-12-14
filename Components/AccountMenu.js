import Logout from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AccountMenu({ session }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  if (!session) return <>Loading Account Menu...</>;
  if (!session.user) return <>Loading Account Menu User...</>;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickSettings = () => {
    router.push("/settings");
    setAnchorEl(null);
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
        style={{ cursor: "pointer" }}
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