import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/CloseOutlined';
import { useApiRequestGet } from '../../../../services/api';
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

const DrawerView = (props) => {
  const { projetosSelecionadoVisualizar } = props;
  // const { data, error, loading } = useApiRequestGet(`/projetos/${props.projetosSelecionadoVisualizar}`);
  const { data: listaEtapasProjeto, error, loading } = useApiRequestGet(`/etapasprojetos/${projetosSelecionadoVisualizar}`);
  const { data: projetoSelecionado, loading: loadingProjetoSelecionado } = useApiRequestGet(`/projetos/${projetosSelecionadoVisualizar}`);

  console.log('projetosSelecionadoVisualizar =>> ', projetosSelecionadoVisualizar);

  console.log('listaEtapasProjeto', listaEtapasProjeto);

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


  return (
    <Drawer anchor='right' open={true} onClose={props.handleFecharDrawerView}>
      <Box width='60vw'>
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

        {error && (
          <Box display='flex' flexDirection='row' gap={4} color='red' fontSize={14}>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </Box>
        )}

        <Box marginY={1} paddingY={2} paddingX={3}>
          <Typography component='h6' marginBottom={1}>
            Detalhes do Projeto
          </Typography>
          <TableContainer component={Paper}>
            <Table size='small'>
              <TableBody>
                <TableRow>
                  <StyledTableCell width={144} variant='head'>
                    Desc. Resumida
                  </StyledTableCell>
                  <StyledTableCell>{!loadingProjetoSelecionado && projetoSelecionado?.prjdescresumida}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell width={144} variant='head'>
                    N° da Solicitação
                  </StyledTableCell>
                  <StyledTableCell>{!loadingProjetoSelecionado && projetoSelecionado?.idSonner}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell width={144} variant='head'>
                    Departamento
                  </StyledTableCell>
                  <StyledTableCell>{!loadingProjetoSelecionado && projetoSelecionado?.depNome}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell width={144} variant='head'>
                    Tipo Solicitação
                  </StyledTableCell>
                  <StyledTableCell>{!loadingProjetoSelecionado && projetoSelecionado?.tpjdescricao}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell width={144} variant='head'>
                    Valor
                  </StyledTableCell>
                  <StyledTableCell>{!loadingProjetoSelecionado && projetoSelecionado?.prjvalor}</StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Stack
            direction='row'
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            paddingY={1.5}
          >
            <Typography component='h6' marginBottom={1}>
              Etapas do projeto
            </Typography>
            <Button
              startIcon={<AddCircle />}
              variant='outlined'
              color='success'
              sx={{ marginLeft: 'auto' }}
              onClick={props.handleAbrirModalAtualizarEtapaProjeto}
            >
              Nova etapa
            </Button>
          </Stack>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} size='small' aria-label='customized table'>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Data</StyledTableCell>
                  <StyledTableCell align='left' width={256}>
                    Departamento
                  </StyledTableCell>
                  <StyledTableCell align='left' width={256}>
                    Observação
                  </StyledTableCell>
                  <StyledTableCell align='right' width={128}>
                    Status
                  </StyledTableCell>
                  <StyledTableCell align='right' width={128}>
                    Usuario
                  </StyledTableCell>
                  <StyledTableCell align='center' width={96}>
                    <MenuOpen />
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {listaEtapasProjeto?.map((row) => (
                  <StyledTableRow key={row.prjid}>
                    <StyledTableCell component='th' scope='row'>
                      {row.etpdata}
                    </StyledTableCell>
                    <StyledTableCell align='left'>{row.depNome}</StyledTableCell>
                    <StyledTableCell align='left'>{row.etpobservacao}</StyledTableCell>
                    <StyledTableCell align='right'>{row.etpstatus}</StyledTableCell>
                    <StyledTableCell align='right'>{row.ususers}</StyledTableCell>
                    <StyledTableCell align='center'></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Drawer>
  );
};

DrawerView.propTypes = {
  handleFecharDrawerView: PropTypes.func.isRequired,
  projetosSelecionadoVisualizar: PropTypes.number,
  handleAbrirModalAtualizarEtapaProjeto: PropTypes.func.isRequired,
};

DrawerView.defaultProps = {
  projetosSelecionadoVisualizar: null,
};

export default DrawerView;
