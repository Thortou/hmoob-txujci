"use client";

import React, { useState } from "react";
import { Upload, message } from "antd";
import type { UploadProps, UploadFile } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

export interface ImageUploadProps {
  label?: string;
  name?: string;
  maxCount?: number;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in MB
  onChange?: (files: UploadFile[]) => void;
  className?: string;
  disabled?: boolean;
  value?: UploadFile[];
  defaultFileList?: UploadFile[];
}

export function ImageUpload({
  label,
  name,
  maxCount = 1,
  multiple = false,
  accept = "image/*",
  maxSize = 5, // 5MB default
  onChange,
  className = "",
  disabled = false,
  value = [],
  defaultFileList = [],
}: ImageUploadProps) {
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList);

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }

    const isLtSize = file.size / 1024 / 1024 < maxSize;
    if (!isLtSize) {
      message.error(`Image must be smaller than ${maxSize}MB!`);
      return false;
    }

    return true;
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    const newFileList = info.fileList.map((file) => {
      if (file.status === "done" && file.originFileObj) {
        return {
          ...file,
          url: URL.createObjectURL(file.originFileObj),
        };
      }
      return file;
    });

    setFileList(newFileList);

    if (onChange) {
      onChange(newFileList);
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (file.url) {
      window.open(file.url, "_blank");
    } else if (file.originFileObj) {
      const url = URL.createObjectURL(file.originFileObj);
      window.open(url, "_blank");
    }
  };

  const handleRemove = (file: UploadFile) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);

    if (onChange) {
      onChange(newFileList);
    }
  };

  const uploadProps: UploadProps = {
    name: name || "file",
    multiple,
    accept,
    fileList: value?.length ? value : fileList,
    disabled,
    beforeUpload,
    onChange: handleChange,
    onPreview: handlePreview,
    onRemove: handleRemove,
    listType: "picture-card",
    maxCount,
    className: `w-full ${className}`,
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <Dragger {...uploadProps} style={{ padding: "20px" }}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for single or bulk upload. Maximum file size {maxSize}MB.
        </p>
      </Dragger>
    </div>
  );
}

// Avatar Upload Component
export interface AvatarUploadProps {
  label?: string;
  name?: string;
  maxSize?: number;
  onChange?: (file: UploadFile | null) => void;
  className?: string;
  disabled?: boolean;
  value?: UploadFile;
  defaultValue?: UploadFile;
}

export function AvatarUpload({
  label,
  name = "avatar",
  maxSize = 2, // 2MB default for avatar
  onChange,
  className = "",
  disabled = false,
  value,
  defaultValue,
}: AvatarUploadProps) {
  const [file, setFile] = useState<UploadFile | undefined>(defaultValue);

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }

    const isLtSize = file.size / 1024 / 1024 < maxSize;
    if (!isLtSize) {
      message.error(`Image must be smaller than ${maxSize}MB!`);
      return false;
    }

    return true;
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    const currentFile = info.fileList[0];
    if (currentFile?.status === "done" && currentFile.originFileObj) {
      const newFile = {
        ...currentFile,
        url: URL.createObjectURL(currentFile.originFileObj),
      };
      setFile(newFile);

      if (onChange) {
        onChange(newFile);
      }
    } else if (info.fileList.length === 0) {
      setFile(undefined);
      if (onChange) {
        onChange(null);
      }
    }
  };

  const uploadButton = (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="text-4xl mb-2">📷</div>
      <div className="text-sm">Upload</div>
    </div>
  );

  const uploadProps: UploadProps = {
    name,
    listType: "picture-circle",
    className: "avatar-uploader",
    showUploadList: false,
    beforeUpload,
    onChange: handleChange,
    disabled,
    maxCount: 1,
    accept: "image/*",
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 w-full text-left">
          {label}
        </label>
      )}
      <Upload
        {...uploadProps}
        style={{
          width: "128px",
          height: "128px",
        }}
      >
        {(value || file)?.url ? (
          <img
            src={(value || file)?.url}
            alt="avatar"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
}

// Gallery Upload Component (for multiple images)
export interface GalleryUploadProps {
  label?: string;
  name?: string;
  maxCount?: number;
  onChange?: (files: UploadFile[]) => void;
  className?: string;
  disabled?: boolean;
  value?: UploadFile[];
  defaultFileList?: UploadFile[];
}

export function GalleryUpload({
  label,
  name = "gallery",
  maxCount = 10,
  onChange,
  className = "",
  disabled = false,
  value,
  defaultFileList = [],
}: GalleryUploadProps) {
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList);

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }

    const isLtSize = file.size / 1024 / 1024 < 5;
    if (!isLtSize) {
      message.error("Image must be smaller than 5MB!");
      return false;
    }

    return false; // Prevent automatic upload
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    const newFileList = info.fileList.map((file) => {
      if (file.originFileObj && !file.url) {
        return {
          ...file,
          url: URL.createObjectURL(file.originFileObj),
        };
      }
      return file;
    });

    setFileList(newFileList);

    if (onChange) {
      onChange(newFileList);
    }
  };

  const uploadProps: UploadProps = {
    name,
    listType: "picture-card",
    fileList: value?.length ? value : fileList,
    disabled,
    beforeUpload,
    onChange: handleChange,
    maxCount,
    accept: "image/*",
    multiple: true,
    className: `w-full ${className}`,
  };

  const uploadButton = (
    <div>
      <div className="text-2xl">+</div>
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <Upload {...uploadProps}>
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>
    </div>
  );
}
