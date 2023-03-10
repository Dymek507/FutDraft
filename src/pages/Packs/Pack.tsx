import React from "react";
import { useState } from "react";
import { PackT } from "../../modules/modelTypes";
import { PackImages } from "../../assets/packs"
import packImages from "../../assets/packs"



interface IPack {
  packData: PackT;
  openModal: (state: boolean) => void;
  onClick: (data: PackT) => void;
}

const Pack = ({ packData, openModal, onClick }: IPack) => {
  const { id, packRating, packColor, playersAmount, packAmount } = packData;

  const [clicked, setClicked] = useState<boolean>(false);

  const clickHandler = (data: PackT) => {
    setClicked(true);
    setTimeout(() => {
      onClick(data);
      setClicked(false);
    }, 500);
  };

  return (
    <div
      onClick={() => clickHandler(packData)}
      className={`relative flex flex-col justify-center items-center gap-[2em] h-[16em] w-[11em] text-white bg-cover cursor-pointer ${clicked ? 'animate-ping' : ""}`}
      style={{ backgroundImage: `url('${packImages[packColor as keyof PackImages]}')` }}
    >
      {packAmount > 1 && (
        <div className="absolute flex justify-center items-center top-0 right-[1em] w-[1em] h-[3em] border-x-[#ce6979] border-x-[1em] border-b-transparent border-b-[1em] drop-shadow-2xl">
          <p className="text-[0.9em] px-[0.5em] pb-[0.1em] border-2 rounded-full">
            {packAmount}
          </p>
        </div>
      )}
    </div>
  );
};

export default Pack;
