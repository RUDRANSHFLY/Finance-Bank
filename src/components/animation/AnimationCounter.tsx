"use client";

import React from "react";
import CountUp from "react-countup";

const AnimationCounter = ({ amount }: { amount: number }) => {
  return (
    <div>
      <CountUp prefix="₹" end={amount} decimal={","} />
    </div>
  );
};

export default AnimationCounter;
