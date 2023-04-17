import React, { useEffect } from "react";

import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Typography, Tooltip } from "@mui/material";
import { PersonAdd, Settings, Logout } from "@mui/icons-material";
import { UserData } from "../types/modelTypes";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/app/hooks";
import { logOut } from "../store/ui-actions";
import { doc, onSnapshot } from "@firebase/firestore";
import { db } from "../firebaseConfig";
import { uiActions } from "../store/ui-slice";

import avatar from "../assets/avatar.jpg";



interface AccountMenuProps {
  userData: UserData
}

export default function AccountMenu({ userData }: AccountMenuProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const uId = userData.uId
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  //Real time actualization and dispatch money to store
  useEffect(() => {
    const unsub = onSnapshot(doc(db, `users/${uId}`), (doc) => {
      if (doc.exists()) {
        dispatch(uiActions.addMoney(doc.data().money))
      }
    });

    return () => {
      unsub()
    }
  }, [uId, dispatch])


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logOut())
    setAnchorEl(null)
    navigate('/home')
  }

  const menuPaperStyle = {
    elevation: 0,
    sx: {
      overflow: "visible",
      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
      mt: 1.5,
      "& .MuiAvatar-root": {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      "&:before": {
        content: '""',
        display: "block",
        position: "absolute",
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: "background.paper",
        transform: "translateY(-50%) rotate(45deg)",
        zIndex: 0,
      },
    },
  }

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Typography fontSize='1.5em' sx={{ pr: 2 }}>{userData.money}</Typography>
        <Typography fontSize='1.5em' >{userData.login}</Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar src={avatar} sx={{ width: 40, height: 40 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={menuPaperStyle}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
