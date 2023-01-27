import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";

import { sendPlayersData, fetchPlayersData } from "../../store/players-actions";

import { playersActions } from "../../store/players-slice";

import OpeningAnimation from "../OpeningAnimation";
import { Button } from "@mui/material";

const OpeningModal = ({ onOpen, onClose }) => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [pickedPlayers, setPickedPlayers] = useState([]);

  const dispatch = useDispatch();

  const currentPack = useSelector((state) => state.players.currentPack);
  const myPlayers = useSelector((state) => state.players.myPlayers);
  console.log(myPlayers);

  useEffect(() => {
    if (myPlayers && myPlayers.length === 0) {
      dispatch(fetchPlayersData());
    }
  }, [dispatch]);

  const hideAnimation = () => {
    setShowAnimation(false);
  };

  useEffect(() => {
    const openingTimer = setTimeout(hideAnimation, 2000);

    return () => {
      clearTimeout(openingTimer);
    };
  }, []);

  // Makes array with picked players, ready to send to myPlayers
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

  const sendAllPlayer = () => {
    currentPack.forEach((player) => {
      dispatch(playersActions.addPlayerToMyPlayers(player));
    });
    if (myPlayers.length === 0) {
      dispatch(fetchPlayersData());
    }
    dispatch(sendPlayersData());
    onClose(false);
  };

  const sendPickedPlayers = () => {
    pickedPlayers.forEach((player) =>
      dispatch(playersActions.addPlayerToMyPlayers(player))
    );
    if (myPlayers.length === 0) {
      dispatch(fetchPlayersData());
    }
    dispatch(sendPlayersData());
    onClose(false);
  };

  const rejectAllPlayers = () => {
    dispatch(playersActions.deleteCurrentPack());
    onClose(false);
  };

  return (
    <Modal
      open={onOpen}
      onClose={() => onClose(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div className="relative flex flex-col w-screen h-screen bg-opening-c bg-cover overflow-x-hidden justify-center">
        {showAnimation && <OpeningAnimation />}
        <div className="flex justify-center mt-20 gap-2  ">
          <Button size="small" variant="contained" onClick={sendAllPlayer}>
            Wyślij do klubu
          </Button>
          <Button size="small" variant="contained" onClick={sendPickedPlayers}>
            Wyślij wybranych
          </Button>
          <Button size="small" variant="contained" onClick={rejectAllPlayers}>
            Odrzuć
          </Button>
        </div>
        <div className="flex flex-wrap w-full mt-8 overflow-x-hidden gap-1 justify-center">
          {currentPack &&
            currentPack.map((player) => (
              <Card
                key={player.id}
                playerData={player}
                sendPlayer={pickPlayer}
              />
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default OpeningModal;
