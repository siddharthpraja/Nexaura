"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ResizableMovableImage from "./ResizableMovableImage";
import ImageUpload from "./ImageUpload";

const Editor: React.FC = () => {
  const [editorContent, setEditorContent] = useState("");
  const [images, setImages] = useState<{
    [key: string]: {
      src: string;
      id: string;
      x: number;
      y: number;
      width: number;
      height: number;
    };
  }>({});

  const handleDelete = (id: string) => {
    const updatedImages = Object.values(images).filter(
      (image) => image.id !== id
    );
    setImages(
      updatedImages.reduce((acc, image) => ({ ...acc, [image.id]: image }), {})
    );
  };

  const handleChange = (content: string) => {
    setEditorContent(content);
  };

  const handleImageUpload = (src: string) => {
    const id = new Date().toISOString();
    setImages((prev) => ({
      ...prev,
      [id]: { src, id, x: 0, y: 0, width: 100, height: 100 },
    }));
  };

  const handleImageMove = (id: string, x: number, y: number) => {
    setImages((prev) => ({ ...prev, [id]: { ...prev[id], x, y } }));
  };

  const handleImageResize = (id: string, width: number, height: number) => {
    setImages((prev) => ({ ...prev, [id]: { ...prev[id], width, height } }));
  };

  return (
    <div className="rich-relative rounded-md overflow-hidden">
      <ImageUpload onUpload={handleImageUpload} />
      <ReactQuill
        value={editorContent}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline"],
            [{ color: [] }, { background: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["undo", "redo"],
          ],
        }}
        formats={[
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "color",
          "background",
          "bullet",
          "align",
          "link",
          "undo",
          "redo",
        ]}
        theme="snow"
        className="h-screen text-black bg-white"
      />

      {Object.entries(images).map(([id, img]) => (
        <div>
          
          <ResizableMovableImage
            key={id}
            src={img.src}
            onDelete={handleDelete}
            id={id}
            onMove={handleImageMove}
            onResize={handleImageResize}
          />
        </div>
      ))}
    </div>
  );
};

export default Editor;
