import { Cloudinary } from "@cloudinary/url-gen";

const cloudinary = new Cloudinary({
    cloud: {
        cloudName: import.meta.env.VITE_CLOUDINARY_NAME ?? ''
    }
})

export default cloudinary;