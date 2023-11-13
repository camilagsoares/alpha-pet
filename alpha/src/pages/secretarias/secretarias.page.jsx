import { useState } from 'react';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AddCircle from '@mui/icons-material/AddCircleOutline';
import FilterAlt from '@mui/icons-material/FilterAltOutlined';
import ModalForm from './components/modal_form';
import Lista from './components/lista';
import ModalFormAtualizarSecretaria from "./components/modal_atualizar_secretaria"
import ModalFormDeletarUsuario from "./components/modal_deletar_usuario"

const SecretariasPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalFormAberto, abrirFecharModalForm] = useState(false);

  const [drawerViewAberto, abrirFecharDrawerView] = useState(false);
  const [drawerViewAbertoDelete, abrirFecharDrawerViewDelete] = useState(false);

  const [projetosSelecionadoVisualizar, setProjetosSelecionadoVisualizar] = useState(null);
  const [modalFormAtualizarEtapa, abrirFecharModalFormAtualizarEtapa] = useState(false);
  const [modalDeleteAberto, abrirFecharModalDelete] = useState(false);
  const [projetoSelecionadoDeletar, setProjetoSelecionadoDeletar] = useState(null);

  const handleAbrirDeleteModal = (idProjeto) => {
    abrirFecharModalDelete(true);
    setProjetoSelecionadoDeletar(idProjeto);
  };

  const handleFecharDeleteModal = () => handleAbrirDeleteModal(false);

  const handleAbrirDrawerView = (idProjeto) => {
    abrirFecharDrawerView(true);
    setProjetosSelecionadoVisualizar(idProjeto);
  };

  const handleFecharDrawerView = () => abrirFecharDrawerView(false);

  const handleAbrirDelete = (idProjeto) => {
    abrirFecharDrawerViewDelete(true);
    setProjetoSelecionadoDeletar(idProjeto);
  };

  const handleFecharDelete = () => abrirFecharDrawerViewDelete(false);

  const handleFecharModalAtualizarEtapaProjeto = () => abrirFecharModalFormAtualizarEtapa(false);
  const handleAbrirModalAtualizarEtapaProjeto = () => abrirFecharModalFormAtualizarEtapa(true);

  const handleAbrirModalDelete = () => abrirFecharModalDelete(true);

  const handleSearchTermChange = (term) => setSearchTerm(term);

  const handleFecharModalForm = () => abrirFecharModalForm(false);
  const handleAbrirModalForm = () => abrirFecharModalForm(true);

  return (
    <Box>
      <Typography component='h2' variant='h5' fontWeight={700} color='text.primary'>
        Secretárias
      </Typography>
      <Divider />
      <Box display='flex' flexDirection='row' gap={2} paddingY={2}>
        <Button startIcon={<AddCircle />} variant='outlined' color='primary' onClick={handleAbrirModalForm}>
          Criar secretária
        </Button>
        <TextField
          size='small'
          variant='outlined'
          color='primary'
          value={searchTerm}
          onChange={(e) => handleSearchTermChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <FilterAlt color='primary' />
              </InputAdornment>
            ),
          }}
          placeholder='Filtrar'
          sx={{
            marginLeft: 'auto',
            width: '190px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#1976D2',
              },
              '&:hover fieldset': {
                borderColor: '#1976D2',
              },
              '& input': {
                color: 'gray',
                textTransform: 'none',
                fontWeight: '100',
              },
              '& input::placeholder': {
                color: '#1976D2',
                textTransform: 'uppercase',
                fontWeight: '400',
              },
            },
          }}
        />
        {modalFormAberto && <ModalForm handleFecharModalForm={handleFecharModalForm} />}
        {drawerViewAberto && (
            <ModalFormAtualizarSecretaria
              handleFecharDrawerView={handleFecharDrawerView}
              projetosSelecionadoVisualizar={projetosSelecionadoVisualizar}
              handleAbrirModalAtualizarEtapaProjeto={handleAbrirModalAtualizarEtapaProjeto}
            />
          )}

          {drawerViewAbertoDelete && (
            <ModalFormDeletarUsuario
              handleFecharDelete={handleFecharDelete}
              projetoSelecionadoDeletar={projetoSelecionadoDeletar}
              handleAbrirModalAtualizarEtapaProjeto={handleAbrirModalAtualizarEtapaProjeto}
              handleAbrirModalDelete={handleAbrirModalDelete}
            />
          )}
      </Box>
      <Lista searchTerm={searchTerm}  handleAbrirDrawerView={handleAbrirDrawerView}
          handleAbrirDelete={handleAbrirDelete}/>
    </Box>
  );
};

export default SecretariasPage;
