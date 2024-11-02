export interface CloudinaryImageProps {
    imgName: string;
    imgFormamt: string;
    imgAltText: string;
    className?: string;
    width?: string | number | undefined;
    imgAccessibility: boolean;
    accessibilityMode?: AccessibilityMode;
}

export enum AccessibilityMode {
    DARK_MODE = 'darkmode',
    BRIGHT_MODE = 'brightmode',
    MONOCHROME = 'monochrome', 
    COLOR_BLIND = 'colorblind',
}