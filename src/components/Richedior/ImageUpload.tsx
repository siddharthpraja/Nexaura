"use client";
import React from "react";
import { CiImageOn } from "react-icons/ci";

interface ImageUploadProps {
  onUpload: (src: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          onUpload(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex bg-neutral-50 text-neutral-900">
      <label htmlFor="imageLabel" className="flex border border-neutral-900 rounded-md p-1 m-2 items-center cursor-pointer">
        <CiImageOn className="text-2xl" />
        <span>Upload Image</span>
      </label>
      <input
        type="file"
        accept="image/*"
        id="imageLabel"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
