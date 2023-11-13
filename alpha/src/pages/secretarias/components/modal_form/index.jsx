import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
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
import { useApiRequestSubmit, axiosApi } from '../../../../services/api';
import { toast } from 'react-toastify';
import { useState } from 'react';
const schema = yup
  .object({
    sigla: yup.string().required('Campo obrigatorio').min(2, 'Mínimo 2 caracteres').max(6, 'Máximo 6 caracteres'),
    nome: yup.string().required('Campo obrigatorio').min(8, 'Mínimo 8 caracteres').max(128, 'Máximo 128 caracteres'),
  })
  .required();

const ModalForm = (props) => {
  const { handleFecharModalForm } = props;
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { sigla: '', nome: '' },
  });

  const { errors } = formState;

  // const { handleSubmitData, loading, error } = useApiRequestSubmit('post', '/secretarias');

  // const handleCriarSecretaria = (data) => {
  //   handleSubmitData(data).then(() => {
  //     reset();
  //     handleFecharModalForm();
  //   });
  // };

  const [loading, setLoading] = useState(false);


  const handleCriarSecretaria = (data) => {
    setLoading(true);
    axiosApi
      .post('secretarias', data)
      .then(() => {
        toast('Secretaria criado com sucesso', {
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
      console.log(data)
    };


  return (
    <Dialog disableEscapeKeyDown fullWidth open={true} onClose={handleFecharModalForm} maxWidth='sm'>
      <DialogTitle>
        <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography component='h5'>Criar secretária</Typography>
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
            <Grid item xs={12} sm={12} md={3}>
              <TextField
                {...register('sigla')}
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
