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
import { useState } from 'react';

const schema = yup
  .object({
    nome: yup.string().required('Campo obrigatorio').min(3, 'Mínimo 3 caracteres').max(64, 'Máximo 64 caracteres'),
    maxDias: yup.number().required('Campo obrigatorio').min(1, 'Mínimo 1 dia').max(5, 'Máximo 5 dias'),
    secretariaId: yup.number().required('Campo obrigatorio'),
    
  })
  .required();

const ModalForm = (props) => {
  // const [loading, setLoading] = useState(false);
  const { handleFecharModalForm } = props;
  const { register, handleSubmit, formState, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { nome:'', maxDias:5, secretariaId:'' },
  });

  const { errors } = formState;

  // const {
  //   data: listaSecretarias,
  //   loading: loadingSecretarias,
  //   error: errorSecretarias,
  // } = useApiRequestGet('/secretarias');
  // const { handleSubmitData, loading, error } = useApiRequestSubmit('post', '/departamentos');


  const { data: listaTiposProjeto, loading: loadingTiposProjeto } = useApiRequestGet('/secretarias');
  console.log("secretaria", listaTiposProjeto)

  const [loading, setLoading] = useState(false);

  const handleCriarDepartamento = (data) => {
    // setLoading(true);
    axiosApi
      .post('/departamentos', data)
      .then(() => {
        toast('Departamento criado com sucesso', {
          type: 'success',
        });
        reset();
        handleFecharModalForm();
      })
      .catch((error) => {
        toast(error.message, {
          type: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // const handleCriarSecretaria = (data) => {
  //   handleSubmitData(data).then(() => {
  //     reset();
  //     handleFecharModalForm();
  //     console.log(data)
  //   });
  // };

  return (
    <Dialog disableEscapeKeyDown fullWidth open={true} onClose={handleFecharModalForm} maxWidth='sm'>
      <DialogTitle>
        <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography component='h5'>Criar departamento</Typography>
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
      <Box component='form' noValidate onSubmit={handleSubmit(handleCriarDepartamento)}>
        <DialogContent dividers sx={{ paddingTop: 1 }}>
          <Grid container columnSpacing={2} rowSpacing={2} marginTop={0.5}>
            <Grid item xs={12} sm={12} md={9}>
              <TextField
                {...register('nome')}
                required
                fullWidth
                autoFocus
                label='Departamento'
                type='text'
                error={!!errors.nome}
                helperText={errors.nome?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <TextField
                {...register('maxDias')}
                fullWidth
                required
                label='Max. Dias'
                name='DepMaxDias'
                type='number'
                error={!!errors.maxDias}
                helperText={errors.maxDias?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Controller
                name='secretariaId'
                control={control}
                render={({ field }) => {
                  const { onChange, name, onBlur, value, ref } = field;
                  return (
                    <TextField
                      required
                      ref={ref}
                      // disabled={loadingSecretarias}
                      // InputProps={{
                      //   endAdornment: loadingSecretarias && (
                      //     <InputAdornment position='start'>
                      //       <CircularProgress color='info' size={28} sx={{ marginRight: 2 }} />
                      //     </InputAdornment>
                      //   ),
                      // }}
                      select
                      fullWidth
                      key='secretaria'
                      variant='outlined'
                      onBlur={onBlur}
                      name={name}
                      label='Secretária'
                      value={value}
                      onChange={onChange}
                      error={!!errors.secretariaId}
                      helperText={errors.secretariaId?.message}
                    >
                      <MenuItem disabled value=''>
                        <em>Nenhuma</em>
                      </MenuItem>
                      {!loadingTiposProjeto &&
                        listaTiposProjeto &&
                        listaTiposProjeto.length &&
                        listaTiposProjeto.map((secretaria) => (
                          <MenuItem key={secretaria.id} value={secretaria.id}>
                            {secretaria.nome}
                          </MenuItem>
                        ))}
                    </TextField>
                  );
                }}
              />
            </Grid>
          </Grid>
          {/* {error && (
            <Box display='flex' flexDirection='row' gap={4} color='red' fontSize={14}>
              <pre>{JSON.stringify(error, null, 2)}</pre>
            </Box>
          )}
          {error && (
            <Box display='flex' flexDirection='row' gap={4} color='red' fontSize={14}>
              <pre>{JSON.stringify(errorSecretarias, null, 2)}</pre>
            </Box>
          )} */}
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
            {!loading ? 'Criar' : <CircularProgress color='success' size={23} />}
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
