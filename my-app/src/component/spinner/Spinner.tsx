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
      className="animate-spin rounded-full border-solid"
      style={{
        width: size,
        height: size,
        borderWidth: borderWidth,
        borderTopColor: "transparent",
        borderRightColor: color,
        borderBottomColor: color,
        borderLeftColor: color,
        borderStyle: "solid",
        margin: "auto",
      }}
    />
  );
};

export default Spinner;
