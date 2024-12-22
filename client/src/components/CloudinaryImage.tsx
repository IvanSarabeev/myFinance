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
import { AccessibilityMode, CloudinaryImageProps } from "@/types/utilTypes";

const CloudinaryImage: React.FC<CloudinaryImageProps> = memo(
  ({
    imgName,
    imgFormamt = "auto",
    imgAltText,
    className,
    width = "auto",
    imgAccessibility = false,
    accessibilityMode = AccessibilityMode.MONOCHROME,
  }) => {
    const cloudImage = cloudinary.image(imgName);

    if (width !== "") {
      cloudImage.resize(scale().width(width ?? ""));
    }

    if (imgFormamt) {
      cloudImage.format(imgFormamt);
    }

    const imagePlugins = [lazyload(), responsive(), placeholder()];

    if (imgAccessibility) {
      imagePlugins.push(
        accessibility({
          mode: accessibilityMode ?? AccessibilityMode.DARK_MODE,
        })
      );
    }

    return (
      <AdvancedImage
        cldImg={cloudImage.format(imgFormamt)}
        alt={imgAltText}
        className={className}
        plugins={imagePlugins}
      />
    );
  }
);

export default CloudinaryImage;
