import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import MenuOpen from '@mui/icons-material/MenuOpenOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { Skeleton } from '@mui/material';
import { useApiRequestGet } from '../../../../services/api';
import React from 'react';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Pagination from '@mui/material/Pagination';
import { useState,useEffect } from 'react';
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
    '&:last-child td, &:last-child th': {
      border: 0,
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
      </TableRow>
    ));
  };

  const { data, error, loading } = useApiRequestGet('/departamentos');
  const { searchTerm } = props;
  console.log('departamentos', data);

  const [pageNumber, setPageNumber] = useState(0);
  const projectsPerPage = 6;
  const pagesVisited = pageNumber * projectsPerPage;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    setPageNumber(0);
  }, [data]);

  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    if (searchTerm) {
      const filtered = data.filter((row) => {
        return (
          row.id.toString().includes(searchTerm) ||
          row.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.secretaria.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [data, searchTerm]);
  return (
    <React.Fragment>
      {/* {error && (
        <Box display='flex' flexDirection='row' gap={4} color='red' fontSize={14}>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </Box>
      )} */}
      <Box marginY={1} paddingY={2}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='customized table'>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell  align='left'>Departamento</StyledTableCell>
                <StyledTableCell align='left' width={240}>
                  Secretária
                </StyledTableCell>
                <StyledTableCell align='center' width={196}>
                  Max. Dias
                </StyledTableCell>
                <StyledTableCell align='center' width={196}>
                  Editar
                </StyledTableCell>
                <StyledTableCell align='center' width={96}>
                  Deletar
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRowsLoaderSkeleton rowsNum={7} />
              ) : (
                filteredData?.slice(pagesVisited, pagesVisited + projectsPerPage).map((row) => {
                  {
                    return (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell component='th' scope='row'>
                          {row.id}
                        </StyledTableCell>
                        <StyledTableCell component='th' scope='row'  align='left'>
                          {row.nome}
                        </StyledTableCell>
                        <StyledTableCell component='th' scope='row' align='left'>
                          {row.secretaria.nome}
                        </StyledTableCell>
                        <StyledTableCell align='center'>{row.maxDias}</StyledTableCell>
                        <StyledTableCell align='center'>
                          <Tooltip title='Editar' arrow>
                            <IconButton
                              edge='start'
                              color='inherit'
                              aria-label='edit register departament'
                              onClick={() => {
                                props.handleAbrirDrawerView(row.id);
                              }}
                            >
                              <EditOutlined color='action' />
                            </IconButton>
                          </Tooltip>
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          <Tooltip title='Editar' arrow>
                            <IconButton
                              edge='start'
                              color='inherit'
                              aria-label='edit register departament'
                              onClick={() => {
                                props.handleAbrirDelete(row.id);
                              }}
                            >
                              <ClearOutlinedIcon color='action' />
                            </IconButton>
                          </Tooltip>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  }
                  return null;
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {!loading && (
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
  searchTerm: PropTypes.string,
};

Lista.defaultProps = {
  searchTerm: undefined,
};

export default Lista;
