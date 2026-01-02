import React from 'react';
import { Paper, Container, Box, Typography, Stack, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { login, setAuth } from '../../api/authApi';

function LoginPage(props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      setAuth(data); // localStorage 저장 
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate("/posts");
    }
  })

  // 이벤트 핸들러
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const fd = new FormData(evt.currentTarget);
    loginMutation.mutate({
      email: String(fd.get("email")).trim(),
      password: String(fd.get("password")),
    })
  }
  return (
    <Container maxWidth="sm">
      <Paper sx={{
        width: '100%',
        borderRadius: 4,
        p: 4,
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
      }}>
        <Box>
          <Typography variant='h5' sx={{ fontWeight: 600, fontSize: 24, mb: 5 }}>로그인</Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField type="email" lable="이메일" size="small" name="email" fullWidth placeholder='test@test.com' required />
              <TextField type="password" lable="비밀번호" size="small" name="password" fullWidth placeholder='비밀번호' required />

              {
                loginMutation.isError && (
                  <Typography variant="body2" color="error">로그인에 실패했습니다.</Typography>
                )
              }
              <Button type="submit" variant="contained" sx={{ mt: 1, py: 1.2, borderRadius: 2, textTrasform: "none", "&:hober": { backgroundColor: "#999" } }}
                disabled={loginMutation.isPending} >
                {loginMutation.isPending ? "로그인 중..." : "로그인"}</Button>
            </Stack>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginPage;