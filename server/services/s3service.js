import S3 from "aws-sdk/clients/s3.js";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

export const s3Upload = async (place, file) => {
  // const fileContent = fs.readFileSync(file);
  // console.log("fileContent", fileContent);
  // return fileContent;

  const s3 = new S3();
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${place}/${uuidv4()}`,
    Body: file,
  };
  const data = await s3.upload(params).promise();

  console.log("data", data);
  return data.Location;
};
