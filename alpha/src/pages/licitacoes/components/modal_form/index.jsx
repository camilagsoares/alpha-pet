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

const ModalForm = (props) => {
  return (
    <Dialog disableEscapeKeyDown fullWidth open={true} onClose={props.handleFecharModalForm} maxWidth='lg'>
      <DialogTitle>
        <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography component='h5'>Criar projeto</Typography>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='clos modal create project'
            onClick={props.handleFecharModalForm}
          >
            <Close color='action' />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers sx={{ paddingTop: 1 }}>
        <Box
          component='form'
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            console.log('event =>> ', event.currentTarget);
          }}
        >
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                required
                fullWidth
                autoFocus
                id='email'
                label='E-mail'
                margin='normal'
                name='email'
                type='email'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                fullWidth
                required
                id='password'
                label='Senha'
                margin='normal'
                name='password1'
                type='password'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                fullWidth
                required
                id='password'
                label='Senha'
                margin='normal'
                name='password2'
                type='password'
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                required
                fullWidth
                autoFocus
                id='email'
                label='E-mail'
                margin='normal'
                name='email1'
                type='email'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                fullWidth
                required
                id='password'
                label='Senha'
                margin='normal'
                name='password3'
                type='password'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                fullWidth
                required
                id='password'
                label='Senha'
                margin='normal'
                name='password4'
                type='password'
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button startIcon={<Close />} variant='outlined' color='info' onClick={props.handleFecharModalForm}>
          Cancelar
        </Button>
        <Button startIcon={<Save />} variant='outlined' color='success'>
          Salvar
        </Button>
      </DialogActions>
      {/* <DialogContentText >
        </DialogContentText> */}
      {/* <Slide /> */}
    </Dialog>
  );
};

ModalForm.propTypes = {
  handleFecharModalForm: PropTypes.func.isRequired,
};

export default ModalForm;
