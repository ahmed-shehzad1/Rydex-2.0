import React, { useEffect, useState } from "react";

export default function ExplodedCar() {
  const [frame, setFrame] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const currentFrame = Math.min(
        37,
        Math.max(1, Math.floor(scrollTop / 20))
      );

      setFrame(currentFrame);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <img
      src={`/frames/frame (${frame}).png`}
      alt="Exploded Car"
      style={{
        width: "100%",
        maxWidth: "700px",
        objectFit: "contain",
        filter: "drop-shadow(0 20px 40px rgba(16,185,129,0.25))",
        transition: "all 0.1s linear"
      }}
    />
  );
}