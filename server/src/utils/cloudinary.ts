import { v2 } from "cloudinary";

class CloudinaryService {
  constructor() {
    v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
      api_key: process.env.CLOUDINARY_API_KEY!,
      api_secret: process.env.CLOUDINARY_API_SECRET!,
      secure: true,
    });
  }

  async upload(mediaPath: string, folder: string = "edulearn") {
    try {
      const result = await v2.uploader.upload(mediaPath, {
        resource_type: "auto",
        folder,
      });
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async delete(
    mediaId: string,
    resourceType: "auto" | "image" | "video" | "raw" = "auto"
  ) {
    try {
      const result = await v2.uploader.destroy(mediaId, {
        resource_type: resourceType,
      });
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const cloudinary = new CloudinaryService();
