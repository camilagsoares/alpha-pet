import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token') || null);
   const [session, setSession] = useState(JSON.parse(localStorage.getItem('session')) || null);
  const [profileLoaded, setProfileLoaded] = useState(false);

  // console.log("token authContext", session?.permissao.id)
  // console.log("session", session);
  // console.log("session", session)

  const criarPerfil = (objectUser) => {
    localStorage.setItem('session', JSON.stringify(objectUser.content.session));
    setSession(objectUser.content.session);
    setProfileLoaded(true);
  };

  const criarSessao = (objectSessionUser) => {
    // const { content } = objectSessionUser;
    // localStorage.setItem('token', content.token);
    // setSession(content.session);
    // setToken(content.token);
    // navigate('/');

    // const { content } = objectSessionUser;
    // localStorage.setItem('token', content.token);
    // localStorage.setItem('session', JSON.stringify(content.session)); // Armazena os dados da sessão como uma string JSON
    // setSession(content.session);
    // setToken(content.token);
    // navigate('/');


    const { content } = objectSessionUser;
    localStorage.setItem('token', content.token);
    localStorage.setItem('session', JSON.stringify(content.session));
    setSession(content.session);
    setToken(content.token);
    setProfileLoaded(true);
    navigate('/');
    window.location.reload(); 
  };

  const encerrarSessao = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('session'); 
    localStorage.removeItem('projetos'); // Limpe o cache dos projetos
    setToken(null);
    setSession(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, criarSessao, criarPerfil, session, encerrarSessao }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = { children: PropTypes.element };
