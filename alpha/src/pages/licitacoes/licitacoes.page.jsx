import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import AddCircle from '@mui/icons-material/AddCircleOutline';
import FilterAlt from '@mui/icons-material/FilterAltOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Lista from '../licitacoes/components/lista';
import ModalForm from '../licitacoes/components/modal_form';
import { useState } from 'react';
import DrawerView from '../licitacoes/components/drawer_view';
import ModalAtualizarEtapasProjeto from '../licitacoes/components/modal_atualizarEtapasProjeto';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ModalEditarProjeto from './components/modal_editar_projeto';
import ModalConcluirProjeto from './components/modal_concluir_projeto/index';
import { useApiRequestGet } from '../../services/api';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from '@mui/material/Autocomplete';

const LicitacoesPage = () => {
  const [modalFormAberto, abrirFecharModalForm] = useState(false);
  const [modalFormAtualizarEtapa, abrirFecharModalFormAtualizarEtapa] = useState(false);
  const [drawerViewAberto, abrirFecharDrawerView] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [liciSelecionadoVisualizar, setLiciSelecionadoVisualizar] = useState(null);
  const [editarProjetoAberto, abrirFecharEditarProjeto] = useState(false);
  const [projetosSelecionadoVisualizar, setProjetosSelecionadoVisualizar] = useState(null);
  const [modalFormConcluir, abrirFecharModalConcluir] = useState(false);
  const [concluirProjetoAberto, abrirFecharConcluirProjeto] = useState(false)

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  const handleFecharModalForm = () => abrirFecharModalForm(false);
  const handleAbrirModalForm = () => abrirFecharModalForm(true);

  const handleFecharModalConcluirProjeto = () => abrirFecharModalConcluir(false);
  const handleFecharConcluirProjeto = () => abrirFecharConcluirProjeto(false);

  const handleAbrirDrawerView = (idProjeto) => {
    abrirFecharDrawerView(true);
    setProjetosSelecionadoVisualizar(idProjeto);
  };
  const handleFecharDrawerView = () => abrirFecharDrawerView(false);

  const handleFecharModalAtualizarEtapaProjeto = () => abrirFecharModalFormAtualizarEtapa(false);

  const handleAbrirModalAtualizarEtapaProjeto = (idProjeto) => {
    setProjetosSelecionadoVisualizar(idProjeto);
    abrirFecharModalFormAtualizarEtapa(true);
  };

  const handleFecharEditarProjeto = () => abrirFecharEditarProjeto(false);

  const handleAbrirEditarProjeto = (idProjeto) => {
    abrirFecharEditarProjeto(true);
    setProjetosSelecionadoVisualizar(idProjeto);
  };

  const handleAbrirModalConcluirProjeto = (idProjeto) => {
    setProjetosSelecionadoVisualizar(idProjeto); //
    // setLiciSelecionadoVisualizar(idProjeto); //nao tava comentado antes
    abrirFecharModalConcluir(true);
  };
  const [filterByDepartamento, setFilterByDepartamento] = useState('all');

  const { data: listaDptos, loading: loadingTiposProjeto } = useApiRequestGet('/departamentos');

  const handleFilterByDepartamentoChange = (event) => {
    const newValue = event.target.value;
    setFilterByDepartamento(newValue);
  };

  const [filterByAta, setFilterByAta] = useState('all');

  // const handleFilterByAtaChange = (event) => {
  //   const newValue = event.target.value;

  //   if (newValue === "andamento") {
  //     setFilterByAta("andamento");
  //   } else {
  //     setFilterByAta(newValue);
  //   }
  // };
  const [filterBySituacao, setFilterBySituacao] = useState('all'); // Definir o estado inicial


  const [filterByConcluido, setFilterByConcluido] = useState('all');

  const handleFilterByConcluidoChange = (event) => {
    const newValue = event.target.value;
    setFilterByConcluido(newValue);
  };


  return (
    <Box>
      <Typography component='h2' variant='h5' fontWeight={700} color='text.primary'>
        Processos Licitatórios
      </Typography>
      <Divider />
      <Box display='flex' flexDirection='row' gap={2} paddingY={2}>

        <Grid container justifyContent="flex-end" alignItems="center" gap={2}>
          {/* <Grid item>
            <FormControl size="small" variant="outlined" color="primary" sx={{ maxWidth: 160 }}>
              <InputLabel htmlFor="filter-ata">Filtrar por Tipo</InputLabel>
              <Select
                native
                value={filterByAta}
                onChange={handleFilterByAtaChange}
                label="Filtrar por Ata"
                inputProps={{
                  id: "filter-ata"
                }}
              >
                <option value="concluido">Concluído</option>
                <option value="andamento">Em andamento</option>
              </Select>
            </FormControl>
          </Grid> */}
          <FormControl size="small" variant="outlined" color="primary" sx={{ maxWidth: 160 }}>
            <InputLabel htmlFor="filter-concluido">Filtrar por Concluído</InputLabel>
            <Select
              native
              value={filterByConcluido}
              onChange={handleFilterByConcluidoChange}
              label="Filtrar por Concluído"
              inputProps={{
                id: "filter-concluido"
              }}
            >
              <option value="all">Todos</option>
              <option value="concluded">Concluído</option>
            </Select>
          </FormControl>
          <Grid item>
            <Autocomplete
              fullWidth
              options={listaDptos || []}
              getOptionLabel={(departamento) => `${departamento.secretaria.sigla} - ${departamento.nome}`}
              value={
                listaDptos &&
                listaDptos.find((item) => item.nome === filterByDepartamento)
              }
              onChange={(event, newValue) => {
                const selectedValue = newValue ? newValue.nome : 'all';
                setFilterByDepartamento(selectedValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Filtrar por Departamento"
                  variant="outlined"
                  size="small"
                  color="primary"
                  sx={{ width: 260 }}
                  InputProps={{
                    ...params.InputProps,
                    id: 'filter-departamento',
                  }}
                />
              )}
            />
          </Grid>
          {/* <Grid item>
            <FormControl size="small" variant="outlined" color="primary" sx={{ maxWidth: 160 }}>
              <InputLabel htmlFor="filter-ata">Filtrar por Departamento</InputLabel>
              <Select
                native
                value={filterByDepartamento}
                onChange={handleFilterByDepartamentoChange}
                label="Filtrar por Departamento"
                inputProps={{
                  id: "filter-departamento"
                }}
              >
                <option value="all">Todos</option>
                {listaDptos &&
                  listaDptos.length &&
                  listaDptos.map((departamento) => (
                    <option key={departamento.id} value={departamento.nome}>
                      {departamento.secretaria.sigla} -  {departamento.nome}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </Grid> */}

          <Grid item>
            <TextField
              size="small"
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
          </Grid>
        </Grid>
      </Box>
      <Lista
        searchTerm={searchTerm}
        handleAbrirDrawerView={handleAbrirDrawerView}
        handleAbrirEditarProjeto={handleAbrirEditarProjeto}
        filterByDepartamento={filterByDepartamento}
        filterByAta={filterByAta}
        // filterByConcluded={filterByConcluded}
        filterBySituacao={filterBySituacao}
        filterByConcluido={filterByConcluido}
      />

      {modalFormAberto && (
        <ModalForm
          handleFecharModalForm={handleFecharModalForm}
          liciSelecionadoVisualizar={liciSelecionadoVisualizar}
        />
      )}

      {modalFormAtualizarEtapa && (
        <ModalAtualizarEtapasProjeto
          handleFecharModalAtualizarEtapaProjeto={handleFecharModalAtualizarEtapaProjeto}
          projetosSelecionadoVisualizar={projetosSelecionadoVisualizar}
          liciSelecionadoVisualizar={liciSelecionadoVisualizar}
          handleFecharModalForm={handleFecharModalForm}
        />
      )}
      {drawerViewAberto && (
        <DrawerView
          handleFecharDrawerView={handleFecharDrawerView}
          // liciSelecionadoVisualizar={liciSelecionadoVisualizar}
          handleAbrirModalAtualizarEtapaProjeto={handleAbrirModalAtualizarEtapaProjeto}
          projetosSelecionadoVisualizar={projetosSelecionadoVisualizar}
          handleAbrirModalConcluirProjeto={handleAbrirModalConcluirProjeto}

        />
      )}


      {modalFormConcluir && (
        <ModalConcluirProjeto
          handleFecharConcluirProjeto={handleFecharConcluirProjeto}
          projetosSelecionadoVisualizar={projetosSelecionadoVisualizar}
          handleAbrirModalAtualizarEtapaProjeto={handleAbrirModalAtualizarEtapaProjeto}
          handleAbrirModalConcluirProjeto={handleAbrirModalConcluirProjeto}
          handleFecharModalConcluirProjeto={handleFecharModalConcluirProjeto}
          liciSelecionadoVisualizar={liciSelecionadoVisualizar}

        />
      )}


      {editarProjetoAberto && (
        <ModalEditarProjeto
          handleFecharEditarProjeto={handleFecharEditarProjeto}
          projetosSelecionadoVisualizar={projetosSelecionadoVisualizar}
          handleAbrirModalAtualizarEtapaProjeto={handleAbrirModalAtualizarEtapaProjeto}
        />
      )}
    </Box>
  );
};

LicitacoesPage.propTypes = {
  changeTheme: PropTypes.func.isRequired,
};

export default LicitacoesPage;
