import cloudinary from "./cloudinary";

async function uploadImage(fileString) {
    try {
        const uploadResponse = await cloudinary.uploader.upload(
            fileString,
            { upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET }
        );

        console.log('Image successfully uploaded');

        return uploadResponse.public_id;
    } 
    catch(error) {
        console.log(error);
    }
}

export default uploadImage;