import React, { FC, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
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
interface ISignupFormInputs {
  username: string;
  password: string;
  confirmpassword: string;
}

const SignupFormSchema = yup.object().shape({
  username : yup.string().required(),
  password : yup.string().required(),
  confirmpassword : yup.string().required().oneOf([yup.ref("password"), null], "Passwords must match")
})

type SignupComponentProps = RouteComponentProps;
const SignUp: FC<SignupComponentProps> = ({ history }): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupFormInputs>({
    resolver: yupResolver(SignupFormSchema)
  });
  const [ apiError, setApiError ] = useState(null)
  const formSubmitHandler: SubmitHandler<ISignupFormInputs> = async (data: ISignupFormInputs) => {
    let params = {
      username: data.username,
      password: data.password,
    };
    await axios
      .post("https://localhost:7008/api/Auth/signup", params)
      .then(async function () {
        setApiError(null)
          await axios
          .post("https://localhost:7008/api/Auth/login", params)
          .then(function (responseSi) {
            setApiError(null)
              localStorage.setItem("auth", responseSi.data.token);
              localStorage.setItem("username", responseSi.data.username);
              localStorage.setItem("id", responseSi.data.id);
            setTimeout(() => {
              history.push("/");
            }, 500);
          })
          .catch(function (error) {
              if (error.response) {
                console.log(error.response)
              }
          });
    
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
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(formSubmitHandler)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            autoComplete="username"
            autoFocus
            required
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
             <TextField
            margin="normal"
            fullWidth
            label="Confirm Password"
            type="password"
            id="confirmpassword"
            required
            autoComplete="current-password"
            error={!!errors.confirmpassword}
            helperText={errors.confirmpassword ? errors.confirmpassword?.message : ''}
            {...register("confirmpassword")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
            <Link href="#" to={"/login"} >{"Don you have an account? Log In"}</Link>
        </Box>
      </Box>
      {apiError && <p style={{color:"#dd2c00", textAlign: "center"}}>{apiError}</p>}
    </Container>
    </ThemeProvider>
  );
};

export default SignUp;
