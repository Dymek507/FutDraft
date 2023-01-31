import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

const Logo = (props) => {
  return (
    <Link to={"/"}>
      <Typography
        variant="h5"
        fontSize="1.5rem"
        sx={{ border: 2, borderColor: "white", borderRadius: 2, px: 0.5 }}
      >
        {props.children}{" "}
        <SportsSoccerIcon fontSize="1rem" sx={{ paddingBottom: 0.5 }} />
      </Typography>
    </Link>
  );
};

const NavBar = () => {
  const dispatch = useDispatch();
  const logged = useSelector((store) => store.ui.logged);
  const user = useSelector((store) => store.ui.userData);
  const [name, domain] = user.split("@");

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
          <Logo>FutDraft</Logo>
        </div>

        <Link to={"/account/login"}>
          <Button
            color="inherit"
            sx={{
              "& .MuiTypography-root": {
                textTransform: "none",
              },
            }}
          >
            <Typography fontSize="1.5rem">{user ? name : "Login"}</Typography>
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
