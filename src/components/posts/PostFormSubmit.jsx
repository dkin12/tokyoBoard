import { Box, Button } from '@mui/material';
import React from 'react';

function PostFormSubmit({ isEdit }) {
  return (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
      <Button type='submit' variant='contained' size='large' sx={{ borderRadius: 999, fontWeight: 500 }}>
        {isEdit ? '수정' : '등록'}
      </Button>
    </Box >
  );
}

export default PostFormSubmit;