import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/CloseOutlined';
import Save from '@mui/icons-material/SaveAltOutlined';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { useApiRequestSubmit,axiosApi} from '../../services/api';
import React, { useContext,useState } from 'react';
import { AuthContext } from '../../contexts/auth.context';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

const schema = yup
  .object({
    senha: yup.string().required('Campo obrigatorio').min(5, 'Mínimo 5 caracteres').max(32, 'Máximo 32 caracteres'),
    // confirmarSenha: yup.string().required('Campo obrigatorio').min(5, 'Mínimo 5 caracteres').max(32, 'Máximo 32 caracteres').oneOf([yup.ref('senha'), null], 'Senhas não coicidem'),
  }).required();

const ModalFormAlterarSenha = (props) => {
  // const [open, setOpen] = useState(false);

  // const Alert = React.forwardRef(function Alert(props, ref) {
  //   return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  // });
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { senha: '',confirmarSenha: '' },
  });

  const { errors } = formState;
  const { session } = useContext(AuthContext);
  console.log(session?.id)
  const { handleFecharModalForm } = props;
  // const { handleSubmitData, error, 
  //   // loading
  //  } = useApiRequestSubmit('put', `/user/${session.idUsuaros}`);

  // handleConfirmarAlteracaoSenha
  // const handleConfirmarAlteracaoSenha = (data) => {
  //   // console.log('data', data);
  //   handleSubmitData({
  //     ussenha: data.senha,
  //   }).then(() => {
  //     reset();
  //     // setOpen(true);
  //     handleFecharModalForm();
  //   });
  // };

  // console.log(session.id)
  const handleConfirmarAlteracaoSenha = (data) => {
    setLoading(true);
    const { senha, confirmarSenha } = data;
    if (senha !== confirmarSenha) {
      // Senha e confirmação de senha não coincidem, exiba um erro
      toast('A confirmação de senha não coincide com a senha.', {
        type: 'error',
      });
      setLoading(false);
      return;
    }
    axiosApi
      .put(`/auth/usuario-senha/${session.id}`, { senha })
      .then(() => {
         toast('Senha alterada com sucesso', {
         type: 'success',
         });
        console.log("campos digitados", data)
        reset();
        // handleFecharModalForm();
      }) 
      .catch((error) => {
         toast(error.message, {
           type: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
    console.log("campos", data)

  };

  return (
    <React.Fragment>
      {/* <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setOpen(false)} severity='success' sx={{ width: '100%' }}>
          Senha alterada com sucesso!
        </Alert>
      </Snackbar> */}
      <Dialog disableEscapeKeyDown fullWidth open={true} onClose={handleFecharModalForm} maxWidth='xs'>
        <DialogTitle>
          <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography component='h5'>Alterar senha</Typography>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='close modal change password'
              onClick={handleFecharModalForm}
            >
              <Close color='action' />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Box component='form' noValidate onSubmit={handleSubmit(handleConfirmarAlteracaoSenha)}>
          <DialogContent dividers sx={{ paddingTop: 1 }}>
            <Grid container columnSpacing={2} rowSpacing={2} paddingTop={2}>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  {...register('senha')}
                  autoFocus
                  fullWidth
                  required
                  label='Senha'
                  type='password'
                  error={!!errors.senha}
                  helperText={errors.senha?.message}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  {...register('confirmarSenha')}
                  fullWidth
                  required
                  label='Confirmação senha'
                  type='password'
                  error={!!errors.confirmarSenha}
                  helperText={errors.confirmarSenha?.message}
                />
                {/* {isAlertVisible && <Alert severity='success'>Senha alterada com sucesso!</Alert>} */}
              </Grid>
            </Grid>
            {/* {error && (
              <Box display='flex' flexDirection='row' gap={4} color='red' fontSize={14}>
                <pre>{JSON.stringify(error, null, 2)}</pre>
              </Box>
            )} */}
          </DialogContent>
          <DialogActions>
            <Button
              disabled={loading}
              startIcon={<Close />}
              variant='outlined'
              color='info'
              onClick={handleFecharModalForm}
            >
              Cancelar
            </Button>
            <Button startIcon={<Save />} disabled={loading} type='submit' variant='outlined' color='success'>
              {!loading ? 'Salvar' : <CircularProgress color='success' size={26} />}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

ModalFormAlterarSenha.propTypes = {
  handleFecharModalForm: PropTypes.func.isRequired,
};

export default ModalFormAlterarSenha;
