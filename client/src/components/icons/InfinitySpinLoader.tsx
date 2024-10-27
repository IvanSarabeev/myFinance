import React from "react";
import { InfinitySpin } from "react-loader-spinner";

type InfinitySpinProps = {
  customColor: string;
};

const InfinitySpinLoader: React.FC<InfinitySpinProps> = ({ customColor }) => {
  return <InfinitySpin width="400" color={customColor} />;
};

export default InfinitySpinLoader;
