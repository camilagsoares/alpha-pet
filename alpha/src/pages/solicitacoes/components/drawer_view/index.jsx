import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/CloseOutlined';
import { useApiRequestGet, axiosApi } from '../../../../services/api';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import MenuOpen from '@mui/icons-material/MenuOpenOutlined';
import AddCircle from '@mui/icons-material/AddCircleOutline';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import React, { useState, useContext, useEffect } from 'react';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import Dialog from '@mui/material/Dialog';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import Alert from '@mui/material/Alert';
import "./styles.css"

const DrawerView = (props) => {
  const { projetosSelecionadoVisualizar } = props;
  const { conclusionDate } = props;
  const { data: listaEtapasProjeto, loading: loadingProjetoSelecionado } = useApiRequestGet(
    `/projetos/${projetosSelecionadoVisualizar}`,
  );

  // console.log("projetos",listaEtapasProjeto?.criadoEm)

  const formatDateToDDMMYYYY = (date) => {
    if (!date) return '';
    return format(new Date(date), 'dd-MM-yyyy');
  };

  const situacao = listaEtapasProjeto?.situacao || '';
  const concluidoEmData = listaEtapasProjeto?.concluidoEm || '';
  const formattedConcluidoEm = formatDateToDDMMYYYY(concluidoEmData);


  const { data: listaTiposProjeto, loading: loadingTiposProjeto } = useApiRequestGet(
    `/etapas/projeto/${projetosSelecionadoVisualizar}`,
  );


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const [pageNumber, setPageNumber] = useState(0);
  const projectsPerPage = 4;
  const pagesVisited = pageNumber * projectsPerPage;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    setPageNumber(0);
  }, [listaTiposProjeto]);

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const {
    data: status,
  } = useApiRequestGet('/status');


  const { data, loading } = useApiRequestGet('/projetos');



  const dataIsValid = Array.isArray(data) && !isNaN(projectsPerPage);

  const CustomAlert = styled(Alert)(({ theme }) => ({
    backgroundColor: '#b9dab9',
  }));


  if (!listaTiposProjeto) {
    console.error("A lista de tipos de projeto está nula. Verifique se os dados foram carregados corretamente.");
    return null;
  }

  const dataAtual = new Date();
  const diferencaDeDias = listaTiposProjeto.map(item => {
    const dataCriacao = new Date(item.criadoEm);
    const diferencaEmDias = Math.floor((dataAtual - dataCriacao) / (1000 * 60 * 60 * 24));
    return diferencaEmDias;
  });

  /** TESTE NOVA ETAPA SIMULTANEO */
  const {etapasProjeto} = props;
  console.log(props.etapasProjeto)

  
  const combinedEtapas = [...props.etapasProjeto, ...listaTiposProjeto];

  // Ordene o array combinado com base na data de criação (assumindo que a data de criação está em uma propriedade 'criadoEm')
  combinedEtapas.sort((a, b) => {
    return new Date(b.criadoEm) - new Date(a.criadoEm);
  });

  return (
    <Drawer anchor='right' open={true} onClose={props.handleFecharDrawerView}>
      <Box width='70vw'>
        <Stack
          direction='row'
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          padding={1.5}
        >
          <Typography component='h5'>Visualizar projeto</Typography>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='close drawer view project'
            onClick={props.handleFecharDrawerView}
          >
            <Close color='action' />
          </IconButton>
        </Stack>
        <Divider />
        {/* 
        {error && (
          <Box display='flex' flexDirection='row' gap={4} color='red' fontSize={14}>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </Box>
        )} */}

        <Box marginY={1} paddingY={2} paddingX={3}>
          <Typography component='h6' marginBottom={1}>
            Detalhes do Projeto

          </Typography>
          {conclusionDate && (
            <p>Data de conclusão do projeto: {conclusionDate.toLocaleString()}</p>
          )}
          <TableContainer component={Paper}>
            <Table size='small'>
              <TableBody>
                <TableRow>
                  {/* <StyledTableCell width={144} variant='head' height={90}>  */}

                  <StyledTableCell width={144} variant='head'>
                    Criado por
                  </StyledTableCell>
                  <StyledTableCell> {!loadingProjetoSelecionado && listaEtapasProjeto?.usuario.nome}</StyledTableCell>
                </TableRow>
                <TableRow>
                  {/* <StyledTableCell width={144} variant='head' height={90}>  */}

                  <StyledTableCell width={144} variant='head'>
                    Desc. Resumida
                  </StyledTableCell>
                  <StyledTableCell>{!loadingProjetoSelecionado && listaEtapasProjeto?.titulo}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell width={144} variant='head'>
                    N° da Solicitação
                  </StyledTableCell>
                  <StyledTableCell>{!loadingProjetoSelecionado && listaEtapasProjeto?.idSonner}</StyledTableCell>
                </TableRow>
                {/* <TableRow>
                  <StyledTableCell width={144} variant='head'>
                    Departamento
                  </StyledTableCell>
                  <StyledTableCell>{!loadingProjetoSelecionado && listaEtapasProjeto?.departamento}</StyledTableCell>
                </TableRow> */}
                <TableRow>
                  <StyledTableCell width={144} variant='head'>
                    Descrição
                  </StyledTableCell>
                  <StyledTableCell>{!loadingProjetoSelecionado && listaEtapasProjeto?.descricao}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell width={144} variant='head'>
                    Valor
                  </StyledTableCell>
                  <StyledTableCell>{!loadingProjetoSelecionado && listaEtapasProjeto?.valor}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell width={144} variant='head'>
                    Observação
                  </StyledTableCell>
                  <StyledTableCell>{!loadingProjetoSelecionado && listaEtapasProjeto?.observacao}</StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div>
            {situacao === 'INATIVO' && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                <CustomAlert severity="success">Projeto concluído em: {formattedConcluidoEm}</CustomAlert>
              </div>
            )}

            {situacao !== 'INATIVO' && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '15px', marginTop: '20px' }}>
                <Button
                  startIcon={<AddCircle />}
                  variant="outlined"
                  color="success"
                  onClick={() => props.handleAbrirModalAtualizarEtapaProjeto(projetosSelecionadoVisualizar)}
                  sx={{ marginLeft: '15px' }}
                >
                  Nova etapa
                </Button>
                <Button
                  startIcon={<DoneOutlinedIcon />}
                  variant="outlined"
                  color="primary"
                  sx={{ marginLeft: '15px' }}
                  onClick={() => {
                    props.handleAbrirModalConcluirProjeto(projetosSelecionadoVisualizar);
                  }}
                >
                  Concluir
                </Button>
              </div>
            )}
          </div>

          <Typography component='h6' marginBottom={1}>
            Etapas do projeto
          </Typography>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} size='small' aria-label='customized table'>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align='left' width={256}>
                    Data
                  </StyledTableCell>
                  <StyledTableCell align='left' width={256}>
                    Dias corridos
                  </StyledTableCell>
                  <StyledTableCell align='left' width={256}>
                    Status
                  </StyledTableCell>
                  <StyledTableCell align='left' width={256}>
                    Departamento
                  </StyledTableCell>
                  <StyledTableCell align='left' width={300}>
                    Observação
                  </StyledTableCell>
                  <StyledTableCell align='left' width={256}>
                    Usuario
                  </StyledTableCell>
                  <StyledTableCell align='center' width={96}>
                    <MenuOpen />
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
       {combinedEtapas.slice(pagesVisited, pagesVisited + projectsPerPage).map((row, index) => (
  <StyledTableRow key={row.id}>
    <StyledTableCell component='th' scope='row'>
      {row.criadoEm ? `${row.criadoEm.slice(8, 10)}/${row.criadoEm.slice(5, 7)}/${row.criadoEm.slice(0, 4)}` : ''}
    </StyledTableCell>
    <StyledTableCell align='left'>
      <span className='textred'>{diferencaDeDias[index]} </span> dias
    </StyledTableCell>
    <StyledTableCell align='left'>{row.status && row.status.nome ? row.status.nome : ''}</StyledTableCell>
    <StyledTableCell align='left'>{row.departamento && row.departamento.nome ? row.departamento.nome : ''}</StyledTableCell>
    <StyledTableCell align='left'>{row.observacao || ''}</StyledTableCell>
    <StyledTableCell align='left'>{row.usuario && (row.usuario.nome === 'Master' ? 'Administrador' : row.usuario.nome) || ''}</StyledTableCell>
    <StyledTableCell align='center'></StyledTableCell>
  </StyledTableRow>
))}


        </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {!loadingTiposProjeto && dataIsValid && data.length > 0 && (
          <Box display="flex" justifyContent="end" mt={2} mr={2}>
            <Pagination
              color="primary"
              count={Math.ceil(listaTiposProjeto?.length / projectsPerPage)}
              page={pageNumber + 1}
              onChange={(event, page) => {
                changePage({ selected: page - 1 });
              }}
              variant="outlined"
              shape="rounded"
            />
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

DrawerView.propTypes = {
  handleFecharDrawerView: PropTypes.func.isRequired,
  projetosSelecionadoVisualizar: PropTypes.number,

  handleAbrirModalAtualizarEtapaProjeto: PropTypes.func.isRequired,
  handleAbrirModalConcluirProjeto: PropTypes.func.isRequired,

};

DrawerView.defaultProps = {
  projetosSelecionadoVisualizar: null,
};

export default DrawerView;
