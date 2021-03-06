import React from "react";
import Lottie from "react-lottie";
import piggy from "../../public/src/41477-save-piggy-bank.json";

export default function Animation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: piggy,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie
        options={defaultOptions}
        height={300}
        width={300}
      />
    </div>
  );
}
