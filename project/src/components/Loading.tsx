import React from "react";
import { ClimbingBoxLoader } from "react-spinners";

const Loading = () => {
  return (
    <>
      <ClimbingBoxLoader
        color="#9995e1"
        cssOverride={{
          position: "relative",
          top: "25em",
          left: "25em",
        }}
        size={55}
        speedMultiplier={0.8}
      />
    </>
  );
};

export default Loading;
