import { uiActions } from "../store/ui-slice";
import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { useAppDispatch, useAppSelector } from "../store/app/hooks";
import AccountMenu from "./AccountMenu";
import { useMediaQuery } from "react-responsive";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const userUiData = useAppSelector((store) => store.ui);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const toogleMenu = () => {
    dispatch(uiActions.toggle());
  };
  return (
    <AppBar
      position="static"
      sx={{
        height: "4rem",
        background: "rgba(12,52,86,0.85)",
      }}
    >
      <Toolbar>
        <IconButton
          onClick={toogleMenu}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 1 }}
        >
          <MenuIcon sx={{ fontSize: "2.5rem" }} />
        </IconButton>
        <div className="flex grow">
          <Link to={"/home"}>
            <Typography
              variant="h5"
              fontSize="1.3rem"
              sx={{ border: 2, borderColor: "white", borderRadius: 2, px: 0.5 }}
            >
              {isMobile ? "FD" : "FutDraft"}
              <SportsSoccerIcon fontSize="medium" sx={{ paddingBottom: 0.5 }} />
            </Typography>

          </Link>
        </div>
        {!userUiData.logged ?
          <Link to={"/account/login"}>
            <Button
              color="inherit"
              sx={{
                "& .MuiTypography-root": {
                  textTransform: "none",
                },
              }}
            >
              <Typography fontSize="1.5rem">
                Login
              </Typography>
            </Button>
          </Link>
          : <div className="flex gap-12">
            <AccountMenu userData={userUiData.userData} />
          </div>}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
