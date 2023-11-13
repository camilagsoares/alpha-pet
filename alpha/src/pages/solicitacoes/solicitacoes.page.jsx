import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import AddCircle from '@mui/icons-material/AddCircleOutline';
import FilterAlt from '@mui/icons-material/FilterAltOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Lista from './components/lista';
import ModalForm from './components/modal_form';
import { useState, useContext } from 'react';
import DrawerView from './components/drawer_view';
import ModalAtualizarEtapasProjeto from './components/modal_atualizarEtapasProjeto';
import ModalAdicionarProcessoLicitatorio from './components/modal_adicionar_processo_licitatorio';
import ModalEditarProjeto from './components/modal_editar_projeto';
import InputAdornment from '@mui/material/InputAdornment';
import { AuthContext } from "../../contexts/auth.context"
import ModalConcluirProjeto from "./components/modal_concluir_projeto"
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { useApiRequestGet } from '../../services/api';
import ModalPrioridadeProjeto from "./components/modal_prioridade_projeto/index"
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CircularProgress from '@mui/material/CircularProgress';
import Autocomplete from '@mui/material/Autocomplete';
import "./styles.css"
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { NavLink, } from 'react-router-dom';
import Grow from '@mui/material/Grow';

const requiredField = 'Campo obrigatorio';

const schema = yup
  .object({
    tipoProjetoId: yup.number().required(requiredField),
  })
  .required();

const SolicitacoesPage = () => {

  const { register, handleSubmit, formState, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {

      tipoProjetoId: '',

    },
  });

  const { errors } = formState;

  const [modalFormAberto, abrirFecharModalForm] = useState(false);
  const [modalFormAtualizarEtapa, abrirFecharModalFormAtualizarEtapa] = useState(false);
  const [modalFormConcluir, abrirFecharModalConcluir] = useState(false);
  const [modalFormPrioridade, abrirFecharModalPrioridade] = useState(false);

  const [modalFormAdicionarProcessoLicitatorio, abrirFecharModalFormAdicionarProcessoLicitatorio] = useState(false);
  const [drawerViewAberto, abrirFecharDrawerView] = useState(false);
  const [projetosSelecionadoVisualizar, setProjetosSelecionadoVisualizar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editarProjetoAberto, abrirFecharEditarProjeto] = useState(false);
  const [concluirProjetoAberto, abrirFecharConcluirProjeto] = useState(false)
  const [proridadeProjetoAberto, abrirFecharPrioridadeProjeto] = useState(false)

  const handleFecharModalForm = () => abrirFecharModalForm(false);
  const handleAbrirModalForm = () => abrirFecharModalForm(true);

  const handleAbrirDrawerView = (idProjeto) => {
    abrirFecharDrawerView(true);
    setProjetosSelecionadoVisualizar(idProjeto);
  };
  const handleFecharDrawerView = () => abrirFecharDrawerView(false);

  const handleFecharEditarProjeto = () => abrirFecharEditarProjeto(false);

  const handleFecharConcluirProjeto = () => abrirFecharConcluirProjeto(false);

  const handleFecharPrioridadeProjeto = () => abrirFecharModalPrioridade(false);

  const handleFecharModalConcluirProjeto = () => abrirFecharModalConcluir(false);

  const handleFecharModalAtualizarEtapaProjeto = () => abrirFecharModalFormAtualizarEtapa(false);

  const handleAbrirModalAtualizarEtapaProjeto = (idProjeto) => {
    setProjetosSelecionadoVisualizar(idProjeto);
    abrirFecharModalFormAtualizarEtapa(true);
  };

  const handleFecharAdcPLic = () => abrirFecharModalFormAdicionarProcessoLicitatorio(false);
  const handleAbrirAdcPLic = () => abrirFecharModalFormAdicionarProcessoLicitatorio(true);

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  const handleAbrirEditarProjeto = (idProjeto) => {
    abrirFecharEditarProjeto(true);
    setProjetosSelecionadoVisualizar(idProjeto);
  };

  //
  const handleAbrirModalConcluirProjeto = (idProjeto) => {
    setProjetosSelecionadoVisualizar(idProjeto);
    abrirFecharModalConcluir(true);
  };

  const handleAbrirModalPrioridadeProjeto = (idProjeto) => {
    setProjetosSelecionadoVisualizar(idProjeto);
    abrirFecharModalPrioridade(true);
  };


  const [clickedProjectIds, setClickedProjectIds] = useState([]);
  const [selectedProjectIdSonner, setSelectedProjectIdSonner] = useState([])



  const handleIncluirClick = (projetoId, idSonner) => {
    if (clickedProjectIds.includes(projetoId)) {
      setClickedProjectIds((prevClickedProjectIds) =>
        prevClickedProjectIds.filter((id) => id !== projetoId)
      );
      setSelectedProjectIdSonner((prevSelectedProjectIdSonnars) =>
        prevSelectedProjectIdSonnars.filter((id) => id !== idSonner)
      );
    } else {
      setClickedProjectIds((prevClickedProjectIds) => [
        ...prevClickedProjectIds,
        projetoId,
      ]);
      setSelectedProjectIdSonner((prevSelectedProjectIdSonnars) => [
        ...prevSelectedProjectIdSonnars,
        idSonner,
      ]);
    }
  };


  // TESTE ocultar botão alterar
  const [mostrarBotaoAlterar, setMostrarBotaoAlterar] = useState(true);
  const [statusId, setStatusId] = useState('');
  //
  const { session, token } = useContext(AuthContext);

  const [projetosConcluidos, setProjetosConcluidos] = useState([]);


  //
  const [conclusionText, setConclusionText] = useState("");


  //
  const [filterByUrgent, setFilterByUrgent] = useState(false); // Initialize with 'all' to show all projects

  const [filterByAta, setFilterByAta] = useState('all');

  const handleFilterByAtaChange = (event) => {
    const newValue = event.target.value;

    // Check if the selected option is "Urgente" and set filterByAta accordingly
    if (newValue === "urgent") {
      setFilterByAta("urgent");
    } else {
      setFilterByAta(newValue);
    }
  };


  //
  const [conclusionDate, setConclusionDate] = useState(null);

  //filtro por dpto
  const [filterByDepartamento, setFilterByDepartamento] = useState('all');
  const { data: listaDptos } = useApiRequestGet('/departamentos');


  const handleFilterByDepartamentoChange = (event) => {
    const newValue = event.target.value;
    setFilterByDepartamento(newValue);
  };


  //filtrar por secretaria

  const [filterBySecretaria, setFilterBySecretaria] = useState('');
  const [secretariaCounts, setSecretariaCounts] = useState({});

  const { data, loading } = useApiRequestGet('/projetos');
  const [secretarias, setSecretarias] = useState([]);
  const handleFilterBySecretariaChange = (event) => {
    const newValue = event.target.value;
    setFilterBySecretaria(newValue);
  };

  useEffect(() => {

    const resultAtivo = !loading && data?.filter((resposta) => resposta.situacao === 'ATIVO' && resposta.prioridadeProjeto === true)

    const resultInativo = !loading && data?.filter((resposta) => resposta.situacao === 'INATIVO')

    console.log(`Resultado dos projetos ATIVOS`, resultAtivo);

    console.log(`Resultado dos projetos INATIVOS`, resultInativo);
  })


  // console.log(data);

  useEffect(() => {
    if (data) {
      const secretariaCounts = {};
      data.forEach((projeto) => {
        const secretariaNome = projeto?.etapa[0]?.departamento?.secretaria?.nome || '';
        if (!secretariaCounts[secretariaNome]) {
          secretariaCounts[secretariaNome] = 1;
        }
      });
      setSecretariaCounts(secretariaCounts);
    }
  }, [data]);

  const { data: listaTiposProjeto, loading: loadingTiposProjeto
  } = useApiRequestGet('/tipos-projeto');

  // teste filtro tipo projeto
  const [selectedTipoProjeto, setSelectedTipoProjeto] = useState('');
  const [secretariaOptions, setSecretariaOptions] = useState([]);

  const [uniqueSecretarias, setUniqueSecretarias] = useState([]);
  const [selectedSecretaria, setSelectedSecretaria] = useState("");

  useEffect(() => {
    if (listaDptos && listaDptos.length) {
      const uniqueSecretarias = [];
      listaDptos.forEach((departamento) => {
        const secretariaNome = departamento.secretaria.nome;
        if (!uniqueSecretarias.includes(secretariaNome)) {
          uniqueSecretarias.push(secretariaNome);
        }
      });
      setUniqueSecretarias(uniqueSecretarias);
    }
  }, [listaDptos]);

  useEffect(() => {
    setFilterBySecretaria(selectedSecretaria);
  }, [selectedSecretaria]);

  const [expanded, setExpanded] = useState(false);

  const toggleFilters = () => {
    setExpanded(!expanded);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  /* TESTE NOVA ETAPA SIMULTÂNEA */
  // const [etapasProjeto, setEtapasProjeto] = useState([]);
  // const [etapas, setEtapas] = useState([]);
  // const atualizarEtapas = (novasEtapas) => {
  //   setEtapas([...etapas, ...novasEtapas]);
  // };


  const [etapasProjeto, setEtapasProjeto] = useState([]);

  const atualizarEtapasProjeto = (novaEtapa) => {
    setEtapasProjeto((etapasAntigas) => [...etapasAntigas, novaEtapa]);
  };

  useEffect(() => {
    atualizarEtapasProjeto()
  },[])

  // const veri
  // const verificaTime = () => {
  //   setTimeout(() => {
  //     alert("Teste")
  //   }, 3000)
  // }

  // verificaTime()
  return (
    <Box>

      <Typography component='h2' variant='h5' fontWeight={700} color='text.primary'>
        Solicitações
      </Typography>

      <Divider />
      {/* <Box display='flex' flexDirection='row' gap={2} paddingY={2}>
        <Button startIcon={<AddCircle />} variant='outlined' color='primary' onClick={handleAbrirModalForm} sx={{ width: '290px', height: '50px' }}>
          Criar solicitação
        </Button>
        {session && (session.permissao.id === 1 || session.permissao.id === 2) && (
          <Button
            startIcon={<AddCircle />}
            variant='outlined'
            color='primary'
            onClick={handleAbrirAdcPLic}
            sx={{ width: '380px', height: '50px' }}
          >
            Criar Processo Licitatório
          </Button>
        )}
    
      
      <Box container justifyContent="flex-end" alignItems="center" spacing={2}></Box>
        <Grid item sx={{ marginTop: '4px' }}>
          <TextField
            size="small"
            variant="outlined"
            color="primary"
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FilterAlt color="primary" />
                </InputAdornment>
              ),
            }}
            placeholder="Filtrar"
            sx={{
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
      </Box> */}

      <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-between' paddingY={2}>
        <Box >
          <Button
            startIcon={<AddCircle />}
            variant='outlined'
            color='primary'
            onClick={handleAbrirModalForm}
            sx={{ width: '200px', height: '50px', marginRight: '10px' }}
          >
            Agendar cliente
          </Button>
        
        </Box>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {expanded && (
            // <Grow in={expanded} >
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }} sx={{ width: expanded ? '50%' : 0, marginBottom: '-41px' }}
            >
              <Grid item xs={6} sx={{ width: '100px', height: '50px' }}>
                <FormControl size="small" variant="outlined" color="primary" sx={{ width: '100%', height: '100%' }}>
                  <InputLabel htmlFor="filter-ata">Filtro status</InputLabel>
                  <Select
                    native
                    value={filterByAta}
                    onChange={handleFilterByAtaChange}
                    label="Filtrar por Ata"
                    inputProps={{
                      id: "filter-ata"
                    }}
                  >
                    <option value="all">Todos</option>
                    <option value="concluded">Concluído</option>
                    <option value="urgent">Urgente</option>
                  </Select>
                </FormControl>
              </Grid>
              {/* <Grid item xs={6} sx={{ width: '100px', height: '50px' }}>
                <Controller
                  name='tipoProjetoId'
                  control={control}
                  render={({ field }) => {
                    const { onChange, name, onBlur, value, ref } = field;

                    return (
                      <Autocomplete
                        fullWidth
                        size="small"
                        options={listaTiposProjeto || []}
                        getOptionLabel={(tipoprojeto) => tipoprojeto.descricao}
                        value={
                          listaTiposProjeto &&
                          listaTiposProjeto.find((item) => item.id === value)
                        }
                        onChange={(event, newValue) => {
                          const selectedValue = newValue ? newValue.id : '';
                          setSelectedTipoProjeto(selectedValue);
                          onChange(selectedValue);
                        }}
                        onBlur={onBlur}
                        isOptionEqualToValue={(option, value) => option.id === value}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label='Tipo projeto'
                            variant='outlined'
                            name={name}
                            error={!!errors.tipoProjetoId}
                            helperText={errors.tipoProjetoId?.message}
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: loadingTiposProjeto && (
                                <InputAdornment position='start'>
                                  <CircularProgress color='info' size={28} sx={{ marginRight: 2 }} />
                                </InputAdornment>
                              ),
                            }}
                            sx={{ width: '100%', height: '100%' }}
                          />
                        )}
                      />
                    );
                  }}
                />
              </Grid> */}
              {/* <Grid item xs={6} sx={{ width: '100px', height: '50px' }}>
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
                      InputProps={{
                        ...params.InputProps,
                        id: 'filter-departamento',
                      }}
                      sx={{ width: '100%', height: '100%' }}
                    />
                  )}
                />
              </Grid> */}
              <Grid item xs={6} sx={{ width: '120px', height: '50px' }}>
                <Autocomplete
                  fullWidth
                  options={['', ...uniqueSecretarias]}
                  value={selectedSecretaria}
                  onChange={(event, newValue) => {
                    setSelectedSecretaria(newValue);
                  }}
                  getOptionLabel={(option) => option === '' ? 'Todos' : option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Filtrar por Secretaria"
                      variant="outlined"
                      size="small"
                      color="primary"
                      InputProps={{
                        ...params.InputProps,
                        id: 'filter-secretaria',
                      }}
                      sx={{ width: '100%', height: '100%' }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          )}
          <Button onClick={toggleFilters} variant="contained" color="primary" sx={{ width: '170px', height: '50px', marginLeft: '10px' }}>
            {expanded ? 'Ocultar Filtros' : 'Mostrar Filtros'}
          </Button>
        </div>

      </Box>

      <Grid item sx={{ marginTop: '4px' }}>
        <TextField
          size="small"
          variant="outlined"
          color="primary"
          value={searchTerm}
          onChange={(e) => handleSearchTermChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterAlt color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="Filtrar"
          sx={{
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
            width: '200px'
          }}
        />
      </Grid>
    
      <Lista
        searchTerm={searchTerm}
        handleAbrirDrawerView={handleAbrirDrawerView}
        handleAbrirEditarProjeto={handleAbrirEditarProjeto}
        handleIncluirClick={handleIncluirClick}
        clickedProjectIds={clickedProjectIds}
        projetosSelecionadoVisualizar={projetosSelecionadoVisualizar}
        filterByAta={filterByAta}
        filterByDepartamento={filterByDepartamento}
        filterBySecretaria={filterBySecretaria}
        handleAbrirModalPrioridadeProjeto={handleAbrirModalPrioridadeProjeto}
        filterByUrgent={filterByUrgent}
        selectedTipoProjeto={selectedTipoProjeto}
      />

      {modalFormAberto && <ModalForm handleFecharModalForm={handleFecharModalForm}
      //  handleFecharModalAtualizarEtapaProjeto={handleFecharModalAtualizarEtapaProjeto}
      />}

      {modalFormAtualizarEtapa && (
        <ModalAtualizarEtapasProjeto
          handleFecharModalForm={handleFecharModalForm}
          handleFecharModalAtualizarEtapaProjeto={handleFecharModalAtualizarEtapaProjeto}
          projetosSelecionadoVisualizar={projetosSelecionadoVisualizar}
          //teste
          // etapasProjeto={etapasProjeto}
          // setEtapasProjeto={setEtapasProjeto}
          // atualizarEtapasProjeto={atualizarEtapasProjeto}
          onNovaEtapaCriada={atualizarEtapasProjeto}

        />
      )}

      {modalFormAdicionarProcessoLicitatorio && (
        <ModalAdicionarProcessoLicitatorio
          clickedProjectIds={clickedProjectIds}
          handleFecharAdcPLic={handleFecharAdcPLic}
          handleIncluirClick={handleIncluirClick}
          handleFecharModalForm={handleFecharModalForm}

          //teste
          selectedProjectIdSonner={selectedProjectIdSonner}
        />
      )}

      {drawerViewAberto && (
        <DrawerView
          handleFecharDrawerView={handleFecharDrawerView}
          projetosSelecionadoVisualizar={projetosSelecionadoVisualizar}
          handleAbrirModalAtualizarEtapaProjeto={handleAbrirModalAtualizarEtapaProjeto}
          handleAbrirModalConcluirProjeto={handleAbrirModalConcluirProjeto}

          //
          setConclusionDate={setConclusionDate}
          //teste
          // etapas={etapas}
          // etapasProjeto={etapasProjeto}
          etapasProjeto={etapasProjeto}

        />
      )}

      {editarProjetoAberto && (
        <ModalEditarProjeto
          handleFecharEditarProjeto={handleFecharEditarProjeto}
          projetosSelecionadoVisualizar={projetosSelecionadoVisualizar}
          handleAbrirModalAtualizarEtapaProjeto={handleAbrirModalAtualizarEtapaProjeto}
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

          //teste para deixar borda verde
          setConclusionDate={setConclusionDate}
        // setConcludedProjects={setConcludedProjects}
        />
      )}

      {/* LÓGICA MODAL PRIORIDADE PROJETO */}
      {modalFormPrioridade && (
        <ModalPrioridadeProjeto
          handleFecharPrioridadeProjeto={handleFecharPrioridadeProjeto}
          projetosSelecionadoVisualizar={projetosSelecionadoVisualizar}
          handleAbrirModalPrioridadeProjeto={handleAbrirModalPrioridadeProjeto}
        />
      )}
    </Box>
  );
};

SolicitacoesPage.propTypes = {
  changeTheme: PropTypes.func.isRequired,
};

export default SolicitacoesPage;
// ModalAtualizarEtapasProjeto


// quando o status for retorno mas aparece para o usuario,para quem abriu a solicitacao,nunca para o compras