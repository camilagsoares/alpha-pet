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

const schema = yup
  .object({
    usemail: yup.string().required('Campo obrigatorio'),
    ususers: yup.string().required('Campo obrigatorio'),
    ussenha: yup.string().required('Campo obrigatorio').min(5, 'Mínimo 5 caracteres'),
    ustelefone: yup.string().required('Campo obrigatorio').min(5, 'Mínimo 5 caracteres'),
    usmatricula: yup.number().required('Campo obrigatório'),
    usperfil: yup.string().required('Campo obrigatorio'),
    Departamento_id: yup.number().required('Campo obrigatorio'),
  })
  .required();

const ModalFormAtualizarUsuario = (props) => {
  const { projetosSelecionadoVisualizar } = props;
  const { handleAbrirModalAtualizarEtapaProjeto } = props;
  console.log("projeto selecionado",projetosSelecionadoVisualizar)

  const { register, handleSubmit, formState, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      usemail: '',
      ususers: '',
      ussenha: '',
      ustelefone: '',
      usmatricula: '',
      usperfil: '',
      Departamento_id: '',
    },
  });

  const { errors } = formState;
  const { session } = useContext(AuthContext);
  // const { handleAbrirDrawerView } = props;


  const { handleSubmitData, loading, error } = useApiRequestSubmit('put', `/user/${projetosSelecionadoVisualizar}`);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleCriarSecretaria = (data) => {
    handleSubmitData(data)
      .then(() => {
        reset();
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          handleAbrirModalAtualizarEtapaProjeto();
        }, 3000);
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
      });
  };

  const {
    data: listaTipoProjeto,
    loading: loadingTipoProjeto,
    error: errorSecretarias,
  } = useApiRequestGet('/departamentos');

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
                  {...register('usemail')}
                  required
                  fullWidth
                  autoFocus
                  label='Email'
                  type='text'
                  error={!!errors.usemail}
                  helperText={errors.usemail?.message}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <TextField
                  {...register('ususers')}
                  fullWidth
                  required
                  label='Usuário'
                  type='text'
                  error={!!errors.ususers}
                  helperText={errors.ususers?.message}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <TextField
                  {...register('ussenha')}
                  fullWidth
                  required
                  label='Senha'
                  type='password'
                  error={!!errors.ussenha}
                  helperText={errors.ussenha?.message}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <TextField
                  {...register('ustelefone')}
                  fullWidth
                  required
                  label='Telefone'
                  type='text'
                  error={!!errors.ustelefone}
                  helperText={errors.ustelefone?.message}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <TextField
                  {...register('usmatricula')}
                  fullWidth
                  required
                  label='Matrícula'
                  type='number'
                  error={!!errors.usmatricula}
                  helperText={errors.usmatricula?.message}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <TextField
                  {...register('usperfil')}
                  fullWidth
                  required
                  label='Perfil'
                  type='text'
                  error={!!errors.usperfil}
                  helperText={errors.usperfil?.message}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <Controller
                  name='Departamento_id'
                  control={control}
                  render={({ field }) => {
                    const { onChange, name, onBlur, value, ref } = field;
                    return (
                      <TextField
                        required
                        ref={ref}
                        disabled={loadingTipoProjeto}
                        InputProps={{
                          endAdornment: loadingTipoProjeto && (
                            <InputAdornment position='start'>
                              <CircularProgress color='info' size={28} sx={{ marginRight: 2 }} />
                            </InputAdornment>
                          ),
                        }}
                        select
                        fullWidth
                        key='secretaria'
                        variant='outlined'
                        onBlur={onBlur}
                        name={name}
                        label='Departamento'
                        value={value}
                        onChange={onChange}
                        error={!!errors.Departamento_id}
                        helperText={errors.Departamento_id?.message}
                      >
                        <MenuItem disabled value=''>
                          <em>Nenhuma</em>
                        </MenuItem>
                        {!loadingTipoProjeto &&
                          listaTipoProjeto &&
                          listaTipoProjeto.length &&
                          listaTipoProjeto.map((tipoprojeto) => (
                            <MenuItem key={tipoprojeto.idDepartamento} value={tipoprojeto.idDepartamento}>
                              {tipoprojeto.depNome}
                            </MenuItem>
                          ))}
                      </TextField>
                    );
                  }}
                />
              </Grid>
            </Grid>
            {error && (
              <Box display='flex' flexDirection='row' gap={4} color='red' fontSize={14}>
                <pre>{JSON.stringify(error, null, 2)}</pre>
              </Box>
            )}
            {error && (
              <Box display='flex' flexDirection='row' gap={4} color='red' fontSize={14}>
                <pre>{JSON.stringify(errorSecretarias, null, 2)}</pre>
              </Box>
            )}
            {showSuccessMessage && (
              <Box mt={2} display='flex' justifyContent='center' alignItems='center'>
                <Alert severity='success'>
                  <AlertTitle>Successo</AlertTitle>
                  Usuário alte com sucesso!
                </Alert>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            {/* <Button
              disabled={loading}
              startIcon={<Close width={24} />}
              variant='outlined'
              color='info'
              onClick={handleFecharModalForm}
              sx={{ minWidth: 156, height: '100%' }}
            >
              Cancelar
            </Button> */}
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
