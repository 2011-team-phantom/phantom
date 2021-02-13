import React from "react";
import Lottie from "react-lottie";
import appmoney from "../../public/src/5055-latest-mobile-plus-website-savings.json";

export default function ProfileAnimation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: appmoney,
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
        height={400}
        width={400}
        eventListeners={events}
      />
    </div>
  );
}
