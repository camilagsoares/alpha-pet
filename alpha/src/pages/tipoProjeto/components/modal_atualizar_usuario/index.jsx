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
import { useApiRequestSubmit } from '../../../../services/api';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../contexts/auth.context';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useApiRequestGet } from '../../../../services/api';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { axiosApi } from '../../../../services/api';

const schema = yup
  .object({
    descricao: yup.string().required('Campo obrigatorio'),
    nome: yup.string().required('Campo obrigatorio'),
  })
  .required();

const ModalFormAtualizarUsuario = (props) => {
  const { projetosSelecionadoVisualizar } = props;
  const { handleAbrirModalAtualizarEtapaProjeto } = props;
  const { handleFecharModalForm } = props;
  const [loading, setLoading] = useState(false);


  console.log("projeto selecionado solicitacoes",projetosSelecionadoVisualizar)

  const { register, handleSubmit, formState, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      descricao: '',
      nome: '',
    },
  });

  const { errors } = formState;
  const { session } = useContext(AuthContext);
  // const { handleAbrirDrawerView } = props;

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleCriarSecretaria = (data) => {
    setLoading(true);
    axiosApi
      .put(`/tipos-projeto/${projetosSelecionadoVisualizar}`, data)
      .then(() => {
        //  toast('Projeto criado com sucesso', {
        //  type: 'success',
        //  });
        console.log("campos", data)
        reset();
        handleFecharModalForm();
      })
      .catch((error) => {
        //  toast(error.message, {
        //    type: 'error',
        // });
      })
      .finally(() => {
        setLoading(false);
      });
    console.log("campos", data)

  };


  //   const { data
  //     } = useApiRequestGet(`/users/${}`);
  // console.log("id",data)

  // console.log("data lista",data)
  // console.log('listaTipoProjeto', listaTipoProjeto);
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
      <Dialog disableEscapeKeyDown fullWidth open={true} onClose={props.handleFecharDrawerView} maxWidth='md'>
        <DialogTitle>
          <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography component='h5'>Editar tipo projeto</Typography>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='close modal change password'
              onClick={props.handleFecharDrawerView}
            >
              <Close color='action' />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Box component='form' noValidate onSubmit={handleSubmit(handleCriarSecretaria)}>
        <DialogContent dividers sx={{ paddingTop: 1 }}>
          <Grid container columnSpacing={2} rowSpacing={2} marginTop={0.5}>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                {...register('descricao')}
                required
                fullWidth
                autoFocus
                label='Descrição'
                type='text'
                error={!!errors.descricao}
                helperText={errors.descricao?.message}
              />
            </Grid>
          
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                {...register('nome')}
                fullWidth
                required
                label='Nome'
                type='text'
                error={!!errors.nome}
                helperText={errors.nome?.message}
              />
            </Grid>


       
           

          </Grid>

          {showSuccessMessage && (
            <Box mt={2} display='flex' justifyContent='center' alignItems='center'>
              <Alert severity='success'>
                <AlertTitle>Successo</AlertTitle>
                Tipo projeto alterado com sucesso!
              </Alert>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            // disabled={loading}
            startIcon={<Close width={24} />}
            variant='outlined'
            color='info'
            onClick={handleFecharModalForm}
            sx={{ minWidth: 156, height: '100%' }}
          >
            Cancelar
          </Button>
          <Button
            type='submit'
            // disabled={loading}
            startIcon={<Save width={24} />}
            variant='outlined'
            color='success'
            sx={{ minWidth: 156, height: '100%' }}
          >
            {!loading ? 'Salvar' : <CircularProgress color='success' size={23} />}
          </Button>
        </DialogActions>
      </Box>
      </Dialog>
    </React.Fragment>
  );
};

ModalFormAtualizarUsuario.propTypes = {
  handleFecharModalForm: PropTypes.func.isRequired,
  handleFecharDrawerView: PropTypes.func.isRequired,
  projetosSelecionadoVisualizar: PropTypes.number,
  handleAbrirModalAtualizarEtapaProjeto: PropTypes.func.isRequired,
};


ModalFormAtualizarUsuario.defaultProps = {
  projetosSelecionadoVisualizar: null,
};

export default ModalFormAtualizarUsuario;
