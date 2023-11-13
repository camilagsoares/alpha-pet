import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import DeskOutlinedIcon from '@mui/icons-material/DeskOutlined';
import { NavLink } from 'react-router-dom';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import VerticalSplitOutlinedIcon from '@mui/icons-material/VerticalSplitOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
const SubMenuCadastros = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAbrirSubMenu = (event) => setAnchorEl(event.currentTarget);
  const handleFecharSubMenu = () => setAnchorEl(null);
  const handleAbrirModalCadastroAdmin = () => setAnchorEl(null);

  return (
    <React.Fragment>
      <ListItemButton variant='contained' onClick={handleAbrirSubMenu}>
        <ListItemIcon>
          <AssignmentIndOutlinedIcon color='primary' />
        </ListItemIcon>
        <ListItemText primary='Cadastro' />
      </ListItemButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleFecharSubMenu}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        sx={{ marginLeft: 1, padding: 2 }}
      >
        <NavLink to='/usuarios'>
          <MenuItem onClick={handleAbrirModalCadastroAdmin}>
            <ListItemIcon>
              <PersonAddOutlinedIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Usuários</ListItemText>
          </MenuItem>
        </NavLink>
        
      
        <NavLink to='/departamentos'>
          <MenuItem onClick={handleAbrirModalCadastroAdmin}>
            <ListItemIcon>
              <Inventory2OutlinedIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Departamentos</ListItemText>
          </MenuItem>
        </NavLink>
        <NavLink to='/secretarias'>
          <MenuItem onClick={handleAbrirModalCadastroAdmin}>
            <ListItemIcon>
              <DeskOutlinedIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Secretarias</ListItemText>
          </MenuItem>
        </NavLink>
        <NavLink to='/tipo-projeto'>
          <MenuItem onClick={handleAbrirModalCadastroAdmin}>
            <ListItemIcon>
              <FeedOutlinedIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Tipo Projeto</ListItemText>
          </MenuItem>
        </NavLink>
        <NavLink to='/permissao'>
          <MenuItem onClick={handleAbrirModalCadastroAdmin}>
            <ListItemIcon>
              <VerticalSplitOutlinedIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Permissão</ListItemText>
          </MenuItem>
        </NavLink>
        <NavLink to='/status'>
          <MenuItem onClick={handleAbrirModalCadastroAdmin}>
            <ListItemIcon>
              <AspectRatioOutlinedIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Status</ListItemText>
          </MenuItem>
        </NavLink>
      </Menu>
    </React.Fragment>
  );
};

export default SubMenuCadastros;
