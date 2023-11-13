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
import React, { useState, useContext, useEffect } from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { AuthContext } from "../../../../contexts/auth.context"
import { axiosApi } from '../../../../services/api';
import { toast } from 'react-toastify';




const ModalEditarProjeto = (props) => {
  const [loading, setLoading] = useState(false);

  const [numeroCompras, setNumeroCompras] = useState('');
  const [titulo, setTitulo] = useState('');
  const [idSonner, setIdSonner] = useState('');
  const [descricao, setDescricao] = useState('');

  const { projetosSelecionadoVisualizar } = props;
  // console.log("projetosSelecionadoVisualizar",projetosSelecionadoVisualizar)

  const { handleFecharAdcPLic } = props;
  const { handleFecharEditarProjeto } = props;
  const { session } = useContext(AuthContext);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const {
    data: processosLicitatorios,
    error: errorProcessosLicitatorios,
    loading: loadingProjetoSelecionado,
  } = useApiRequestGet(`/processos-licitatorios/${projetosSelecionadoVisualizar}`);

  const { data } = useApiRequestGet(`/processos-licitatorios`);
console.log("datas",processosLicitatorios?.usuarioId)


  useEffect(() => {
    if (!loadingProjetoSelecionado && processosLicitatorios) {
      setTitulo(processosLicitatorios.titulo);
      setIdSonner(processosLicitatorios.idSonner);
      setDescricao(processosLicitatorios.descricao);
      setNumeroCompras(processosLicitatorios.numeroCompras);

    }
  }, [loadingProjetoSelecionado, processosLicitatorios]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (session?.id === processosLicitatorios?.usuarioId || session?.id === 50) {

    setLoading(true);
    const data = {
      titulo: titulo,
      descricao: descricao,
      idSonner: parseInt(idSonner, 10),
      numeroCompras: parseInt(numeroCompras, 10),
    };

    axiosApi
      .put(`/processos-licitatorios/${projetosSelecionadoVisualizar}`, data)
      .then(() => {
        toast('Projeto atualizado com sucesso', {
          type: 'success',
        });
        setLoading(false);
      })
      .catch((error) => {
        toast(error.message, {
          type: 'error',
        });
        setLoading(false);
      });
      }
     else {
      toast('Você não tem permissão para concluir este projeto. Somente o usuário que criou.', {
        type: 'error',
      });
    }
  };


  return (
    <Dialog disableEscapeKeyDown fullWidth open={true} onClose={props.handleFecharEditarProjeto} maxWidth='sm'>
      <DialogTitle>
        <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography component='h5'>Editar Processo Licitatório</Typography>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='clos modal create project'
            onClick={props.handleFecharEditarProjeto}
          >
            <Close color='action' />
          </IconButton>
        </Stack>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ paddingTop: 1 }}>
          <Grid container columnSpacing={2} rowSpacing={2} marginTop={0.5}>

            <Grid item xs={12} sm={12} md={12}>
              <TextField
                value={idSonner}
                onChange={(e) => setIdSonner(e.target.value)}
                required
                fullWidth
                autoFocus
                label='Nº Sonner'
                type='number'
              />
            </Grid>
            {session && (session.id === 39) && (
              <>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    fullWidth
                    required
                    label='Título'
                    type='text'
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    fullWidth
                    required
                    label='Descrição'
                    type='text'
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    value={numeroCompras}
                    onChange={(e) => setNumeroCompras(e.target.value)}
                    fullWidth
                    required
                    label='Número Compras'
                    type='text'
                  />
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={loading}
            startIcon={<Close width={24} />}
            variant='outlined'
            color='info'
            onClick={handleFecharEditarProjeto}
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
      </form>
    </Dialog>
  );
};

ModalEditarProjeto.propTypes = {
  // handleFecharAdcPLic: PropTypes.func.isRequired,
};

export default ModalEditarProjeto;
