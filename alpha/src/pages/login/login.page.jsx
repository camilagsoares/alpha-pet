import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useApiLogin } from '../../services/api';
import { AuthContext } from '../../contexts/auth.context';

const schema = yup
  .object({
    email: yup.string().email('E-mail inválido').required('Campo obrigatorio'),
    senha: yup.string().min(4, 'Mínimo 4 caracteres').required('Campo obrigatorio'),
  })
  .required();

const LoginPage = () => {
  const navigate = useNavigate();
  const { token, criarSessao } = useContext(AuthContext);

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      senha: '',
    },
  });

  const { errors } = formState;

  const { handlerSubmitLogin, loginData, loading } = useApiLogin('/login');

  const handleEfetuarLogin = (data) => {
    handlerSubmitLogin(data);
  };

  useEffect(() => {
    if (token) navigate('/');

    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    if (loginData) {
      criarSessao(loginData);
    }
  }, [loginData]);

  useEffect(() => {});

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
       
        sx={{
          backgroundImage: 'url(dog.jfif)',
          // backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
   
      <Grid item xs={12} sm={8} md={5} component={Paper} square>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
             <Box
            xs={12}
            sm={4}
            md={7}
            width={500}
            height={400}
            marginY={8}
            sx={{
              backgroundImage: 'url(dogWhite.png)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {/* <Typography component='h1' variant='h2' fontWeight={700}>
            AlphaPet
          </Typography> */}
          <Box component='form' noValidate onSubmit={handleSubmit(handleEfetuarLogin)} sx={{ marginTop: 1 }}>
            <TextField
              {...register('email')}
              disabled={loading}
              required
              fullWidth
              autoFocus
              id='email'
              label='E-mail'
              margin='normal'
              type='email'
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              {...register('senha')}
              disabled={loading}
              fullWidth
              required
              id='password'
              label='Senha'
              margin='normal'
              type='password'
              error={!!errors.senha}
              helperText={errors.senha?.message}
            />
            <Button
              disabled={loading}
              fullWidth
              type='submit'
              variant='contained'
              color='success'
              size='large'
              sx={{ marginTop: 3, marginBottom: 2 }}
            >
              {!loading ? 'Entrar' : <CircularProgress color='success' size={26} />}
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
