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
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/CloseOutlined';
import Save from '@mui/icons-material/SaveAltOutlined';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import { useApiRequestGet, useApiRequestSubmit, axiosApi } from '../../../../services/api';
import React, { useState, useContext, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { AuthContext } from '../../../../contexts/auth.context';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { toast } from 'react-toastify';

// statusId

// const {selectedProjectIdSonner} = props;

const schema = yup
  .object({
    titulo: yup.string().required('Campo obrigatorio'),
    numeroCompras: yup.number().required('Campo obrigatorio'),
    descricao: yup.string().required('Campo obrigatorio'),
    // valor: yup.number().required('Campo obrigatorio'),
    idSonner: yup.number(),
    projetosId: yup.array().required('Campo obrigatorio'),
  })
  .required();

const ModalAdicionarProcessoLicitatorio = (props) => {
  const { handleFecharAdcPLic } = props;
  const { register, handleSubmit, formState, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      titulo: '',
      numeroCompras: '',
      descricao: '',
      // valor: 0,
      idSonner: 0,
      projetosId: props.clickedProjectIds,
    },
  });

  // console.log('idSonner clicado', props.selectedProjectIdSonner);
  const { errors } = formState;
  const [loading, setLoading] = useState(false);

  const { data: listaTiposProjeto, loading: loadingTiposProjeto } = useApiRequestGet('/tipos-projeto');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleCriarSecretaria = (data) => {
    
    setLoading(true);
    axiosApi
      .post('/processos-licitatorios', data)
      .then(() => {
        toast('Processo Licitatório criado com sucesso', {
          type: 'success',
        });
        // console.log('data', handleCriarSecretaria);
        reset();
        handleFecharModalForm();
      })
      .catch((error) => {
        // toast('Erro', {
        //   type: 'error',
        // });
        // console.log('error', error.message);
      })
      .finally(() => {
        setLoading(false);
      });
    console.log('Oq estou mandando', data);
  };

  const {
    data,
    // loading
  } = useApiRequestGet('/projetos');

  console.log('IDs dos projetos clicados:', props.clickedProjectIds);

  return (
    <Dialog disableEscapeKeyDown fullWidth open={true} onClose={handleFecharAdcPLic} maxWidth='sm'>
      <DialogTitle>
        <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography component='h5'> Adicionar Processo Licitatorio</Typography>
          <IconButton edge='start' color='inherit' aria-label='clos modal create project' onClick={handleFecharAdcPLic}>
            <Close color='action' />
          </IconButton>
        </Stack>
      </DialogTitle>

      <Box component='form' noValidate onSubmit={handleSubmit(handleCriarSecretaria)}>
        <DialogContent dividers>
          <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                {...register('titulo')}
                required
                fullWidth
                autoFocus
                label='Nome processo licitatório'
                type='text'
                error={!!errors.titulo}
                helperText={errors.titulo?.message}
              />
            </Grid>
            {/* {props.selectedProjectIdSonner} */}
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                {...register('numeroCompras')}
                fullWidth
                required
                label='Número compras'
                name='numeroCompras'
                type='number'
                error={!!errors.numeroCompras}
                helperText={errors.numeroCompras?.message}
              />
            </Grid>
        
            {/* <Grid item xs={12} sm={12} md={12}>
              <TextField
                {...register('idSonner')}
                fullWidth
                required
                label='ID sonner'
                name='idSonner'
                type='text'
                // value={props.selectedProjectIdSonner.join(', ')}
                error={!!errors.idSonner}
                helperText={errors.idSonner?.message}
              />
            </Grid> */}


            <Grid item xs={12} sm={12} md={12}>
              <TextField
                {...register('descricao')}
                fullWidth
                required
                label='Descrição'
                name='descricao'
                type='text'
                error={!!errors.descricao}
                helperText={errors.descricao?.message}
              />
              

              {/* {props.selectedProjectIdSonner.length > 0 && (
              <p>Projetos incluídos: <span   style={{
                color: '#FFFFFF',
                // border: '1px solid sua-cor-da-borda',
                backgroundColor: '#1E90FF', 
                padding: '4px 8px', 
                borderRadius: '4px', 
              }}>{props.selectedProjectIdSonner.join(', ')}</span></p>
              )} */}

              {props.selectedProjectIdSonner.length > 0 && (
                <Grid item xs={12} sm={12} md={12} sx={{ marginTop: '15px' }}>
                  <div
                    style={{
                      display: 'flex', // Para alinhar os spans na horizontal
                      alignItems: 'center', // Para alinhar verticalmente com a frase
                      gap: '8px', // Espaçamento entre os elementos (opcional)
                    }}
                  >
                    <span style={{ marginRight: '4px' }}>Projetos incluídos:</span> {/* Frase */}
                    {props.selectedProjectIdSonner.map((idSonner, index) => (
                      <span
                        key={index} // Use um valor de chave único
                        style={{
                          color: '#FFFFFF',
                          // border: '1px solid sua-cor-da-borda',
                          backgroundColor: '#1E90FF',
                          padding: '4px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {idSonner}
                      </span>
                    ))}
                  </div>
                </Grid>
              )}
            </Grid>

            {/* <Grid item xs={12} sm={12} md={12}>
              <TextField
                {...register('valor')}
                fullWidth
                required
                label='Valor'
                name='valor'
                type='number'
                error={!!errors.valor}
                helperText={errors.valor?.message}
              />
            </Grid> */}

            {/* <p>Projetos incluidos: {props.clickedProjectIds }</p> */}
            <Grid item xs={12} sm={12} md={12} sx={{ display: 'none' }}>
              <TextField
                {...register('projetosId')}
                fullWidth
                required
                label='Projetos Incluídos'
                name='projetosId'
                type='text'
                error={!!errors.projetosId}
                helperText={errors.projetosId?.message}
              />
            </Grid>
          </Grid>
          {showSuccessMessage && (
            <Box mt={2} display='flex' justifyContent='center' alignItems='center'>
              <Alert severity='success'>
                <AlertTitle>Successo</AlertTitle>
                Processo Licitatório adicionado com sucesso!
              </Alert>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={loading}
            startIcon={<Close width={24} />}
            variant='outlined'
            color='info'
            onClick={handleFecharAdcPLic}
            sx={{ minWidth: 156, height: '100%' }}
          >
            Cancelar
          </Button>
          <Button
            type='submit'
            disabled={loading}
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
  );
};

ModalAdicionarProcessoLicitatorio.propTypes = {
  handleFecharAdcPLic: PropTypes.func.isRequired,
  handleIncluirClick: PropTypes.func.isRequired,
};

export default ModalAdicionarProcessoLicitatorio;
