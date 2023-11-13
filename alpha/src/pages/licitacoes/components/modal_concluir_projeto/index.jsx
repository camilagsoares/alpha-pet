import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import TextArea from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/CloseOutlined';
import Save from '@mui/icons-material/SaveAltOutlined';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import { useApiRequestGet, useApiRequestSubmit } from '../../../../services/api';
import React, { useState, useContext } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { AuthContext } from '../../../../contexts/auth.context';
import { axiosApi } from '../../../../services/api';
import { toast } from 'react-toastify';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



const schema = yup
  .object({
    concluidoEm: yup.date(),
    situacao: yup.string(),
  })
  .required();

const ModalConcluirProjeto = (props) => {
  const { handleFecharModalConcluirProjeto } = props;
  const { handleFecharModalForm } = props;
  const { projetosSelecionadoVisualizar } = props;
  console.log('etapa do projeto Selecionado ', projetosSelecionadoVisualizar);

  const { register, handleSubmit, formState, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      concluidoEm: new Date(),
      situacao: 'ATIVO'
    },
  });


  const { token, session } = useContext(AuthContext);

  const { errors } = formState;

  // const [situacao, setSituacao] = useState('ATIVO'); 

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  // const {
  //   data: listaTipoProjeto,
  //   loading: loadingTipoProjeto,
  //   error: errorTipoProjeto,
  // } = useApiRequestGet('/tipos-projeto');
  // console.log("lista tipo projeto", listaTipoProjeto)

  const {
    data: processosLicitatorios,
    error: errorProcessosLicitatorios,
    loading: loadingProcessosLicitatorios,
  } = useApiRequestGet(`/processos-licitatorios/${projetosSelecionadoVisualizar}`);


  const handleCriarSecretaria = (data) => {
  
    if (session?.id === processosLicitatorios?.usuarioId) {
      setLoading(true);
      data.situacao = 'INATIVO';
  
      axiosApi
        .put(`/processos-licitatorios/${projetosSelecionadoVisualizar}`, data)
        .then(() => {
          toast('Projeto concluído com sucesso!', {
            type: 'success',
          });
  
          reset();
          handleFecharModalConcluirProjeto();
        })
        .catch((error) => {
          toast(error.message, {
            type: 'error',
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
     else {
      // Display an error message or prevent the conclusion of the project
      toast('Você não tem permissão para concluir este processo licitatório. Somente o usuário que criou.', {
        type: 'error',
      });
    }
  };
  // const { token, session } = useContext(AuthContext);
  // console.log(session?.id);


  //
  return (
    <Dialog disableEscapeKeyDown fullWidth open={true} onClose={handleFecharModalConcluirProjeto} maxWidth='sm'>
      <DialogTitle>
        <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography component='h5'>Deseja concluir o projeto?</Typography>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='clos modal create project'
            onClick={handleFecharModalConcluirProjeto}
          >
            <Close color='action' />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Box component='form' noValidate onSubmit={handleSubmit(handleCriarSecretaria)}>
        <DialogContent dividers>
          <Grid container columnSpacing={2} rowSpacing={2}>
            {/* <Grid item xs={12} sm={10} md={10}>
              <TextField
                {...register('idSonner')}
                required
                fullWidth
                autoFocus
                label='Nº Sonner'
                type='number'
                error={!!errors.idSonner}
                helperText={errors.idSonner?.message}
              />
            </Grid> */}
            {/* <Grid item xs={2} sm={1} md={2}>

                <FormControlLabel
                control={
                  <Controller
                    name='ata'
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        color='primary'
                      />
                    )}
                  />
                }
                label='Ata'
              />
            </Grid> */}
            {/* <Grid item xs={12} sm={12} md={12}>
              <TextField
                {...register('titulo')}
                fullWidth
                required
                label='Titulo'
                // name='titulo'
                type='text'
                error={!!errors.titulo}
                helperText={errors.titulo?.message}
              />
            </Grid> */}


            {/* <Grid item xs={12} sm={12} md={12}>
              <TextField
                {...register('descricao')}
                fullWidth
                required
                label='Descrição Resumida'
                // name='descricao'
                type='text'
                error={!!errors.descricao}
                helperText={errors.descricao?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                {...register('observacao')}
                fullWidth
                required
                label='Observação'
                type='text'
                error={!!errors.observacao}
                helperText={errors.observacao?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                {...register('valor')}
                fullWidth
                required
                label='Valor estimado'
                type='number'
                error={!!errors.valor}
                helperText={errors.valor?.message}
              />
            </Grid> */}

          </Grid>

          {/* {showSuccessMessage && (
            <Box mt={2} display='flex' justifyContent='center' alignItems='center'>
              <Alert severity='success'>
                <AlertTitle>Successo</AlertTitle>
                Atualização realizada com sucesso!
              </Alert>
            </Box>
          )} */}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={loading}
            startIcon={<Close width={24} />}
            variant='outlined'
            color='info'
            onClick={handleFecharModalConcluirProjeto}
            sx={{ minWidth: 156, height: '100%' }}
          >
            Cancelar
          </Button>
          <Button
            type='submit'
            disabled={loading}
            startIcon={<CheckOutlinedIcon width={24} />}
            variant='outlined'
            color='success'
            sx={{ minWidth: 156, height: '100%' }}

          >
            {!loading ? 'Concluir' : <CircularProgress color='success' size={23} />}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

ModalConcluirProjeto.propTypes = {
  handleFecharModalConcluirProjeto: PropTypes.func.isRequired,

};

export default ModalConcluirProjeto;
