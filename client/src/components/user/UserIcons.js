import { Avatar, Box, IconButton } from "@mui/material";
import React from "react";
import { useValue } from "../../context/ContextProvider";
import defaultIcon from "../../test.png";
import UserMenu from "./UserMenu";
import useTokenValidity from "../../hooks/useTokenValidity";

const UserIcons = () => {
  useTokenValidity();
  const {
    state: { currentUser },
  } = useValue();
  const [anchorUserMenu, setAnchorUserMenu] = React.useState(null);

  return (
    <Box>
      <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
        <Avatar
          src={currentUser?.photoURL || defaultIcon}
          alt={currentUser?.name}
        >
          {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : ""}
        </Avatar>
      </IconButton>
      <UserMenu
        anchorUserMenu={anchorUserMenu}
        setAnchorUserMenu={setAnchorUserMenu}
      />
    </Box>
  );
};

export default UserIcons;
