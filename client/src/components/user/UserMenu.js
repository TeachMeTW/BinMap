import { Logout, Settings } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useValue } from "../../context/ContextProvider";
import useTokenValidity from "../../hooks/useTokenValidity";

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  useTokenValidity();
  const {
    dispatch,
    state: { currentUser },
  } = useValue();
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  const testAuth = async () => {
    const url = process.env.REACT_APP_SERVER_URL + "/bin";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${currentUser.token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (!data.success) {
        if (response.status === 401) {
          dispatch({ type: "UPDATE_USER", payload: null });
        }

        throw new Error(data.message);
      }
    } catch (error) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: { open: true, severity: "error", message: error.message },
      });
    }
  };

  return (
    <Menu
      anchorEl={anchorUserMenu}
      open={Boolean(anchorUserMenu)}
      onClose={handleCloseUserMenu}
      onClick={handleCloseUserMenu}
    >
      <MenuItem onClick={testAuth}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem
        onClick={() => dispatch({ type: "UPDATE_USER", payload: null })}
      >
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
