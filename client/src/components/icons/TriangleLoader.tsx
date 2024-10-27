import React from "react";
import { Triangle } from "react-loader-spinner";

type TriangleProps = {
  height: number;
  width: number;
  customCss: string;
};

const TriangleLoader: React.FC<TriangleProps> = ({
  height,
  width,
  customCss,
}) => {
  return (
    <Triangle
      visible={true}
      height={height}
      width={width}
      color="#26df"
      ariaLabel="triangle-loader"
      wrapperClass={customCss}
      wrapperStyle={{}}
    />
  );
};

export default TriangleLoader;
