import crypto from "crypto";

// Generates a signature for a direct, signed client-side upload to Cloudinary.
// Keeps the API secret on the server while letting the browser upload the
// video file straight to Cloudinary (no large file passes through Vercel).
export function buildUploadSignature(paramsToSign: Record<string, string | number>) {
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;
  const sorted = Object.keys(paramsToSign)
    .sort()
    .map((key) => `${key}=${paramsToSign[key]}`)
    .join("&");

  const signature = crypto
    .createHash("sha1")
    .update(sorted + apiSecret)
    .digest("hex");

  return signature;
}

export async function destroyCloudinaryAsset(publicId: string) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
  const apiKey = process.env.CLOUDINARY_API_KEY!;
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = buildUploadSignature({ public_id: publicId, timestamp });

  const body = new URLSearchParams({
    public_id: publicId,
    timestamp: String(timestamp),
    api_key: apiKey,
    signature
  });

  await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/destroy`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });
}
