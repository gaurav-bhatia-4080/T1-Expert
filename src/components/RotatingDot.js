import { useSpring, animated } from "react-spring";
import T1_Expert from "../img/T1_Expert.png";
import React, { useState, useEffect } from 'react';

const RotatingDot = () => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Update the angle for rotation
      setAngle((prevAngle) => (prevAngle + 1) % 360);
    }, 16); // Adjust the interval based on your desired animation speed

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const radius = 50; // Adjust the radius of the circle as needed

  const dotPosition = {
    x: radius * Math.cos((angle * Math.PI) / 180),
    y: radius * Math.sin((angle * Math.PI) / 180),
  };

  return (
    <div style={{ position: 'relative', width: '100px', height: '100px' }}>
      <img
        src={T1_Expert} // Replace with the actual URL of your image
        alt="Rotating Dot"
        style={{ width: '100%', height: '100%', borderRadius: '50%' }}
      />
      <div
        style={{
          position: 'absolute',
          width: '15px',
          height: '4px',
          backgroundColor: 'black', // Adjust dot color as needed
          borderRadius: '50%',
          transform: `translate(${dotPosition.x}px, ${dotPosition.y}px)`,
        }}
      />
    </div>
  );
};

export default RotatingDot;
