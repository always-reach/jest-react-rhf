import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LoginAPI } from '../../api/Login';
import { useNavigate } from 'react-router-dom';
import { useForm,SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

type loginType = {
    email: string
    password: string
}
const schema = yup.object({
    email: yup
        .string()
        .required("必須入力欄です")
        .email("メールアドレスの形式が正しくありません"),
    password: yup
        .string()
        .required("必須入力欄です")
        .min(8, "パスワードは8文字以上です")
})

export default function NormalSignIn() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<loginType>({ resolver: yupResolver(schema), })

    const onSubmit:SubmitHandler<loginType> = async (data)=> {
        console.log("data",data)
        const response = await LoginAPI(data)
        if (response.status === 200) {
            navigate("/top")
        }
    };

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
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                        <label htmlFor="email">Email Address</label>
                        <input
                            required
                            id="email"
                            type="email"
                            {...register("email")}
                        />
                        <ErrorMessage errors={errors} name="email" />
                        <label htmlFor="password">Password</label>
                        <input
                            required
                            type="password"
                            id="password"
                            {...register("password")}
                        />
                        <ErrorMessage errors={errors} name="password" />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
            </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}