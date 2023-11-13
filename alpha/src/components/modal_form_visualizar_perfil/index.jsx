import { useContext,useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/CloseOutlined';
import AccountCircle from '@mui/icons-material/AccountCircleOutlined';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useApiRequestGet } from '../../services/api';
import { AuthContext } from '../../contexts/auth.context';

const ModalFormVisualizarPerfil = (props) => {
  const { token, session, criarPerfil } = useContext(AuthContext)
  const { handleFecharModalForm } = props;
  const [loading, setLoading] = useState(false);
  // console.log("token authContext", session?.permissao.id)
  // console.log("token authContext", session?.permissao.nome)

  // console.log("token authContext", session?.email)

  // console.log(token) 

  // console.log("data",data)
  return (
    <Dialog disableEscapeKeyDown open={true} fullWidth onClose={handleFecharModalForm} maxWidth='xs'>
      <DialogTitle>
        <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='close modal view perfil details'
            onClick={handleFecharModalForm}
          >
            <Close color='action' />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ paddingTop: 1 }}>
        <Box marginBottom={3}>
          {/* {error && (
            <Box display='flex' flexDirection='row' gap={4} color='red' fontSize={14}>
              <pre>{JSON.stringify(error, null, 2)}</pre>
            </Box>
          )} */}
          <Stack direction='column' spacing={1} alignItems='center'>
            <Avatar alt='Foto Perfil' src='*' sx={{ width: 64, height: 64, bgcolor: 'ButtonShadow' }}>
              {loading ? (
                <Skeleton variant='circular' width={40} height={40} />
              ) : (
                <AccountCircle sx={{ width: 64, height: 64 }} color='primary' />
              )}
            </Avatar>
            <Typography gutterBottom variant='h4' component='div'>
              {loading ? <Skeleton variant='text' sx={{ fontSize: '2.65rem', width: 272 }} /> : session.nome}
            </Typography>
            <Typography variant='h5' color='text.secondary'>
              {loading ? <Skeleton variant='text' sx={{ fontSize: '2rem', width: 272 }} /> : session.email}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {loading ? <Skeleton variant='text' sx={{ fontSize: '1.375rem', width: 272 }} /> : session?.telefone}
            </Typography>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

ModalFormVisualizarPerfil.propTypes = {
  handleFecharModalForm: PropTypes.func.isRequired,
};

export default ModalFormVisualizarPerfil;
