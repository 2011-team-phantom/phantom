import React from "react";
import Lottie from "react-lottie";
import coin from "../../public/src/44076-dollar.json";

export default function CoinAnimation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: coin,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie
        options={defaultOptions}
        height={100}
        width={100}
      />
    </div>
  );
}
