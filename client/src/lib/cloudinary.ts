import { Cloudinary } from "@cloudinary/url-gen";

const cloudName = import.meta.env.VITE_CLOUDINARY_NAME ?? "";

if (!cloudName) {
    console.error(`Missing Cloud Name: ${cloudName}`);
}

const cloudinary = new Cloudinary({
    cloud: {
        cloudName: cloudName
    }
})

export default cloudinary;