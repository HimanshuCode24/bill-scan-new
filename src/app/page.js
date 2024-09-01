"use client";

import { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import { Container, Box, Button } from '@mui/material';

export default function Home() {
  const [image, setImage] = useState(null);

  async function handleImageUpload() {
    if (!image) return;
  
    const formData = new FormData();
    formData.append('image', image);
  
    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Upload response:', data);
      if (!response.ok) throw new Error(data.error || 'Upload failed');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <ImageUpload onImageUpload={(file) => setImage(file)} />
        {image && (
          <Box sx={{ mt: 4 }}>
            <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ maxWidth: '100%' }} />
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleImageUpload}>
              Scan Image
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}
