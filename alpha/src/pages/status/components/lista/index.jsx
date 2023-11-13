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
import { useState, useEffect } from 'react';

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
      </TableRow>
    ));
  };
  const {
    data,
    loading
    // error: errorDepartamento,
  } = useApiRequestGet('/status');
  // const { data, error, loading } = useApiRequestGet('/secretarias');
  console.log("secretarias", data)
  const { searchTerm } = props;

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
          row.sigla.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.nome.toLowerCase().includes(searchTerm.toLowerCase())
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
                <StyledTableCell align='left' width={196}>Id</StyledTableCell>
                <StyledTableCell align='left' width={196}>Status</StyledTableCell>
                <StyledTableCell align='left' width={196}>
                  Descrição
                </StyledTableCell>
                {/* <StyledTableCell align='left' width={312}>
                Nome
                </StyledTableCell>
                <StyledTableCell align='left' width={312}>
                Descrição
                </StyledTableCell> */}




              </StyledTableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRowsLoaderSkeleton rowsNum={5} />
              ) : (
                filteredData?.map((row) => {
                  {
                    return (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell component='th' scope='row'>
                          {row.id}
                        </StyledTableCell>
                        <StyledTableCell align='left'>{row.nome}</StyledTableCell>
                        <StyledTableCell align='left'>{row.observacao}</StyledTableCell>
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
