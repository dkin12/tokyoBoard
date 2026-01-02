import { Container, TextField, Typography, Paper, Box, Stack, Button } from '@mui/material';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { register } from '../../api/authApi'

function RegisterPage() {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    nickname: "",
    password: "",
    rePassword: ""
  });
  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => navigate("/posts")
  })
  // 이벤트 핸들러
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value })); // 이전 상태복사 후 변경된 필드만 업데이트
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (form.password !== form.rePassword) {
      alert("비밀번호와 비밀번호 확인이 일치 하지 않습니다.")
      return;
    }

    registerMutation.mutate({
      email: form.email.trim(),
      password: form.password,
      nickname: form.nickname.trim()
    });
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
          <Typography variant='h5' sx={{ fontWeight: 600, fontSize: 24, mb: 5 }}>회원가입</Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField type="email" lable="이메일" size="small" name="email" fullWidth placeholder='test@test.com' required
                value={form.email} onChange={handleChange} />
              <TextField type="text" lable="별명" size="small" name="nickname" fullWidth placeholder='별명' required
                value={form.nickname} onChange={handleChange} />
              <TextField type="password" lable="비밀번호" size="small" name="password" fullWidth placeholder='비밀번호' required
                value={form.password} onChange={handleChange} />
              <TextField type="password" lable="비밀번호 확인" size="small" name="rePassword" fullWidth placeholder='비밀번호 확인' required value={form.rePassword} onChange={handleChange}
              />

              {
                registerMutation.isError && (
                  <Typography variant="body2" color="error">회원가입에 실패했습니다.</Typography>
                )
              }

              <Button type="submit" variant="contained" sx={{ mt: 1, py: 1.2, borderRadius: 2, textTrasform: "none", "&:hober": { backgroundColor: "#999" } }} disabled={registerMutation.isPending}>
                {registerMutation.isPending ? "회원가입 중..." : "회원가입"}</Button>
            </Stack>
          </Box>

        </Box>


      </Paper>


    </Container>
  );
}

export default RegisterPage;