import React, { useEffect, useMemo, useState } from "react";
import Modal from "@mui/material/Modal";

import OpeningAnimation from "./OpeningAnimation";
import WalkoutAnimation from "./WalkoutAnimation";
import OpeningBoard from "./OpeningBoard";
import sortPlayers from "../../../components/utils/sortPlayers";
import { PackT, Player } from "../../../modules/modelTypes";
import { useAppSelector } from "../../../store/app/hooks";
import dummyPlayer from "../../../data/dummyPlayer";

type OpeningModalProps = {
  showModal: boolean;
  onClose: (state: boolean) => void;
  packData: PackT | null
}

const OpeningModal = ({ showModal, onClose, packData }: OpeningModalProps) => {
  const currentPack = useAppSelector((state) => state.players.currentPack);
  const [showAnimation, setShowAnimation] = useState(true);
  console.log(showAnimation)
  const [playersReady, setPlayersReady] = useState(false);
  const [playersLoaded, setPlayersLoaded] = useState(0);
  const [showWalkout, setShowWalkout] = useState(false);
  const [walkoutPlayer, setWalkoutPlayer] = useState<Player>(dummyPlayer);

  const playersArray = useMemo(
    () => sortPlayers(currentPack, "ovr", true),
    [currentPack]
  );

  useEffect(() => {
    if (packData !== null) {
      setPlayersLoaded(currentPack.length / packData.playersAmount * 100)
      console.log((currentPack.length / packData.playersAmount) * 100)
      if (currentPack.length === packData.playersAmount) {
        setPlayersReady(true);
      }
    }
  }, [currentPack, packData]);

  useEffect(() => {
    let animationTimer: ReturnType<typeof setTimeout>
    if (playersReady) {
      const bestPlayerInPack = playersArray[0];
      if (bestPlayerInPack?.rating > 71) {
        setWalkoutPlayer(bestPlayerInPack);
        setShowWalkout(true);
      }
      animationTimer = setTimeout(() => {
        setShowAnimation(false);
        console.log('timeron')
      }, 3000);
    }
    return () => {
      clearTimeout(animationTimer);
      console.log('timerooff')
    };
  }, [playersReady, playersArray]);

  const closeWalkoutHandler = () => {
    setShowWalkout(false);
  };

  return (
    <Modal
      open={showModal}
      onClose={() => onClose(false)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <>
        {showAnimation ? <OpeningAnimation isVisible={!playersReady} progress={playersLoaded} /> : null}
        {showWalkout ? (
          <WalkoutAnimation
            player={walkoutPlayer}
            closeWalkout={closeWalkoutHandler}
          />
        ) : null}
        <OpeningBoard onClose={onClose} />
      </>
    </Modal>
  );
};

export default OpeningModal;
