export type Player = {
  id: number;
  rating: number;
  skillMoves: number;
  weakFoot: number;
  totalStatsInGame: number;
  rarity: number;
  color: "bronze" | "silver" | "gold";
  commonName: string;
  league: number;
  position: string;
  pace: number;
  club: number;
  nation: number;
  playerPrice?: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physicality: number;
  goalkeeperAttributes: {
    diving: number | null;
    handling: number | null;
    kicking: number | null;
    positioning: number | null;
    reflexes: number | null;
    speed: number | null;
  };
};

export interface ISlot {
  nr: number;
  pos: string;
  x: number;
  y: number;
  playerId: number | null;
}

export type PackT = {
  id: number;
  packPrice: number;
  packRating: number;
  packColor: string;
  playersAmount: number;
  packAmount: number;
};

export type UserData = {
  login: string;
  uId: string | null;
  money: number;
  result: { wins: number; draws: number; loses: number };
  goals: { goalsFor: number; goalsAgainst: number };
  packs: PackT[];
};

export type UserDataOnDb = {
  currentPackPlayers: Players[];
  email: string;
  goals: {
    goalsFor: number;
    goalsAgainst: number;
  };
  login: string;
  money: number;
  packs: PackT[];
  playersData: Player[];
  result: {
    wins: number;
    draws: number;
    loses: number;
  };
  squadData: ISlot[];
};

export type ResultT = {
  resultId: string;
  date: string;
  userOneUid: string;
  userTwoUid: string;
  userOneGoals: number;
  userTwoGoals: number;
};

export type SnackT = {
  variant: "default" | "error" | "success" | "warning" | "info";
  text: string;
};
