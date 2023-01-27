import { playersActions } from "./players-slice";

export const fetchPlayersData = () => {
  return async (dispatch, getState) => {
    const uId = getState().ui.uId;
    const fetchData = async () => {
      const response = await fetch(
        `https://futdraft-5f63c-default-rtdb.europe-west1.firebasedatabase.app/users/${uId}/players-data.json`
      );

      let data = await response.json();
      if (data === null) {
        data = [];
      }

      return data;
    };

    try {
      const playersData = await fetchData();
      dispatch(playersActions.replaceAllMyPlayers(playersData));
    } catch (error) {
      console.log("Błąd" + error);
    }
  };
};

export const sendPlayersData = (players) => {
  return async (dispatch, getState) => {
    const uId = getState().ui.uId;
    const myPlayers = await getState().players.myPlayers;
    const sendRequest = async () => {
      const response = await fetch(
        `https://futdraft-5f63c-default-rtdb.europe-west1.firebasedatabase.app/users/${uId}/players-data.json`,

        {
          method: "PUT",
          body: JSON.stringify(myPlayers),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Sending players data failed.");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(`Błąd wysyłania ${error}`);
    }
  };
};
export const deletePlayer = (id) => {
  return async (dispatch, getState) => {
    await dispatch(playersActions.deleteFromMyPlayers(id));
    const uId = getState().ui.uId;
    const myPlayers = await getState().players.myPlayers;
    const deleteAllPlayersFromDB = async () => {
      await fetch(
        `https://futdraft-5f63c-default-rtdb.europe-west1.firebasedatabase.app/users/${uId}/players-data.json`,
        {
          method: "PUT",
          body: JSON.stringify([]),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    };
    const sendMyPlayersToDB = async () => {
      await fetch(
        `https://futdraft-5f63c-default-rtdb.europe-west1.firebasedatabase.app/users/${uId}/players-data.json`,
        {
          method: "PUT",
          body: JSON.stringify(myPlayers),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    };

    try {
      await deleteAllPlayersFromDB();
      await sendMyPlayersToDB();
    } catch (error) {
      console.log(`Błąd wysyłania ${error}`);
    }
  };
};
