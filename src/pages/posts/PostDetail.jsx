import React from 'react';
import { Box, Paper } from '@mui/material';
import PostDetailHeader from '../../components/posts/PostDetailHeader';
import PostDetailContent from '../../components/posts/PostDetailContent';
import PostDetailButtons from '../../components/posts/PostDetailButtons';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPostsDetail, deletePosts } from '../../api/postsApi';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import PostComments from '../../components/comments/PostComments';
import { useMe } from '../../hooks/useMe';

/*
URL 에서 ID 를 읽음 -> 서버에서 해당 아이디 데이터를 가져옴 
-> 컴포넌트에 데이터 전달 -> 화면에 표시
-> 삭제 버튼 클릭 시 해당 아이디 글 삭제 -> 글 목록 페이지로 이동
-> 수정 버튼 클릭 시 수정 페이지로 이동
*/


function PostDetail() {
    const { id } = useParams();
    const postId = Number(id);
    const navigate = useNavigate(); // navigate(-1) 뒤로가기, navigate('/') 홈으로 이동
    const queryClient = useQueryClient();
    const { data: me, isLoading: meIsLoading } = useMe();

    // 이미지 경로 설정
    const apiBase = import.meta.env.VITE_API_BASE_URL;



    // tanstack query 를 사용하여 데이터 가져오기
    // 상세 글 조회
    const { data: post, isLoading, isError } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => fetchPostsDetail(postId)
    });

    const checkEdit = (authorId) => {
        return (
            !meIsLoading &&
            me?.id != null &&
            authorId != null &&
            Number(me.id) === Number(authorId) //작성자 ID 로그인 ID 비교
        )
    }

    // 삭제
    const deleteMutation = useMutation({
        mutationFn: () => deletePosts(postId),
        onSuccess: () => {
            // 글 목록 캐시 무효화
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            // 글 목록 페이지로 이동
            navigate('/posts');
        },
        onError: (error) => {
            alert(`게시글 삭제 실패: ${error.message}`);
        }
    });

    const loginedEdit = checkEdit(post?.author?.id);
    if (isLoading) return <Loader />;
    if (isError) return <ErrorMessage message="게시글을 불러오는 데 실패했습니다." />;

    return (
        <Box>
            <Paper sx={{
                width: '100%',
                borderRadius: 4,
                p: 4,
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
            }}>
                {/* 제목  */}
                <PostDetailHeader post={post} />

                {/* 본문 내용 */}
                <PostDetailContent post={post} apiBase={apiBase} />
                {/* 댓글 */}
                <PostComments postId={postId} />
                {/* 수정 삭제 버튼영역 */}
                <PostDetailButtons id={postId} deleteMutation={deleteMutation}
                    loginedEdit={loginedEdit} />

            </Paper>
        </Box>
    );
}

export default PostDetail;