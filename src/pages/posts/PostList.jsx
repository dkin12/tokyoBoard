
import { Box, Paper, Typography, Stack } from '@mui/material';
import PostSearch from '../../components/posts/PostSearch';
import PostTable from '../../components/posts/PostTable';
import PostPagination from '../../components/posts/PostPagination';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useState } from 'react';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import { fetchPosts } from '../../api/postsApi';
import { useMe } from '../../hooks/useMe';


function PostList() {
    // 현재 페이지 상태
    const [page, setPage] = useState(0);
    // 키워드 상태
    const [keyword, setKeyword] = useState('');


    // 조회 Query
    const { data, isLoading, isError } = useQuery({

        queryKey: ['posts', page, keyword],
        queryFn: () => fetchPosts({ page, size: 10, keyword }),
        placeholderData: keepPreviousData
        // 페이지 전환시 기존 데이터 유지 화면에 빈 화면이 생기지 않음
    });

    const { data: me, isLoading: meIsLoading } = useMe();

    if (isLoading) return <Loader />
    if (isError) return <ErrorMessage />;

    // 1. 데이터 구조 분해 할당 (API 응답에 따라 수정 필요)
    // data가 없을 경우를 대비해 안전하게 접근 (?.) 하고 기본값([]) 설정
    const { content, totalPages } = data;


    // 이벤트 핸들러 - 검색 제출
    const handleSearch = (evt) => {
        evt.preventDefault();
        setPage(0); // 검색시 페이지 초기화
    };

    const handlePrev = () => {
        setPage((prev) => Math.max(prev - 1, 0));

    };
    const handleNext = () => {
        // setPage((prev) => Math.min(prev + 1, totalPages - 1));
        setPage((Prev) => Prev + 1 < totalPages ? Prev + 1 : Prev);
    }

    return (
        <Box sx={{ px: 2, py: 2 }}>
            <Paper elevation={1}
                sx={{
                    width: '100%',
                    borderRadius: '3',
                    px: 4,
                    py: 3,
                    borderShadow: '0 16px 45px rgba(59, 59, 59, 0.7)', // x 축 y 축 흐림 색상 rgba alpha : 투명도 0~1
                }}>
                <Box>
                    {/* 상단제목 */}
                    <Typography variant='h5' sx={{ fontWeight: 600, fontSize: 24, mb: 3 }}>게시글 목록</Typography>
                    {/* 검색 */}
                    <PostSearch
                        keyword={keyword}
                        onChangeKeyword={setKeyword}
                        onSubmit={handleSearch}

                    />
                    {/* 테이블 */}
                    <PostTable posts={content} />
                    {/* 페이지네이션 */}
                    <PostPagination
                        page={page}
                        totalPages={totalPages}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        logined={!meIsLoading && !!me}
                    />
                </Box>

            </Paper>
        </Box>
    );
}

export default PostList;