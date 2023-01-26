import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
import { RouteComponentProps } from "react-router";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const theme = createTheme();
interface ILoginFormInputs {
  username: string;
  password: string;
}
const loginFormSchema = yup.object().shape({
  username : yup.string().required(),
  password : yup.string().required()
})
type loginComponentProps = RouteComponentProps;
const Login: FC<loginComponentProps> = ({ history }): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(loginFormSchema)
  });
  const [ apiError, setApiError ] = useState(null)
  const formSubmitHandler: SubmitHandler<ILoginFormInputs> = async (data: ILoginFormInputs) => {
    let params = {
      username: data.username,
      password: data.password,
    };
    await axios
      .post("https://localhost:7008/api/Auth/login", params)
      .then(function (response) {
        setApiError(null)
        localStorage.setItem("auth", response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("id", response.data.id);
        setTimeout(() => {
          history.push("/");
        }, 500);
      })
      .catch(function (error) {
          if (error.response) {
            setApiError(error.response.data)
          }
      });
  }

  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(formSubmitHandler)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            required
            id="username"
            label="Username"
            autoComplete="username"
            autoFocus
            error={!!errors.username}
            helperText={errors.username ? errors.username?.message : ''}
            {...register("username")}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            id="password"
            required
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password ? errors.password?.message : ''}
            {...register("password")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
            <Link href="#" to={"/signup"} >{"Don't have an account? Sign Up"}</Link>
        </Box>
      </Box>
      {apiError && <p style={{color:"#dd2c00", textAlign: "center"}}>{apiError}</p>}
    </Container>
    </ThemeProvider>
  );
};
export default Login;
