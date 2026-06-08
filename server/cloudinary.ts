import { v2 as cloudinary } from 'cloudinary';

let isConfigured = false;

export function getCloudinary() {
  if (!isConfigured) {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'digysyrnj';
    const apiKey = process.env.CLOUDINARY_API_KEY || '866166954845758';
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret || 'your_api_secret' // safe fallback
    });

    isConfigured = true;
    console.log(`☁️ Cloudinary initialized with cloud_name: ${cloudName}`);
  }
  return cloudinary;
}

/**
 * Uploads a base64 encoded image or raw image data URL to Cloudinary.
 * If the provided string is already a URL, return it directly.
 * @param imageString Base64 image payload or an existing asset URL
 * @returns Uploaded secure URL from Cloudinary
 */
export async function uploadToCloudinary(imageString: string): Promise<string> {
  if (!imageString) return '';
  
  // If it's already a URL (e.g. starts with http or https), no need to upload
  if (imageString.startsWith('http://') || imageString.startsWith('https://')) {
    return imageString;
  }

  const c = getCloudinary();
  try {
    const uploadResult = await c.uploader.upload(imageString, {
      folder: 'roymen_apparel',
    });
    console.log(`✅ Cloudinary upload successful: ${uploadResult.secure_url}`);
    return uploadResult.secure_url;
  } catch (error: any) {
    console.error('❌ Cloudinary Upload Error details:', error);
    // Return original string as fallback so application doesn't crash
    return imageString;
  }
}
