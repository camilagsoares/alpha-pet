import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { useTheme } from '@emotion/react';
import { NavLink, Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ViewList from '@mui/icons-material/ViewListOutlined';
import DarkMode from '@mui/icons-material/DarkModeOutlined';
import LightMode from '@mui/icons-material/LightModeOutlined';
import Close from '@mui/icons-material/CloseOutlined';
import WorkIcon from '@mui/icons-material/WorkOutline';
import ExitToApp from '@mui/icons-material/ExitToAppOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { SubMenuCadastros, ModalFormAlterarSenha, ModalFormVisualizarPerfil } from '../../components';
import { AuthContext } from '../../contexts/auth.context';
import DownloadTable from '../../components/excelexport';

const drawerWidth = 256;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(7.5),
      },
    }),
  },
}));

const AppLayout = (props) => {
  const theme = useTheme();
  const { encerrarSessao } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAberto, alterarMenuAberto] = useState(true);
  const [abrirFecharDialogSairApp, setAbrirFecharDialogSairApp] = useState(false);
  const [abrirFecharDialogAlterarSenha, setAbrirFecharDialogAlterarSenha] = useState(false);
  const [abrirFecharDialogVisualizarPerfil, setAbrirFecharDialogVisualizarPerfil] = useState(false);
  const [openRelatoriosDialog, setOpenRelatoriosDialog] = useState(false);

  const toggleDrawer = () => alterarMenuAberto(!menuAberto);
  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const openDialogSairApp = () => {
    setAbrirFecharDialogSairApp(true);
    setAnchorEl(null);
  };
  const closeDialogSairApp = () => setAbrirFecharDialogSairApp(false);
  const handleOpenDialogAlterarSenha = () => {
    setAbrirFecharDialogAlterarSenha(true);
    setAnchorEl(null);
  };
  const handleCloseDialogAlterarSenha = () => setAbrirFecharDialogAlterarSenha(false);
  const handleOpenDialogVisualizarPerfil = () => {
    setAbrirFecharDialogVisualizarPerfil(true);
    setAnchorEl(null);
  };
  const handleCloseDialogVisualizarPerfil = () => setAbrirFecharDialogVisualizarPerfil(false);

  const handleOpenRelatoriosDialog = () => {
    setOpenRelatoriosDialog(true);
  };

  const handleCloseRelatoriosDialog = () => {
    setOpenRelatoriosDialog(false);
  };

  const { session, token } = useContext(AuthContext);
  // console.log("session", session) // !== 1

  // if (session && session.id !== undefined) {
  //   console.log('O id da sessão é:', session.id);
  // } else {
  //   console.log('A sessão não está definida ou não possui um id.');
  // }
  return (
    <Box sx={{ display: 'flex' }}>
      {abrirFecharDialogAlterarSenha && <ModalFormAlterarSenha handleFecharModalForm={handleCloseDialogAlterarSenha} />}
      {abrirFecharDialogVisualizarPerfil && (
        <ModalFormVisualizarPerfil handleFecharModalForm={handleCloseDialogVisualizarPerfil} />
      )}
      <AppBar position='absolute' open={menuAberto}>
        <Toolbar sx={{ paddingRight: '24px' }}>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton sx={{ ml: 1 }} onClick={props.changeTheme} color='inherit'>
            {theme.palette.mode === 'dark' ? <DarkMode /> : <LightMode />}
          </IconButton>
          <IconButton color='inherit' onClick={handleAvatarClick}>
            <Avatar sx={{ bgcolor: 'primary.main' }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            variant='menu'
          >
            <MenuList autoFocus>
              <MenuItem onClick={handleOpenDialogAlterarSenha}>
                <ListItemIcon>
                  <KeyOutlinedIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText>Alterar Senha</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleOpenDialogVisualizarPerfil}>
                <ListItemIcon>
                  <AccountBoxOutlinedIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText>Perfil</ListItemText>
              </MenuItem>
              <MenuItem onClick={openDialogSairApp}>
                <ListItemIcon>
                  <ExitToApp fontSize='small' />
                </ListItemIcon>
                <ListItemText>Sair</ListItemText>
              </MenuItem>
            </MenuList>
          </Menu>
        </Toolbar>
      </AppBar>
      <Dialog open={openRelatoriosDialog} onClose={handleCloseRelatoriosDialog} maxWidth='sm' fullWidth>
        <DialogTitle>Relatórios Workflow</DialogTitle>
        <DialogContent dividers>
          <DownloadTable />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRelatoriosDialog} color='primary' variant='outlined'>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={abrirFecharDialogSairApp} onClose={closeDialogSairApp} maxWidth='sm' fullWidth>
        <DialogTitle>Confirmar saída</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>Tem certeza que deseja sair? </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button startIcon={<Close />} onClick={closeDialogSairApp} color='error' variant='outlined'>
            Cancelar
          </Button>
          <Button
            startIcon={<ExitToApp />}
            onClick={() => {
              closeDialogSairApp();
              encerrarSessao();
            }}
            color='primary'
            variant='outlined'
          >
            Sair
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer variant='permanent' open={menuAberto}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', px: [1] }}>
          <IconButton color='inherit' aria-label='open drawer' onClick={toggleDrawer}>
            {menuAberto ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
        <Divider />
        <List
          component='nav'
          sx={{
            span: { color: (t) => (t.palette.mode === 'light' ? t.palette.grey[900] : t.palette.text.primary) },
            a: { textDecoration: 'none' },
          }}
        >
          <NavLink to='/'>
            <ListItemButton>
              <ListItemIcon>
                <ViewList color='primary' />
              </ListItemIcon>
              <ListItemText primary='Solicitações' />
            </ListItemButton>
          </NavLink>
          {/* <NavLink to='/licitacoes'>
            <ListItemButton>
              <ListItemIcon>
                <WorkIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary='Processos Licitatórios' />
            </ListItemButton>
          </NavLink>
          <SubMenuCadastros /> */}
          {session && (session.permissao.id === 1 || session.permissao.id === 2 || session.id === 42 || session.id === 18 || session.id === 16) && session.permissao.id !== undefined && (
            <>
              <NavLink to='/licitacoes'>
                <ListItemButton>
                  <ListItemIcon>
                    <WorkIcon color='primary' />
                  </ListItemIcon>
                  <ListItemText primary='Processos Licitatórios' />
                </ListItemButton>
              </NavLink>
              {/* <SubMenuCadastros /> */}
            </>
          )}
          {session && session.id === 1 && session.id !== undefined && (
            <>
              <SubMenuCadastros />
            </>
          )}
          <List component='nav'>
            <ListItemButton onClick={handleOpenRelatoriosDialog}>
              <ListItemIcon>
                <ViewList color='primary' />
              </ListItemIcon>
              <ListItemText primary='Relatórios Workflow' />
            </ListItemButton>
          </List>
        </List>
      </Drawer>
      <Box
        component='main'
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Container maxWidth='100%' sx={{ paddingY: 1, marginTop: 10 }}>
          <Box>
            <Outlet />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

AppLayout.propTypes = {
  changeTheme: PropTypes.func.isRequired,
};

export default AppLayout;
