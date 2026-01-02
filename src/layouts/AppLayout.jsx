// header + menu + Outlet

import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import { Box, AppBar, Toolbar, Typography, Container, Stack, Button } from '@mui/material';
import { LuDog } from "react-icons/lu";
import { useQueryClient } from '@tanstack/react-query';
import { useMe } from '../hooks/useMe';
import { clearAuth, ME_QUERY_KEY } from '../api/authApi';

function AppLayout() {
    const queryClient = useQueryClient();
    const { data: me, isLoading: meIsLoading } = useMe();
    const navigate = useNavigate();
    // 로그아웃 이벤트 핸들러 
    const handleLogout = () => {
        clearAuth();
        queryClient.setQueryData(["me"], null); // 즉시 업데이트
        navigate("/posts");
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#b6f0b5ff' }}>

            <AppBar position='fixed' sx={{ bgcolor: '#ffe75eff' }}>
                <Container maxWidth='md'>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {/* 로고  */}
                        <Box component={Link} to="/posts" sx={{
                            display: 'flex', alignItems: 'center',
                            textDecoration: 'none', color: '#000'
                        }}>



                            {/* 폰트 아이콘 */}
                            <Box sx={{
                                width: 40, height: 40,
                                borderRadius: '50%',
                                bgcolor: '#faf7efff',
                                display: 'grid',
                                placeItems: 'center',
                                mr: 1.5
                            }}>


                                <LuDog style={{ color: '#000000ff', fontSize: 20 }} />
                            </Box>

                            <Typography variant="h6" component="h1" sx={{ fontWeight: 700 }}>
                                게시판
                            </Typography>



                        </Box>
                        {/* 회원가입 / 로그인  */}
                        <Stack direction="row" spacing={0.8} alignItems={"center"} >
                            {
                                !meIsLoading && me ?
                                    (
                                        // 로그아웃
                                        <Button variant='text' sx={{ color: '#fff' }} onClick={handleLogout}>로그아웃</Button>
                                    ) : (

                                        <>
                                            <Button component={Link} to="/auth/login" variant='text' sx={{ color: '#000' }}>로그인</Button>
                                            <Button component={Link} to="/auth/register" variant='text' sx={{ color: '#000' }}>회원가입</Button>
                                        </>
                                    )
                            }

                        </Stack>
                    </Toolbar>
                </Container>

            </AppBar >

            <Container maxWidth='md' component="main" sx={{ pt: 10, mb: 4 }}>
                <Outlet />
            </Container>
        </Box >
    );
}

export default AppLayout;