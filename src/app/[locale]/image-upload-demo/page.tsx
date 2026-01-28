"use client";

import { Button, Form, Input, ImageUpload, AvatarUpload, GalleryUpload, message } from "@/src/components/forms";
import type { UploadFile } from "antd";
import { useState } from "react";

export default function ImageUploadDemoPage() {
  const [avatarFile, setAvatarFile] = useState<UploadFile | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<UploadFile[]>([]);

  const handleSubmit = async (values: Record<string, unknown>) => {
    console.log("Form values:", values);
    console.log("Avatar:", avatarFile);
    console.log("Gallery:", galleryFiles);
    message.success("Form submitted successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-20">
      <h1 className="text-4xl font-bold mb-4 text-sky-600 text-center">
        Image Upload Components Demo
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
        Examples of different image upload components
      </p>

      <div className="space-y-8">
        {/* Example 1: Single Image Upload */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            1. Single Image Upload (Drag & Drop)
          </h2>
          <Form onFinish={handleSubmit} layout="vertical">
            <Input label="Product Name" name="productName" required />

            <ImageUpload
              label="Product Image"
              name="productImage"
              maxCount={1}
              maxSize={5}
              accept="image/*"
              className="mt-4"
            />

            <Button htmlType="submit" type="primary" className="mt-4">
              Submit
            </Button>
          </Form>
        </div>

        {/* Example 2: Avatar Upload */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            2. Avatar Upload (Circular)
          </h2>
          <div className="flex items-start gap-8">
            <AvatarUpload
              label="Profile Avatar"
              name="avatar"
              maxSize={2}
              onChange={setAvatarFile}
            />
            <div className="flex-1">
              <Form onFinish={handleSubmit} layout="vertical">
                <Input label="Full Name" name="fullName" required />
                <Input label="Email" name="email" type="email" required />

                <Button htmlType="submit" type="primary">
                  Update Profile
                </Button>
              </Form>
            </div>
          </div>
        </div>

        {/* Example 3: Gallery Upload */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            3. Gallery Upload (Multiple Images)
          </h2>
          <Form onFinish={handleSubmit} layout="vertical">
            <Input label="Gallery Title" name="galleryTitle" required />

            <GalleryUpload
              label="Upload Gallery Images (Max 10)"
              name="gallery"
              maxCount={10}
              onChange={setGalleryFiles}
              className="mt-4"
            />

            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Uploaded: {galleryFiles.length} images
            </div>

            <Button htmlType="submit" type="primary" className="mt-4">
              Create Gallery
            </Button>
          </Form>
        </div>

        {/* Example 4: Multiple Images (Drag & Drop) */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            4. Multiple Images with Drag & Drop
          </h2>
          <Form onFinish={handleSubmit} layout="vertical">
            <Input label="Album Name" name="albumName" required />

            <ImageUpload
              label="Upload Multiple Images (Max 5)"
              name="albumImages"
              maxCount={5}
              maxSize={10}
              multiple={true}
              accept="image/png,image/jpeg,image/webp"
              className="mt-4"
            />

            <Button htmlType="submit" type="primary" className="mt-4">
              Create Album
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
