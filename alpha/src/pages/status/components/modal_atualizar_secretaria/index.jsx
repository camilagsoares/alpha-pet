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
import React, { useContext, useState,useEffect } from 'react';
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
    sigla: yup.string(),
    nome: yup.string()
  })
  .required();


const ModalFormAtualizarSecretaria = (props) => {
  const { projetosSelecionadoVisualizar } = props;
  const { handleAbrirModalAtualizarEtapaProjeto } = props;
  console.log("projeto selecionado",projetosSelecionadoVisualizar)

  const { register, handleSubmit, formState, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { sigla: '', nome: '' },
  });

  const { errors } = formState;
  const { session } = useContext(AuthContext);
  // const { handleAbrirDrawerView } = props;



     const { handleFecharModalForm } = props;

     const [loading, setLoading] = useState(false);


  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({ sigla: '', nome: '' });

  const handleCriarSecretaria = (data) => {
    setLoading(true);
    const updatedData = {
      sigla: data.sigla || formData.sigla,
      nome: data.nome || formData.nome,
    };
  
    axiosApi
      .put(`/secretarias/${projetosSelecionadoVisualizar}`, updatedData)
      .then(() => {
        reset();
        handleFecharModalForm();
      })
      .catch((error) => {
        // Trate o erro, se necessário
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (projetosSelecionadoVisualizar) {
      // Recupere os valores atuais da secretaria e atualize formData
      axiosApi.get(`/secretarias/${projetosSelecionadoVisualizar}`).then((response) => {
        const { sigla, nome } = response.data;
        setFormData({ sigla, nome });
      });
    }
  }, [projetosSelecionadoVisualizar]);
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
            <Typography component='h5'>Alterar secretaria</Typography>
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
            <Grid item xs={12} sm={12} md={3}>
              <TextField
                {...register('sigla')}
                defaultValue={formData.sigla}

                // disabled={loading}
                required
                autoFocus
                fullWidth
                label='Sigla'
                type='text'
                error={!!errors.sigla}
                helperText={errors.sigla?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={9}>
              <TextField
                {...register('nome')}
                // disabled={loading}
                defaultValue={formData.nome}

                required
                fullWidth
                label='Nome'
                type='text'
                error={!!errors.nome}
                helperText={errors.nome?.message}
              />
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
            // disabled={loading}
            startIcon={<Close />}
            variant='outlined'
            color='info'
            sx={{ minWidth: 156, height: '100%' }}
            onClick={handleFecharModalForm}
          >
            Cancelar
          </Button>
          <Button
            type='submit'
            // disabled={loading}
            startIcon={<Save />}
            variant='outlined'
            color='success'
            sx={{ minWidth: 156, height: '100%' }}
          >
            {/* {!loading ? 'Criar' : <CircularProgress color='success' size={23} />} */}
          </Button>
        </DialogActions>
      </Box>
      </Dialog>
    </React.Fragment>
  );
};

ModalFormAtualizarSecretaria.propTypes = {
  handleFecharModalForm: PropTypes.func.isRequired,
  handleFecharDrawerView: PropTypes.func.isRequired,
  projetosSelecionadoVisualizar: PropTypes.number,
  handleAbrirModalAtualizarEtapaProjeto: PropTypes.func.isRequired,
};


ModalFormAtualizarSecretaria.defaultProps = {
  projetosSelecionadoVisualizar: null,
};

export default ModalFormAtualizarSecretaria;
