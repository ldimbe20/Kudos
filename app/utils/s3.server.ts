// app/utils/s3.server.ts
import {
    unstable_parseMultipartFormData,
  } from "@remix-run/node";
  import type{
    UploadHandler,
  } from "@remix-run/node";
  import S3 from "aws-sdk/clients/s3";
  import cuid from "cuid";
//cuid tool used to generate unique ids. You will use this to generate random file names.   
  
  // 1
  const s3 = new S3({
    region: process.env.KUDOS_BUCKET_REGION,
    accessKeyId: process.env.KUDOS_ACCESS_KEY_ID,
    secretAccessKey: process.env.KUDOS_SECRET_ACCESS_KEY,
  });
  
  const uploadHandler: UploadHandler = async ({ name, filename, stream }) => {
    // 2
    if (name !== "profile-pic") {
      stream.resume();
      return;
    }
  
    // 3
    const { Location } = await s3
      .upload({
        Bucket: process.env.KUDOS_BUCKET_NAME || "",
        Key: `${cuid()}.${filename.split(".").slice(-1)}`,
        Body: stream,
      })
      .promise();
  
    // 4
    return Location;
  };

  export async function uploadAvatar(request: Request) {
    const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler
    );
  
    const file = formData.get("profile-pic")?.toString() || "";
  
    return file;
  }