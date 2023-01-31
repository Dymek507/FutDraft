import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, styled } from "@mui/material/styles";

import { playersActions } from "../store/players-slice";
import { fetchPlayersData, deletePlayer } from "../store/players-actions";

import {
  Button,
  CardActions,
  CardContent,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  Card as MuiCard,
} from "@mui/material";
import Card from "../components/Card";
import { Box } from "@mui/system";

const MyPlayers = () => {
  const dispatch = useDispatch();
  const playersArray = useSelector((state) => state.players.myPlayers);
  const uId = useSelector((state) => state.ui.uId);

  useEffect(() => {
    dispatch(fetchPlayersData());
  }, [dispatch, uId]);

  const [pickedPlayers, setPickedPlayers] = useState([]);

  const pickPlayer = (playerData) => {
    const playerExists = pickedPlayers.find(
      (player) => player.id === playerData.id
    );

    if (!playerExists) {
      setPickedPlayers((prev) => [...prev, playerData]);
    } else {
      let newPickedPlayers = [...pickedPlayers];
      newPickedPlayers = newPickedPlayers.filter(
        (player) => player.id !== playerExists.id
      );
      setPickedPlayers(newPickedPlayers);
    }
  };

  const deletePlayers = () => {
    pickedPlayers.forEach((player) => {
      dispatch(playersActions.deleteFromMyPlayers(player.id));
      dispatch(deletePlayer(player.id));
    });
  };

  const CardWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: "theme.primary.mainDarker",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }));

  return (
    <Box
      bgcolor="primary.main"
      sx={{ minHeight: "86vh", mx: "2rem", mt: "2rem", p: "1rem" }}
    >
      <Grid container rowSpacing={2} columnSpacing={2}>
        {playersArray?.map((player) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <CardWrapper>
              <Card
                key={player.id}
                playerData={player}
                sendPlayer={pickPlayer}
                fontSize={"14px"}
              />
            </CardWrapper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyPlayers;
