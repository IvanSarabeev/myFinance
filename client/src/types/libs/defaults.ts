import { AccessibilityMode } from "@/configs/defaults";

/**
 * Cloudinary Props
 */
export interface CloudinaryImageProps {
    imgName: string;
    imgFormamt: string;
    imgAltText: string;
    className?: string;
    width?: string | number;
    imgAccessibility: boolean;
    accessibilityMode?: typeof AccessibilityMode;
};
