import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography } from '@mui/material';

const ImageUpload = ({ onImageUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    onImageUpload(file);  // Pass the File object directly
  }, [onImageUpload]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed #ccc',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      <input {...getInputProps()} />
      <Typography variant="h6">Drag & drop an image here, or click to select one</Typography>
      <Button variant="contained" sx={{ mt: 2 }}>Select Image</Button>
    </Box>
  );
};

export default ImageUpload;
