import React from "react";

interface SpinnerProps {
  size?: number;
  color?: string;
  borderWidth?: number;
}

const Spinner = ({
  size = 20,
  color = "white",
  borderWidth = 2,
}: SpinnerProps) => {
  return (
    <div
      className={`animate-spin rounded-full border-${borderWidth} border-t-transparent`}
      style={{
        width: size,
        height: size,
        borderTopColor: color,
        borderRightColor: color,
        borderBottomColor: color,
        borderLeftColor: "transparent",
        margin: "auto",
      }}
    />
  );
};

export default Spinner;
