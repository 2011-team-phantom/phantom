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

  const events = [
    {
      eventName: "complete",
      callback: () => console.log("the animation completed:"),
    },
  ];

  return (
    <div>
      <Lottie
        options={defaultOptions}
        height={100}
        width={100}
        eventListeners={events}
      />
    </div>
  );
}
