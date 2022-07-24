import S3 from "aws-sdk/clients/s3.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

export const getPresignedUrl = async (req, res) => {
  try {
    const { fileType, fileName } = req.body;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${fileType}/${uuidv4()} - ${fileName}`,
      Expires: 60,
    };

    const s3 = new S3({ signatureVersion: "v4", region: "us-east-1" });
    const data = await s3.getSignedUrlPromise("putObject", params);

    res.json(data);
  } catch (error) {
    console.log("error", error);
  }
};
