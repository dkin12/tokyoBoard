import { Typography, Divider, Box } from '@mui/material';
import React from 'react';

function PostDetailContent({ post, apiBase }) {
  const { content, imageUrl, title } = post;
  const imageSrc = imageUrl ? `${apiBase}${imageUrl}` : null;


  return (
    <>
      {
        <Box sx={{ mb: 2 }}>
          <img src={imageSrc} alt={title} style={{ maxWidth: 400, display: 'block' }} />
        </Box>
      }
      <Typography>
        {content}

      </Typography>
      <Divider sx={{ my: 2 }} />
    </>
  );
}

export default PostDetailContent;