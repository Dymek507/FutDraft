import React, { useState } from "react";
import Layout from "../components/UI/Layout";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Card from "../components/Card";

import styles from "./HomePage.module.css";

const HomeScreen = () => {
  const player = {
    id: 1283,
    resourceId: 231747,
    resourceBaseId: 231747,
    futBinId: 26263,
    futWizId: 26,
    firstName: "Kylian",
    lastName: "Mbappé",
    name: "Kylian Mbappé",
    commonName: "Mbappé",
    height: 182,
    weight: 73,
    birthDate: "1998-12-20",
    age: 24,
    league: 16,
    nation: 18,
    club: 73,
    rarity: 1,
    traits: [
      {
        id: 1,
        name: "Technical Dribbler (CPU AI)",
      },
      {
        id: 4,
        name: "Solid Player",
      },
      {
        id: 6,
        name: "Speed Dribbler (CPU AI)",
      },
      {
        id: 8,
        name: "Flair",
      },
      {
        id: 9,
        name: "Outside Foot Shot",
      },
    ],
    specialities: [],
    position: "ST",
    skillMoves: 5,
    weakFoot: 4,
    foot: "Right",
    attackWorkRate: "High",
    defenseWorkRate: "Low",
    totalStats: 470,
    totalStatsInGame: 2223,
    color: "gold",
    rating: 91,
    ratingAverage: 78,
    pace: 97,
    shooting: 89,
    passing: 80,
    dribbling: 92,
    defending: 36,
    physicality: 76,
    paceAttributes: {
      acceleration: 97,
      sprintSpeed: 97,
    },
    shootingAttributes: {
      positioning: 92,
      finishing: 93,
      shotPower: 88,
      longShots: 82,
      volleys: 83,
      penalties: 80,
    },
    passingAttributes: {
      vision: 83,
      crossing: 78,
      freeKickAccuracy: 69,
      shortPassing: 85,
      longPassing: 71,
      curve: 80,
    },
    dribblingAttributes: {
      agility: 93,
      balance: 81,
      reactions: 93,
      ballControl: 91,
      dribbling: 93,
      composure: 88,
    },
    defendingAttributes: {
      interceptions: 38,
      headingAccuracy: 72,
      standingTackle: 34,
      slidingTackle: 32,
      defenseAwareness: 26,
    },
    physicalityAttributes: {
      jumping: 77,
      stamina: 87,
      strength: 76,
      aggression: 64,
    },
    goalkeeperAttributes: {
      diving: null,
      handling: null,
      kicking: null,
      positioning: null,
      reflexes: null,
      speed: 97,
    },
  };
  return (
    <Layout styles={{ backgroundColor: "red", position: "relative" }}>
      <div className={styles.playerRoundAnimation}>
        <Card playerData={player} sendPlayer={() => {}} />
      </div>
    </Layout>
  );
};

export default HomeScreen;
