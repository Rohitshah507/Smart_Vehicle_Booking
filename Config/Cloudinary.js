import { v2 as cloudinary, UploadStream } from "cloudinary";
import Config from "./Config.js";

cloudinary.config({
  cloud_name: Config.cloudinary_cloud_name,
  api_key: Config.cloudinary_api_key,
  api_secret: Config.cloudinary_api_secret,
});

const uploadCloudinary = async (file) => {
  if (!file) {
    return null;
  }

  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
        },
        (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data.secure_url ?? null);
          }
        },
      );
      uploadStream.end(file.buffer);
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { uploadCloudinary };
