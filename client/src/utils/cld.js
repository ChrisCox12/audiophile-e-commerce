import { Cloudinary } from '@cloudinary/url-gen';


const cld = new Cloudinary({
    cloud: {
        cloudName: process.env.REACT_APP_CLOUD_NAME
    }
});

export default cld;