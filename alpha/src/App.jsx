import { useMemo, useState,useContext } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { LicitacoesPage, LoginPage, SecretariasPage, SolicitacoesPage, DepartamentosPage } from './pages';
import { AuthContextProvider } from './contexts/auth.context';
import ProtectedRoutes from './layouts/app/protected.routes';
import CadastroUsuarios from './pages/cadastroUsuarios';
// import CadastroCargos from "./pages/cadastroCargos/index";
import TipoProjeto from './pages/tipoProjeto';
import Permissao from "./pages/permissao/index"
import Status from './pages/status';
import Teste from "./pages/Teste/index"
import { AuthContext } from './contexts/auth.context';
function App() {
  const [mode, setMode] = useState('light');
  // const { token, criarSessao } = useContext(AuthContext);
  const tokenInStorage = localStorage.getItem('token');
  // console.log("tokenInStorage",tokenInStorage)
  const colorMode = useMemo(
    () => ({
      alterarTema: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  // const { token, session } = useContext(AuthContext);
// console.log("token",token)
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route element={<ProtectedRoutes changeTheme={colorMode.alterarTema} />}>
              <Route path='/' element={<SolicitacoesPage changeTheme={colorMode.alterarTema} />} />
              <Route path='/licitacoes' element={<LicitacoesPage changeTheme={colorMode.alterarTema} />} />
              {/* <Route path='/novo-usuario' element={<Cadastro changeTheme={colorMode.alterarTema} />} /> */}
              <Route path='/secretarias' element={<SecretariasPage changeTheme={colorMode.alterarTema} />} />
              <Route path='/departamentos' element={<DepartamentosPage changeTheme={colorMode.alterarTema} />} />
              <Route path='/usuarios' element={<CadastroUsuarios changeTheme={colorMode.alterarTema} />} />
              {/* <Route path='/cargos' element={<CadastroCargos changeTheme={colorMode.alterarTema} />} /> */}
              <Route path='/tipo-projeto' element={<TipoProjeto changeTheme={colorMode.alterarTema} />} />
              <Route path='/permissao' element={<Permissao changeTheme={colorMode.alterarTema} />} />
              <Route path='/status' element={<Status changeTheme={colorMode.alterarTema} />} />
              <Route path='/teste' element={<Teste changeTheme={colorMode.alterarTema} />} />

              {/* <Route path='/admin' element={<AdminPage changeTheme={colorMode.alterarTema} />} /> */}
            </Route>
            <Route
              path='*'
              element={
                <div>
                  <h1>404 - Not found - Página não encontrada</h1>
                  <NavLink to='/'>Voltar para home</NavLink>
                </div>
              }
            />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
