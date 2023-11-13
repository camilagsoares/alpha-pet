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
import React, { useState, useContext,useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { AuthContext } from '../../../../contexts/auth.context';
import { axiosApi } from '../../../../services/api';
import { toast } from 'react-toastify';

const ModalForm = (props) => {
  const { handleFecharModalForm } = props;
  const { handleFecharModalAtualizarEtapaProjeto } = props;
  const { projetosSelecionadoVisualizar } = props;

  const {
    data: processosLicitatorios,
    error: errorProcessosLicitatorios,
    loading: loadingProcessosLicitatorios,
  } = useApiRequestGet(`/processos-licitatorios/${projetosSelecionadoVisualizar}`);
// console.log("processosLicitatorios",processosLicitatorios)
// console.log("oq vem no console",processosLicitatorios?.projeto[0].id)
const projetoIds = processosLicitatorios?.projeto.map(projeto => projeto.id) || [];
console.log("projetoIds",projetoIds)


  const schema = yup 
    .object({
      departamentoId: yup.number().required('Campo obrigatorio'), //dpto
      statusId: yup.number().required('Campo obrigatorio'), //
      observacao: yup.string().required('Campo obrigatorio'), //
      projetoId: yup.array(),
      processoLicitatorioId: yup.number()
    })
    .required();
 
  const { register, handleSubmit, formState, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      departamentoId: '',
      processoLicitatorioId: projetosSelecionadoVisualizar,
      statusId: '',
      observacao: '', 
      projetoId: projetoIds //assim?
    },
  }); 

  const { errors } = formState;
  const {
    data: listaDepartamento,
    loading: loadingDepartamento,
    error: errorDepartamento,
  } = useApiRequestGet('/departamentos');
  // console.log("dpto",listaDepartamento)

  // console.log("projetoIds", projetoIds);

  const {
    data: status,
    loading: loadingStatus,
    // error: errorDepartamento,
  } = useApiRequestGet('/status');
  // console.log("status",status)

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCriarSecretaria = (data) => {
    data.processoLicitatorioId = projetosSelecionadoVisualizar;
    data.projetoId = projetoIds; //tenho que mandar em formato de array entao

    setLoading(true);
    axiosApi
      .post(`/etapas/processos-licitatorios`, data)
      .then(() => {
        toast('Nova etapa criado com sucesso', {
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
    console.log('OQ mandei no submit', data);
  };

  return (
    <Dialog disableEscapeKeyDown fullWidth open={true} onClose={handleFecharModalAtualizarEtapaProjeto} maxWidth='sm'>
      <DialogTitle>
        <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography component='h5'>Etapas Projetos</Typography>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='clos modal create project'
            onClick={handleFecharModalAtualizarEtapaProjeto}
          >
            <Close color='action' />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Box component='form' noValidate onSubmit={handleSubmit(handleCriarSecretaria)}>
        <DialogContent dividers sx={{ paddingTop: 1 }}>
          <Grid container columnSpacing={2} rowSpacing={2} marginTop={0.5}>
            <Grid item xs={12} sm={12} md={12}>
              <Controller
                name='departamentoId'
                control={control}
                render={({ field }) => {
                  const { onChange, name, onBlur, value, ref } = field;
                  return (
                    <TextField
                      required
                      ref={ref}
                      disabled={loadingDepartamento}
                      InputProps={{
                        endAdornment: loadingDepartamento && (
                          <InputAdornment position='start'>
                            <CircularProgress color='info' size={28} sx={{ marginRight: 2 }} />
                          </InputAdornment>
                        ),
                      }}
                      select
                      fullWidth
                      // type="number"
                      key='departamento'
                      variant='outlined'
                      onBlur={onBlur}
                      name={name}
                      label='Departamento'
                      value={value}
                      onChange={onChange}
                      error={!!errors.departamentoId}
                      helperText={errors.departamentoId?.message}
                    >
                      <MenuItem disabled value=''>
                        <em>Nenhuma</em>
                      </MenuItem>
                      {!loadingDepartamento &&
                        listaDepartamento &&
                        listaDepartamento.length &&
                        listaDepartamento.map((departamento) => (
                          <MenuItem key={departamento.id} value={departamento.id}>
                       {departamento.secretaria.sigla} -  {departamento.nome} 
                          </MenuItem>
                        ))}
                    </TextField>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Controller
                name='statusId'
                control={control}
                render={({ field }) => {
                  const { onChange, name, onBlur, value, ref } = field;
                  return (
                    <TextField
                      required
                      ref={ref}
                      select
                      fullWidth
                      key='statusId'
                      variant='outlined'
                      onBlur={onBlur}
                      name={name}
                      label='Status'
                      value={value}
                      onChange={onChange}
                      error={!!errors.statusId}
                      helperText={errors.statusId?.message}
                    >
                      <MenuItem disabled value=''>
                        <em>Nenhuma</em>
                      </MenuItem>
                      {!loadingStatus &&
                        status &&
                        status.length &&
                        status.map((statusEtapa) => (
                          <MenuItem key={statusEtapa.id} value={statusEtapa.id}>
                            {statusEtapa.nome}
                          </MenuItem>
                        ))}
                    </TextField>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                {...register('observacao')}
                fullWidth
                required
                label='Observação'
                name='observacao'
                type='text'
                minRows={6}
                sx={{ resize: 'vertical' }}
                error={!!errors.observacao}
                helperText={errors.observacao?.message}
              />
            </Grid>
        
         
          </Grid>

          {showSuccessMessage && (
            <Box mt={2} display='flex' justifyContent='center' alignItems='center'>
              <Alert severity='success'>
                <AlertTitle>Successo</AlertTitle>
                Etapa projeto criada com sucesso!
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
            onClick={handleFecharModalAtualizarEtapaProjeto}
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

ModalForm.propTypes = {
  handleFecharModalAtualizarEtapaProjeto: PropTypes.func.isRequired,
  handleFecharModalForm: PropTypes.func.isRequired,
};

export default ModalForm;
