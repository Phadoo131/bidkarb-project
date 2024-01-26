import { useState } from "react";
import ImageCloud from "./ImageCloud";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

export default function ImageCloudUploader({ onUploadSuccess }) {
  const [publicId, setPublicId] = useState("");

  const cdName = "ddijfznji";

  const uwConfig = {
    cloudName: cdName,
    uploadPreset: "tsq7opbn",
    folder: `bidkarb`
  }

  const cld = new Cloudinary({
    cloud: {
      cdName
    }
  });

  const myImage = cld.image(publicId);

  return (
    <>
    <ImageCloud
      uwConfig={uwConfig}
      setPublicId={setPublicId}
      onUploadSuccess={onUploadSuccess}
    />

    <AdvancedImage
      style={{ maxWidth: "0%" }}
      cldImg={myImage}
      plugins={[responsive(), placeholder()]}
    />
  </>
  );
}
