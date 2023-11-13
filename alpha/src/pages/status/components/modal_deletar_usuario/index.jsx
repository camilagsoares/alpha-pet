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
import { useApiRequestGet, useApiRequestSubmit } from '../../../../services/api';
import Alert from '@mui/material/Alert';
import React, { useState } from 'react';

import AlertTitle from '@mui/material/AlertTitle';


const ModalFormDeletarUsuario = (props) => {
  const { projetoSelecionadoDeletar } = props;
  const { handleAbrirModalAtualizarEtapaProjeto } = props;
  const  {handleAbrirModalDelete} = props;
  console.log(projetoSelecionadoDeletar);
  // const { idUsuaros } = JSON.parse(localStorage.getItem('session'));
  // console.log(idUsuaros);
  const { handleFecharModalForm } = props;
  const { register, handleSubmit, formState, control } = useForm({

  });


  const { errors } = formState;



  const { handleSubmitData, loading, error } = useApiRequestSubmit('delete', `/secretaria/${projetoSelecionadoDeletar}`);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleCriarSecretaria = (data) => {
    handleSubmitData(data)
      .then(() => {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          // handleAbrirModalAtualizarEtapaProjeto();
          handleAbrirModalDelete()
        }, 3000);
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
      });
  };

  return (
    <Dialog disableEscapeKeyDown fullWidth open={true} onClose={props.handleFecharDelete} maxWidth='sm'>
    <DialogTitle>
      <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography component='h5'>Deletar Secretaria</Typography>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='clos modal create project'
          onClick={props.handleFecharDelete}
        >
          <Close color='action' />
        </IconButton>
      </Stack>
    </DialogTitle>
    <Box component='form' noValidate onSubmit={handleSubmit(handleCriarSecretaria)}>
      {showSuccessMessage ? (
        <Alert severity='success'>Usuário excluído com sucesso!</Alert>
      ) : (
        <DialogContent dividers sx={{ paddingTop: 1 }}>
          Deseja realmente excluir?
        </DialogContent>
      )}
      <DialogActions>
        {showSuccessMessage ? null : (
          <>
            <Button
              disabled={loading}
              startIcon={<Close width={24} />}
              variant='outlined'
              color='info'
              onClick={props.handleFecharDelete}
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
              {!loading ? 'Excluir' : <CircularProgress color='success' size={23} />}
            </Button>
          </>
        )}
      </DialogActions>
    </Box>
  </Dialog>
  );
};

ModalFormDeletarUsuario.propTypes = {
  handleFecharModalForm: PropTypes.func.isRequired,
  projetoSelecionadoDeletar: PropTypes.func.isRequired,
  projetosSelecionadoVisualizar: PropTypes.number,
  handleAbrirModalAtualizarEtapaProjeto: PropTypes.func.isRequired,
  handleAbrirModalDelete: PropTypes.func.isRequired,
  handleFecharDelete: PropTypes.func.isRequired
};

ModalFormDeletarUsuario.propTypes = {
  projetoSelecionadoDeletar: null,
};

export default ModalFormDeletarUsuario;
