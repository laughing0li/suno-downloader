// utils/uploadToCloudflareFromUrl.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: "auto",
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
    endpoint: process.env.R2_ENDPOINT,
});

export const uploadMediaToS3 = async (
    fileUrl: string,
    storagePath: string
) => {
    try {
        const response = await fetch(fileUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch file from URL: ${fileUrl}`);
        }
        // storagePath should add the user id to avoid conflicts
        // storagePath = `${userId}/${storagePath}`;
        const uploadParams = {
            Bucket: process.env.R2_BUCKET_NAME,
            Key: storagePath,
            Body: response.body,
        };
    
        await s3Client.send(new PutObjectCommand(uploadParams));
        return `${process.env.R2_CUSTOM_DOMAIN}/${storagePath}`;
    } catch (e) {
        console.error("Error uploading file to S3:", e);
        throw new Error("Error uploading file to S3");
    }
};
