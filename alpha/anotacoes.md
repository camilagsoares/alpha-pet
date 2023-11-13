
como atualizar somente o componente dentro do drawerView onde eu renderizo as novas etapas com o post do modalAtualizarEtapasProjeto?  Pois atualmente a cada novo post atualiza a página inteira,ao invés de somente o componente onde mostro o drawerview. Preciso rodar o window.location.reload(); mas que seja somente no componente e não na pagina inteira

Sendo que ModalAtualizarEtapasProjeto e drawerView estao dentro do SolicitacoesPage
----------------------ModalAtualizarEtapasProjeto----------------------
 const handleCriarSecretaria = (data) => {
    setLoading(true);
    axiosApi
      .post('/etapas', data)
      .then(() => {
        toast('Nova etapa criado com sucesso', {
          type: 'success',
        });
        reset();
        window.location.reload();

        handleFecharModalForm();
      })
      .catch((error) => {
        toast(error.message, {
          type: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
    console.log("OQ mandei",data);
  };
-------------------------SolicitacoesPage--------------
    {modalFormAtualizarEtapa && (
        <ModalAtualizarEtapasProjeto

        //Teste ocultar
        // setSelectedStatus={setSelectedStatus}

        />
      )}



      {drawerViewAberto && (
        <DrawerView
    
          //
          setConclusionDate={setConclusionDate}
        />
      )}
----------------------DrawerView----------------------------------------------
As novas etapas que eu crio aparece aqui:

const DrawerView = (props) => {

  const { data: listaTiposProjeto, loading: loadingTiposProjeto } = useApiRequestGet(
    `/etapas/projeto/${projetosSelecionadoVisualizar}`,
  );
  return (
    <Drawer anchor='right' open={true} onClose={props.handleFecharDrawerView}>
      <Box width='70vw'>


        <Box marginY={1} paddingY={2} paddingX={3}>
      
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

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} size='small' aria-label='customized table'>
        
              <TableBody>
                {listaTiposProjeto?.slice(pagesVisited, pagesVisited + projectsPerPage).map((row,index) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component='th' scope='row'>
                      {`${row.criadoEm.slice(8, 10)}/${row.criadoEm.slice(5, 7)}/${row.criadoEm.slice(0, 4)}`}
                    </StyledTableCell>  
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
     
      </Box>
    </Drawer>

    //
    você precisa garantir que está sempre atualizando objetos no estado e atualizando matrizes no estado , em vez de alterá-los: