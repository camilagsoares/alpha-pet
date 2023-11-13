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
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import { useApiRequestGet, axiosApi } from '../../../../services/api';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
const schema = yup
  .object({
    nome: yup.string(),
    email: yup.string(),
    senha: yup.string(),
    telefone: yup.string(),
    // matricula: yup.number().nullable(),
    // permissaoId: yup.number().nullable(),
    // departamentoId: yup.number().nullable(),
    responsavelSecretaria: yup.boolean(),
  })
  .required();

const ModalFormAtualizarUsuario = (props) => {
  const { projetosSelecionadoVisualizar } = props;
  const { handleAbrirModalAtualizarEtapaProjeto } = props;
  const { handleFecharModalForm } = props;
  console.log('projeto selecionado', projetosSelecionadoVisualizar);

  const { register, handleSubmit, formState, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
      telefone: '',
      // matricula: null,
      // permissaoId: null,
      // departamentoId: null,
      responsavelSecretaria: false,
    },
  });

  const { errors } = formState;
  const { session } = useContext(AuthContext);
  // const { handleAbrirDrawerView } = props;
  const { data: listaDptos, loading: loadingTiposProjeto } = useApiRequestGet('/departamentos');
  const { data: listaPermissao, loading: loadingPermissao } = useApiRequestGet('/auth/permissoes');
  const [loading, setLoading] = useState(false);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    // matricula: null,
    // permissaoId: null,
    // departamentoId: null,
    responsavelSecretaria: false,
  });

  const handleCriarSecretaria = (data) => {
    const updatedData = {
      nome: data.nome || formData.nome,
      maxDias: data.maxDias || formData.maxDias,
      email: data.email || formData.email,
      senha: data.senha || formData.senha,
      telefone: data.telefone || formData.telefone,
      // matricula: data.matricula || formData.matricula,
      // permissaoId: data.permissaoId || formData.permissaoId,
      // departamentoId: data.departamentoId || formData.departamentoId,
      responsavelSecretaria: data.responsavelSecretaria || formData.responsavelSecretaria,
    };
    setLoading(true);
    axiosApi
      .put(`auth/usuarios/${projetosSelecionadoVisualizar}`, updatedData)
      .then(() => {
        //  toast('Projeto criado com sucesso', {
        //  type: 'success',
        //  });
        console.log('campos', data);
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
    console.log('campos', data);
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
            <Typography component='h5'>Editar usuário</Typography>
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
              <Grid item xs={12} sm={12} md={9}>
                <TextField
                  {...register('nome')}
                  defaultValue={formData.nome}
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
                  defaultValue={formData.email}
                  fullWidth
                  required
                  label='Email'
                  type='text'
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  {...register('senha')}
                  defaultValue={formData.senha}
                  fullWidth
                  required
                  label='Senha'
                  type='password'
                  error={!!errors.senha}
                  helperText={errors.senha?.message}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  {...register('telefone')}
                  defaultValue={formData.telefone}
                  fullWidth
                  required
                  label='Telefone'
                  type='text'
                  error={!!errors.telefone}
                  helperText={errors.telefone?.message}
                />
              </Grid>
              {/* <Grid item xs={12} sm={12} md={4}>
                <TextField
                  {...register('matricula')}
                  defaultValue={formData.matricula}

                  fullWidth
                  required
                  label='Matrícula'
                  type='number'
                  error={!!errors.matricula}
                  helperText={errors.matricula?.message}
                />
              </Grid> */}

              {/* <Grid item xs={12} sm={12} md={12}>
                <Controller
                  name='departamentoId'
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
                        key='departamento'
                        variant='outlined'
                        onBlur={onBlur}
                        name={name}
                        label='Departamento'
                        // value={value}
                        value={formData.departamentoId}
                        onChange={onChange}
                        error={!!errors.departamentoId}
                        helperText={errors.departamentoId?.message}
                      >
                        <MenuItem disabled value=''>
                          <em>Nenhuma</em>
                        </MenuItem>
                        {!loadingTiposProjeto &&
                          listaDptos &&
                          listaDptos.length &&
                          listaDptos.map((departamento) => (
                            <MenuItem key={departamento.id} value={departamento.id}>
                              {departamento.nome}
                            </MenuItem>
                          ))}
                      </TextField>
                    );
                  }}
                />
             
              </Grid> */}
              {/* <Grid item xs={12} sm={12} md={12}>
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
                        // value={value}
                        value={formData.permissaoId}

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
           
              </Grid> */}

              {/* <Grid item xs={12} sm={12} md={12}>
                <Typography variant='body1'>Responsável Secretaria</Typography>
                <Controller
                  name='responsavelSecretaria'
                  control={control}
                  render={({ field }) => <Checkbox {...field} color='primary' />}
                />
              </Grid> */}
              <FormControlLabel
                control={
                  <Controller
                    name='responsavelSecretaria'
                    control={control}
                    render={({ field }) => <Checkbox {...field} color='primary' />}
                  />
                }
                label='Secretaria'
              />
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
