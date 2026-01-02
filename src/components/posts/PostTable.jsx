import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Typography, Chip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router'; // react-router 대신 보통 react-router-dom을 사용합니다
import dayjs from 'dayjs';

function PostTable({ posts }) {
  const lists = posts ? posts : [];

  return (
    <TableContainer>
      <Table>
        {/* 테이블 머릿말 */}
        <TableHead>
          <TableRow sx={{ '& th': { fontSize: 14, fontWeight: 600 } }}>
            <TableCell align='center' width='90'>번호</TableCell>
            {/* 제목 width를 40으로 하면 너무 좁으니 늘리거나 삭제하는 게 좋습니다 */}
            <TableCell width='auto'>제목</TableCell>
            <TableCell align='center' width='160'>작성자</TableCell>
            <TableCell align='center' width='80'>조회수</TableCell>
            <TableCell align='center' width='150'>작성일</TableCell>
          </TableRow>
        </TableHead>

        {/* 테이블 본문 */}
        <TableBody>
          {lists.map(({ id, title, author, readCount, createAt }) => (
            <TableRow key={id} hover>
              <TableCell align='center'>{id}</TableCell>
              <TableCell>

                <Typography component={Link} to={`/posts/${id}`} sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: 'orange' } }}>
                  {title}
                </Typography>
              </TableCell>
              <TableCell align='center'>
                {author?.nickname && author.nickname !== '작성자' ? (
                  <Chip label={author.nickname} size="small"
                    sx={{
                      bgcolor: 'orange', borderRadius: 999, px: 2,
                      fontWeight: 500, color: 'white',
                      height: 30
                    }} />
                ) : (
                  <Typography sx={{ fontSize: 14 }}> {author?.nickname || '??'} </Typography>
                )}

              </TableCell>
              <TableCell align='center'>{readCount}</TableCell>

              {/* 수정 포인트: 불필요한 new Date()... 부분을 삭제하고 dayjs만 남깁니다 */}
              <TableCell align='center' sx={{ color: '#b6b8bcff' }}>
                {dayjs(createAt).format('YY년MM월DD일 HH:mm')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PostTable;