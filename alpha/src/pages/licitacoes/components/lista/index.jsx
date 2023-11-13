import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import MenuOpen from '@mui/icons-material/MenuOpenOutlined';
import Visibility from '@mui/icons-material/VisibilityOutlined';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { Skeleton } from '@mui/material';
import { useApiRequestGet } from '../../../../services/api';
import React, { useState, useContext, useEffect } from 'react';
import EditOutlined from '@mui/icons-material/EditOutlined';
import Pagination from '@mui/material/Pagination'
import "./styles.css"
import { AuthContext } from '../../../../contexts/auth.context';

const Lista = (props) => {
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
  }));

  const TableRowsLoaderSkeleton = ({ rowsNum }) => {
    return [...Array(rowsNum)].map((row, index) => (
      <TableRow key={index}>
        <StyledTableCell component='th' scope='row'>
          <Skeleton animation='wave' variant='text' height={36} />
        </StyledTableCell>
        <StyledTableCell>
          <Skeleton animation='wave' variant='text' height={36} />
        </StyledTableCell>
        <StyledTableCell>
          <Skeleton animation='wave' variant='text' height={36} />
        </StyledTableCell>
        <StyledTableCell>
          <Skeleton animation='wave' variant='text' height={36} />
        </StyledTableCell>
        <StyledTableCell>
          <Skeleton animation='wave' variant='text' height={36} />
        </StyledTableCell>
      </TableRow>
    ));
  };

  const { data, error, loading } = useApiRequestGet(`/processos-licitatorios`);
  // console.log("data",data)

  const { searchTerm } = props;
  const { filterByAta } = props;
  const { filterByDepartamento } = props;
  const { filterByConcluido } = props;

  const [pageNumber, setPageNumber] = useState(0);
  const projectsPerPage = 6;
  const pagesVisited = pageNumber * projectsPerPage;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    setPageNumber(0);
  }, [data]);

  const dataIsValid = Array.isArray(data) && !isNaN(projectsPerPage);
  const [filteredData, setFilteredData] = useState(data);
  const { token, session } = useContext(AuthContext);
  // console.log("TESTE",data[0].situacao)

  useEffect(() => {
    if (Array.isArray(data)) {
      const filtered = data.filter((row) => {
        const departamentoNome = row?.etapa[0]?.departamento?.nome || '';
        const lowerSearchTerm = searchTerm.toLowerCase();
        const situacao = row.situacao;

        return (
          row.numeroCompras.toString().includes(searchTerm) ||
          row.idSonner.toString().includes(searchTerm) ||
          departamentoNome.includes(searchTerm) ||
          row.descricao.toLowerCase().includes(lowerSearchTerm) ||
          row.etapa[0]?.departamento?.nome.toLowerCase().includes(lowerSearchTerm) ||
          row.titulo.toLowerCase().includes(lowerSearchTerm)
        ) &&
          (filterByDepartamento === 'all' || departamentoNome === filterByDepartamento) &&
          (filterByConcluido === 'all' || (filterByConcluido === 'concluded' && situacao === 'INATIVO'));
      });
      setFilteredData(filtered);
    }
  }, [data, searchTerm, filterByDepartamento, filterByConcluido]);





  function getBordaClasse(projeto) {
    if (projeto.situacao === 'INATIVO') {
      return 'borda-verde';

    } else {
      return 'borda-cinza';
    }
  }


  return (
    <React.Fragment>
      {error && (
        <Box display='flex' flexDirection='row' gap={4} color='red' fontSize={14}>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </Box>
      )}
      <Box marginY={1} paddingY={2}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='customized table'>
            <TableHead className='borda-azul'>
              <StyledTableRow>
                <StyledTableCell width={256}>N° Compras</StyledTableCell>

                <StyledTableCell width={256}>N° licitação</StyledTableCell>
                <StyledTableCell align='left' width={500}>
                  Desc.Resum.
                </StyledTableCell>
                <StyledTableCell align='left' width={320}>
                  Departamento
                </StyledTableCell>
                <StyledTableCell align='center' width={196}>
                <MenuOpen />
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRowsLoaderSkeleton rowsNum={5} />
              ) : (
                filteredData?.length === 0 ? (
                  <StyledTableRow>
                    <StyledTableCell colSpan={5}>
                      Nenhuma licitação encontrada.
                    </StyledTableCell>
                  </StyledTableRow>
                ) : (
                  filteredData?.slice(pagesVisited, pagesVisited + projectsPerPage).map((row, index) => (
                    <StyledTableRow key={row?.id}>
                      <StyledTableCell component='th' scope='row' className={getBordaClasse(row)}>
                        {row.numeroCompras}

                      </StyledTableCell>
                      <StyledTableCell component='th' scope='row' >
                        {row.idSonner}
                      </StyledTableCell>
                      <StyledTableCell align='left'>{row.titulo}</StyledTableCell>
                      <StyledTableCell align='left'>{row.etapa[0]?.departamento?.secretaria.sigla} - {row.etapa[0]?.departamento?.nome}</StyledTableCell>

                      {/* <StyledTableCell align='center'>
                        <Tooltip title='Detalhes' arrow>
                          <IconButton
                            edge='start'
                            color='inherit'
                            aria-label='open modal details'
                            onClick={() => {
                              props.handleAbrirDrawerView(row?.id);  //esse abre o drawerview do processo licitatorio
                            }}
                          >
                            <Visibility color='action' />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>
                      {filteredData && row.situacao !== 'INATIVO' && (filteredData[0] && filteredData[0].usuarioId === session?.id || session?.permissao.id === 1 || session?.id === 50) &&
                        (
                          <StyledTableCell align='center'>
                            <Tooltip title='Alterar' arrow>
                              <IconButton
                                edge='start'
                                color='inherit'
                                aria-label='open modal details'
                                onClick={() => {
                                  props.handleAbrirEditarProjeto(row?.id);
                                }}
                              >
                                <EditOutlined color='action' />
                              </IconButton>
                            </Tooltip>
                          </StyledTableCell>
                        )} */}
                      <StyledTableCell align="center">
                        <Tooltip title='Detalhes' arrow>
                          <IconButton
                            edge='start'
                            color='inherit'
                            aria-label='open modal details'
                            onClick={() => {
                              props.handleAbrirDrawerView(row?.id);
                            }}
                            style={{ margin: '6px' }}
                          >
                            <Visibility fontSize="small" color='action' />
                          </IconButton>
                        </Tooltip>
                        {filteredData && row.situacao !== 'INATIVO' && (filteredData[0] && filteredData[0].usuarioId === session?.id || session?.permissao.id === 1 || session?.id === 50) &&
                          (
                            <Tooltip title='Alterar' arrow>
                              <IconButton
                                edge='start'
                                color='inherit'
                                aria-label='open modal details'
                                onClick={() => {
                                  props.handleAbrirEditarProjeto(row?.id);
                                }}
                                style={{ marginRight: '-22px' }}
                              >
                                <EditOutlined fontSize="small" color='action' />
                              </IconButton>
                            </Tooltip>)}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {!loading && dataIsValid && data.length > 0 && (
        <Box display="flex" justifyContent="end" mt={2} >
          <Pagination
            color="primary"
            count={Math.ceil(data?.length / projectsPerPage)}
            page={pageNumber + 1}
            onChange={(event, page) => {
              changePage({ selected: page - 1 });
            }}
            variant="outlined"
            shape="rounded"
          />
        </Box>
      )}
    </React.Fragment>
  );
};

Lista.propTypes = {
  handleAbrirDrawerView: PropTypes.func.isRequired,
  handleAbrirEditarProjeto: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
};

Lista.defaultProps = {
  searchTerm: undefined,
};

export default Lista;
