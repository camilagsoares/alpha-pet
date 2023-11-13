import { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context';
import AppLayout from '.';
import axios from 'axios';

const ProtectedRoutes = (props) => {
  const { token, session, criarPerfil } = useContext(AuthContext);
  const location = useLocation();
  // useEffect(() => {
  //   if (token && !session) {
  //     (async () => {
  //       await axios
  //         .get(`http://localhost:3003/api/auth/usuarios/perfil`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             'Content-Type': 'application/json',
  //           },
  //         })
  //         .then(({ data }) => {
  //           criarPerfil(data);
  //         });
  //     })();
  //   }
  // }, [token,session]);

  useEffect(() => {
    if (token && !session) {
      (async () => {
        try {
          // Certifique-se de que o token esteja definido antes de fazer a solicitação
          if (!token) return;

          const response = await axios.get(`http://10.1.0.187:3000/api/auth/usuarios/perfil`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          criarPerfil(response.data);
        } catch (error) {
          // Lida com erros, como token inválido
          console.error('Erro ao buscar dados do perfil:', error);
        }
      })();
    }
  }, [token, session]);

  return token ? <AppLayout {...props} /> : <Navigate to='/login' replace state={{ from: location }} />;
};

export default ProtectedRoutes;
