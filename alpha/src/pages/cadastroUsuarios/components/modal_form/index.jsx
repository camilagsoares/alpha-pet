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
import InputAdornment from '@mui/material/InputAdornment';
import { useApiRequestGet, axiosApi } from '../../../../services/api';
import Alert from '@mui/material/Alert';
import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';

import AlertTitle from '@mui/material/AlertTitle';
const schema = yup
  .object({
    nome: yup.string().required('Campo obrigatorio'),
    email: yup.string().required('Campo obrigatorio'),
    senha: yup.string().required('Campo obrigatorio').min(5, 'Mínimo 5 caracteres'),
    telefone: yup.string().required('Campo obrigatorio').min(5, 'Mínimo 5 caracteres'),
    matricula: yup.number().required('Campo obrigatório'),
    permissaoId: yup.number().required('Campo obrigatorio'),
    departamentoId: yup.number().required('Campo obrigatorio'),
    responsavelSecretaria: yup.boolean()
  })
  .required();

const ModalForm = (props) => {
  const { handleFecharModalForm } = props;
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
      telefone: '',
      matricula: '',
      permissaoId: '',
      departamentoId: '',
      responsavelSecretaria: false
    },
  });


  const { errors } = formState;

  const { data: listaDptos, loading: loadingTiposProjeto } = useApiRequestGet('/departamentos');
  const { data: listaPermissao, loading: loadingPermissao } = useApiRequestGet('/auth/permissoes');

  // console.log("permssao", listaPermissao[0].nome)
  // const { handleSubmitData, loading, error } = useApiRequestSubmit('post', '/usuarios');

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleCriarSecretaria = (data) => {
    setLoading(true);
    axiosApi
      .post('/auth/usuarios', data)
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

  return (
    <Dialog disableEscapeKeyDown fullWidth open={true} onClose={handleFecharModalForm} maxWidth='sm'>
      <DialogTitle>
        <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography component='h5'>Criar Usuário</Typography>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='clos modal create project'
            onClick={handleFecharModalForm}
          >
            <Close color='action' />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Box component='form' noValidate onSubmit={handleSubmit(handleCriarSecretaria)}>
        <DialogContent dividers sx={{ paddingTop: 1 }}>
          <Grid container columnSpacing={2} rowSpacing={2} marginTop={0.5}>
            <Grid item xs={12} sm={12} md={9}>
              <TextField
                {...register('nome')}
                required
                fullWidth
                autoFocus
                label='Nome'
                type='text'
                error={!!errors.nome}
                helperText={errors.nome?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <TextField
                {...register('email')}
                fullWidth
                required
                label='Email'
                type='text'
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                {...register('senha')}
                fullWidth
                required
                label='Senha'
                type='password'
                error={!!errors.senha}
                helperText={errors.senha?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                {...register('telefone')}
                fullWidth
                required
                label='Telefone'
                type='text'
                error={!!errors.telefone}
                helperText={errors.telefone?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                {...register('matricula')}
                fullWidth
                required
                label='Matrícula'
                type='number'
                error={!!errors.matricula}
                helperText={errors.matricula?.message}
              />
            </Grid>


            <Grid item xs={12} sm={12} md={12} >
              <Controller
                name='departamentoId'
                control={control}
                render={({ field }) => {
                  const { onChange, name, onBlur, value, ref } = field;
                  return (
                    <Autocomplete
                      fullWidth
                      options={listaDptos || []}
                      getOptionLabel={(departamento) => departamento.nome}
                      value={
                        listaDptos &&
                        listaDptos.find((item) => item.id === value)
                      }
                      onChange={(event, newValue) => {
                        const selectedValue = newValue ? newValue.id : '';
                        onChange(selectedValue);
                      }}
                      onBlur={onBlur}
                      isOptionEqualToValue={(option, value) => option.id === value}
                     
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          
                          label='Departamento'
                          variant='outlined'
                          name={name}
                          error={!!errors.departamentoId}
                          helperText={errors.departamentoId?.message}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: loadingTiposProjeto && (
                              <InputAdornment position='start'>
                                <CircularProgress color='info' size={28} sx={{ marginRight: 2 }} />
                              </InputAdornment>
                            ),
                          }}
                          
                        />
                      )}
                    />
                  );
                }}
              />
            </Grid>




            <Grid item xs={12} sm={12} md={12}>
              <Controller
                name='permissaoId'
                control={control}
                render={({ field }) => {
                  const { onChange, name, onBlur, value, ref } = field;
                  return (
                    <TextField
                      required
                      ref={ref}
                      disabled={loadingTiposProjeto}
                      InputProps={{
                        endAdornment: loadingTiposProjeto && (
                          <InputAdornment position='start'>
                            <CircularProgress color='info' size={28} sx={{ marginRight: 2 }} />
                          </InputAdornment>
                        ),
                      }}
                      select
                      fullWidth
                      key='permissao'
                      variant='outlined'
                      onBlur={onBlur}
                      name={name}
                      label='Permissão'
                      value={value}
                      onChange={onChange}
                      error={!!errors.permissaoId}
                      helperText={errors.permissaoId?.message}
                    >
                      <MenuItem disabled value=''>
                        <em>Nenhuma</em>
                      </MenuItem>
                      {!loadingPermissao &&
                        listaPermissao &&
                        listaPermissao.length &&
                        listaPermissao.map((permissao) => (
                          <MenuItem key={permissao.id} value={permissao.id}>
                            {permissao.nome}
                          </MenuItem>
                        ))}
                    </TextField>
                  );
                }}
              />
              {/* <Grid item xs={12} sm={6} md={12} marginTop={2}>
              <Controller

                name='usperfil'
             
                control={control}
                render={({ field }) => {
                  const { onChange, name, onBlur, value, ref } = field;
                  return (
                    <TextField
                   
                      required
                      ref={ref}
                      select
                      fullWidth
                      key='usperfil'
                      variant='outlined'
                      onBlur={onBlur}
                      name={name}
                      label='Perfil Usuario'
                      value={value}
                      onChange={onChange}
                      error={!!errors.usperfil}
                      helperText={errors.usperfil?.message}
                    >
                      <MenuItem disabled value=''>
                        <em>Nenhuma</em>
                      </MenuItem>
                      {perfilUsuarioEnum.map((status) => (
                          <MenuItem key={status.id} value={status.id}>
                            {status.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  );
                }}
              />
            </Grid> */}
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              {/* Use Checkbox component for 'ata' */}
              <Typography variant="body1">Responsável Secretaria</Typography>
              <Controller
                name='responsavelSecretaria'
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    color='primary'
                  />
                )}
              />
            </Grid>
          </Grid>

          {showSuccessMessage && (
            <Box mt={2} display='flex' justifyContent='center' alignItems='center'>
              <Alert severity='success'>
                <AlertTitle>Successo</AlertTitle>
                Usuário criado com sucesso!
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
  );
};

ModalForm.propTypes = {
  handleFecharModalForm: PropTypes.func.isRequired,
};

export default ModalForm;