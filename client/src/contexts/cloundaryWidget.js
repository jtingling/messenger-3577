import React from 'react';
export const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
export const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;
export const cloudinaryWidget = window.cloudinary;

export const UploadWidget = React.createContext(cloudinaryWidget);