"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { FaStar } from "react-icons/fa";

interface RatingStarProps {
  setRating: Dispatch<SetStateAction<number>>;
}

const RatingStar = ({ setRating }: RatingStarProps) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const handleClick = (value: number) => {
    setCurrentValue(value);
    setRating(value);
  };

  const handleMouseOver = (newHoverValue: any) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <div className="flex flex-row justify-center my-2 gap-2">
      {stars.map((_, index) => {
        return (
          <FaStar
            key={index}
            className="cursor-pointer"
            size={24}
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
            color={(hoverValue || currentValue) > index ? "#8162FF" : "#26272B"}
          />
        );
      })}
    </div>
  );
};

export default RatingStar;
