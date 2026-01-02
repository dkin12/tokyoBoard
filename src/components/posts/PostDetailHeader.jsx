import { Box, Chip, Divider, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';


function PostDetailHeader({ post }) {

  const { title, readCount, createAt, updateAt, author } = post
  return (
    <>
      <Typography variant='h6' component='h1' sx={{ fontWeight: 700, fontSize: 24, mb: 3 }}>
        {title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', }}>
        <Typography variant='body2' sx={{ color: '#666' }}>
          작성자:
        </Typography>
        <Chip label={author.nickname} variant="outlined" sx={{ ml: 0.5, px: 1.5, borderRadius: 999, bgcolor: 'primary.main', color: 'white' }} />
        <Typography variant='body2' sx={{ color: '#666', ml: 4 }}>
          조회수: {readCount}
        </Typography>
      </Box>

      <Typography variant='caption' sx={{ color: '#999', mt: 4, my: 2, display: 'inline-block' }}>
        작성일: {dayjs(createAt).format('YYYY년 MM월 DD일 HH:mm')}
      </Typography>

      <Divider sx={{ my: 2 }} />
    </>
  );
}

export default PostDetailHeader;