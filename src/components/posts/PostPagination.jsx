import React from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { Link } from 'react-router';

function PostPagination({ page, totalPages, onPrev, onNext, logined }) {
  return (
    <Stack>
      {/* 페이지네이션 */}
      <Stack direction='row' alignItems={'center'} justifyContent={'center'} spacing={2} sx={{ mt: 4 }} onClick={onPrev}>
        {/* 페이지네이션 */}

        <Button variant='outlined' size='small' disabled={page === 0}>이전</Button>
        <Typography> {page + 1} / {totalPages}</Typography>
        <Button variant='outlined' size='small' disabled={page + 1 >= totalPages
        } onClick={onNext}>다음</Button>
      </Stack>
      {/* 새글 작성 버튼 */}

      {
        logined && (
          <Button component={Link} to='/posts/new' variant='contained' sx={{ mt: 3, alignSelf: 'flex-end', borderRadius: 999, fontWeight: 500 }}>
            새 글 작성
          </Button>
        )
      }


    </Stack >


  );
}

export default PostPagination;