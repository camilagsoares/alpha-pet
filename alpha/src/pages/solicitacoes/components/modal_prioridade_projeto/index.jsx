import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/CloseOutlined';
import Save from '@mui/icons-material/SaveAltOutlined';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { useApiRequestGet, useApiRequestSubmit } from '../../../../services/api';
import React, { useState, useContext } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { AuthContext } from '../../../../contexts/auth.context';
import { axiosApi } from '../../../../services/api';
import { toast } from 'react-toastify';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';



const schema = yup
    .object({
        prioridadeProjeto: yup.boolean(),
        // situacao: yup.string(),
    })
    .required();

const ModalPrioridadeProjeto = (props) => {
    // const { handleFecharModalConcluirProjeto } = props;
    const { handleFecharPrioridadeProjeto } = props;
    const { projetosSelecionadoVisualizar } = props;


    const { register, handleSubmit, formState, control, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            // concluidoEm: new Date(),
            prioridadeProjeto: false
        },
    });


    const { token, session } = useContext(AuthContext);

    const { errors } = formState;


    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [loading, setLoading] = useState(false);



    const { data: projetoSelecionado, loading: loadingProjetoSelecionado } = useApiRequestGet(`/projetos/${projetosSelecionadoVisualizar}`);
    // console.log("projetoSelecionado", projetoSelecionado.prioridadeProjeto)
 
    const handleCriarSecretaria = (data) => {
        setLoading(true);
        if (projetoSelecionado.prioridadeProjeto) {
          // Se a prioridade estiver definida, reverter para false
          data.prioridadeProjeto = false;
          axiosApi
            .put(`/projetos/${projetosSelecionadoVisualizar}`, data)
            .then(() => {
              toast('Prioridade do projeto revertida!', {
                type: 'success',
              });
              reset();
              window.location.reload();

            })
            .catch((error) => {
              toast(error.message, {
                type: 'error',
              });
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          // Se a prioridade não estiver definida, definir para true
          data.prioridadeProjeto = true;
          axiosApi
            .put(`/projetos/${projetosSelecionadoVisualizar}`, data)
            .then(() => {
              toast('Projeto definido como prioridade!', {
                type: 'success',
              });
              reset();
              window.location.reload();

            })
            .catch((error) => {
              toast(error.message, {
                type: 'error',
              });
            })
            .finally(() => {
              setLoading(false);
            });
        }
      };

    return (
        <Dialog disableEscapeKeyDown fullWidth open={true} onClose={handleFecharPrioridadeProjeto} maxWidth='sm'>
            <DialogTitle>
                <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography component='h5'>
                    {projetoSelecionado?.prioridadeProjeto ? 'Deseja reverter prioridade?' : 'Deseja definir prioridade do projeto?'}
                    </Typography>
                    <IconButton
                        edge='start'
                        color='inherit'
                        aria-label='clos modal create project'
                        onClick={handleFecharPrioridadeProjeto}
                    >
                        <Close color='action' />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <Box component='form' noValidate onSubmit={handleSubmit(handleCriarSecretaria)}>
                <DialogActions>
                    <Button
                        disabled={loading}
                        startIcon={<Close width={24} />}
                        variant='outlined'
                        color='info'
                        onClick={handleFecharPrioridadeProjeto}
                        sx={{ minWidth: 156, height: '100%' }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type='submit'
                        disabled={loading}
                        startIcon={<CheckOutlinedIcon width={24} />}
                        variant='outlined'
                        color='success'
                        sx={{ minWidth: 156, height: '100%' }}

                    >
                        {/* {!loading ? 'Definir' : <CircularProgress color='success' size={23} />} */}
                        {!loading ? (projetoSelecionado?.prioridadeProjeto ? 'Reverter' : 'Definir') : <CircularProgress color='success' size={23} />}

                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

ModalPrioridadeProjeto.propTypes = {
    handleFecharPrioridadeProjeto: PropTypes.func.isRequired,

};

export default ModalPrioridadeProjeto;
