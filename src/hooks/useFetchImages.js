import { useState, useEffect } from "react";
import { useFetcherSWR } from "./useFetcherSWR";
import axios from "axios";

const AuthToken = "9da99810-9712-4bb5-a2a6-73e3df0078c0";

const axiosFetchBlob = {
  responseType: "blob",
  headers: {
    Accept: "image/png",
    "X-Auth-Token": AuthToken,
  },
};

export const useFetchImages = (playerObject) => {
  const { id, club, nation } = playerObject;

  const playerPhoto = useFetcherSWR(`players/${id}/image`);

  const [playerImages, setPlayerImages] = useState({});

  useEffect(() => {
    if (playerPhoto) {
      setPlayerImages((prev) => ({ ...prev, playerPhoto }));
    }
  }, [playerPhoto]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // 2.Generuj zdjęcie piłkarza
        // const playerPhoto = URL.createObjectURL(data);
        // setPlayerImages((prev) => ({ ...prev, playerPhoto }));

        //3.Generuj zdjęcie kraju
        axios
          .get(`https://futdb.app/api/nations/${nation}/image`, axiosFetchBlob)
          .then((response) => response)
          .then((blob) => {
            const playerNation = URL.createObjectURL(blob.data);
            // console.log("3");
            setPlayerImages((prev) => ({ ...prev, playerNation }));
            playerImages.playerNation = playerNation;
          });

        //4.Generuj zdjęcie klubu
        axios
          .get(`https://futdb.app/api/clubs/${club}/image`, axiosFetchBlob)
          .then((response) => response)
          .then((blob) => {
            const playerClub = URL.createObjectURL(blob.data);
            // console.log("4");
            setPlayerImages((prev) => ({ ...prev, playerClub }));
            playerImages.playerClub = playerClub;
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPhotos();
  }, [playerObject]);
  return playerImages;
};