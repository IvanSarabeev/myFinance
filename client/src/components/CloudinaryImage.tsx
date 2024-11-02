import React, { memo } from "react";
import cloudinary from "@/lib/cloudinary";
import { scale } from "@cloudinary/url-gen/actions/resize";
import {
  AdvancedImage,
  lazyload,
  placeholder,
  responsive,
  accessibility,
} from "@cloudinary/react";

interface CloudinaryImageProps {
  imgName: string;
  imgFormamt: string;
  imgAltText: string;
  className?: string;
  width?: string | number | undefined;
}

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  imgName,
  imgFormamt = "auto",
  imgAltText,
  className,
  width = "auto",
}) => {
  const cloudImage = cloudinary.image(imgName);

  if (width !== "") {
    cloudImage.resize(scale().width(width ?? ""));
  }

  if (imgFormamt) {
    cloudImage.format(imgFormamt);
  }

  return (
    <AdvancedImage
      cldImg={cloudImage.format(imgFormamt)}
      alt={imgAltText}
      className={className}
      plugins={[accessibility(), lazyload(), responsive(), placeholder()]}
    />
  );
};

const MemoCloudinaryImage = memo(CloudinaryImage);

export default MemoCloudinaryImage;
