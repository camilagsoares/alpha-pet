import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
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
import { axiosApi, useApiRequestGet } from '../../../../services/api';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


const requiredField = 'Campo obrigatorio';

const schema = yup
  .object({
    nome: yup.string().required(),
    telefone: yup.string().max(45, 'Máximo de 45 caracteres').required(requiredField),
    nomeCachorro: yup.string().max(5000, 'Máximo de 5000 caracteres').required(requiredField),
    observacao: yup.string().max(128, 'Máximo de 128 caracteres').required(requiredField),
    valor: yup.number().required(requiredField),
    procedimentoId: yup.number().required(requiredField),


  })
  .required();

const ModalForm = (props) => {
  const [loading, setLoading] = useState(false);
  const { handleFecharModalForm } = props;
  const [valorError, setValorError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);


  const { register, handleSubmit, formState, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: '',
      telefone: '',
      nomeCachorro: '',
      observacao: '',
      valor: 0,
      procedimentoId: 3
    },
  });

  const { errors } = formState;


  
  const handleCriarSecretaria = (data) => {


    setLoading(true);
    axiosApi
      .post('/clientes', data)
      .then(() => {
        toast('Projeto criado com sucesso', {
          type: 'success',
        });
        reset();
        window.location.reload();
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


 
  return (
    <Dialog disableEscapeKeyDown fullWidth open={true} onClose={handleFecharModalForm} maxWidth='sm'>
      <DialogTitle>
        <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography component='h5'>Adicionar Cliente</Typography>
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
            <Grid item xs={12} sm={12} md={12}>
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
          
          
            <Grid item xs={12} sm={12} md={12}>
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
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                {...register('nomeCachorro')}
                fullWidth
                required
                label='Nome pet'
                type='text'
                error={!!errors.nomeCachorro}
                helperText={errors.nomeCachorro?.message}
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
                label='Valor'
                type='number'
                error={!!errors.valor}
                // helperText={valorError ? 'Não coloque ponto ou vírgula no campo de valor,se precisar arredonde' : errors.valor?.message}
                // onChange={(e) => handleValorChange(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                {...register('procedimentoId')}
                fullWidth
                required
                label='Procedimento'
                type='number'
                error={!!errors.procedimentoId}
                // helperText={valorError ? 'Não coloque ponto ou vírgula no campo de valor,se precisar arredonde' : errors.valor?.message}
                // onChange={(e) => handleValorChange(e.target.value)}
              />
            </Grid>
       
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={loading}
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
            disabled={loading || isButtonDisabled}
            startIcon={<Save width={24} />}
            variant='outlined'
            color='success'
            sx={{ minWidth: 156, height: '100%' }}
          >
            {!loading ? 'Adicionar' : <CircularProgress color='success' size={23} />}
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
