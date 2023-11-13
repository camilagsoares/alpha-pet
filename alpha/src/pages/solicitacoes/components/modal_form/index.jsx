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
    idSonner: yup.number().required(),
    titulo: yup.string().max(45, 'Máximo de 45 caracteres').required(requiredField),
    descricao: yup.string().max(5000, 'Máximo de 5000 caracteres').required(requiredField),
    observacao: yup.string().max(128, 'Máximo de 128 caracteres').required(requiredField),
    valor: yup.number().required(requiredField),

    tipoProjetoId: yup.number().required(requiredField),
    ata: yup.boolean()
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
      idSonner: null,
      titulo: '',
      descricao: '',
      observacao: '',
      valor: 0,
      tipoProjetoId: '',
      ata: false
    },
  });

  const { errors } = formState;

  // const { handleSubmitData, loading, data, error } = useApiRequestSubmit('post', '/projetos');
  const { data: listaTiposProjeto, loading: loadingTiposProjeto } = useApiRequestGet('/tipos-projeto');
  
  console.log(listaTiposProjeto)
  const handleCriarSecretaria = (data) => {


    if ((data.ata === true && data.tipoProjetoId !== 3) || (data.ata === false && data.tipoProjetoId === 3)) {
      toast("Projeto não pode ser ATA com o tipo de projeto diferente de Situação ATA.", {
        type: "error",
      });
      return;
    }
  
  
    setLoading(true);
    axiosApi
      .post('/projetos', data)
      .then(() => {
        toast('Projeto criado com sucesso', {
          type: 'success',
        });
        console.log("data",handleCriarSecretaria)
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

  
  const handleValorChange = (value) => {
    if (/[\.,]\d*$/.test(value)) {
      // Verifica se há vírgula ou ponto seguidos de dígitos
      setIsButtonDisabled(true);
      setValorError(true); // Define o erro no campo de valor
      toast('Não coloque ponto ou vírgula no campo de valor', {
        type: 'error',
      });
    } else {
      setIsButtonDisabled(false);
      setValorError(false); // Remove o erro do campo de valor
    }
  };
 
  return (
    <Dialog disableEscapeKeyDown fullWidth open={true} onClose={handleFecharModalForm} maxWidth='sm'>
      <DialogTitle>
        <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography component='h5'>Adicionar Solicitação</Typography>
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
            <Grid item xs={12} sm={10} md={10}>
              <TextField
                {...register('idSonner')}
                required
                fullWidth
                autoFocus
                label='Nº Sonner'
                type='text'
                error={!!errors.idSonner}
                helperText={errors.idSonner?.message}
              />
            </Grid>
            <Grid item xs={2} sm={1} md={2}>
              {/* Use Checkbox component for 'ata' */}
              {/* <p>Ata</p>
              <Controller
                name='ata'
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    color='primary'
                  />
                )}
              /> */}
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
            </Grid>
            {/* <Grid item xs={2} sm={2} md={2}>
              <TextField
                {...register('ata')}
                fullWidth
                required
                label='Ata'
                type='text'
                error={!!errors.titulo}
                helperText={errors.titulo?.message}
              />
            </Grid> */}
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                {...register('titulo')}
                fullWidth
                required
                label='Título'
                type='text'
                error={!!errors.titulo}
                helperText={errors.titulo?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                {...register('descricao')}
                fullWidth
                required
                label='Descrição resumida'
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
                // helperText={valorError ? 'Não coloque ponto ou vírgula no campo de valor,se precisar arredonde' : errors.valor?.message}
                // onChange={(e) => handleValorChange(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Controller
                name='tipoProjetoId'
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
                      key='tipoProjetoId'
                      variant='outlined'
                      onBlur={onBlur}
                      name={name}
                      label='Tipo projeto'
                      value={value}
                      onChange={onChange}
                      error={!!errors.tipoProjetoId}
                      helperText={errors.tipoProjetoId?.message}
                    >
                      <MenuItem disabled value=''>
                        <em>Nenhuma</em>
                      </MenuItem>
                      {!loadingTiposProjeto &&
                        listaTiposProjeto &&
                        listaTiposProjeto.length &&
                        listaTiposProjeto.map((tipoprojeto) => (
                          <MenuItem key={tipoprojeto.id} value={tipoprojeto.id}>
                            {tipoprojeto.descricao}
                          </MenuItem>
                        ))}
                    </TextField>
                  );
                }}
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
