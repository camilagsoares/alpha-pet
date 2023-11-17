import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const tokenInStorage = localStorage.getItem('token');



const axiosApi = axios.create({
  // baseURL: `http://177.200.96.132:5477/api`,
  baseURL: `http://10.1.0.187:3003/api`,
  headers: {
    Authorization: `Bearer ${tokenInStorage}`,
    'Content-Type': 'application/json',
  },
});

const configHeaders = () => ({
  Authorization: `Bearer ${tokenInStorage}`,
  'Content-Type': 'application/json',
});

const useApiLogin = () => {
  const [loginData, setLoginData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (payload) => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.post(`http://10.1.0.187:3003/api/auth/login`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoginData(response.data);
      toast('Login efetuado com sucesso!', {
        type: 'success',
      });
    } catch (error) {
      toast(error.message, {
        type: 'error',
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // const login = async (payload) => {
  //   setError(null);
  //   setLoading(true);
  //   try {
  //     const response = await axios.post(`http://10.1.0.187:3000/api/auth/login`, payload, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response && response.data) {
  //       // Defina o token e a sessão aqui após o login bem-sucedido
  //       localStorage.setItem('token', response.data.content.token); // Armazene o token
  //       localStorage.setItem('session', JSON.stringify(response.data.content.session)); // Armazene a sessão como JSON

  //       setLoginData(response.data);
  //       toast('Login efetuado com sucesso!', {
  //         type: 'success',
  //       });
  //     } else {
  //       // throw new Error('Resposta da API não contém dados válidos');
  //       toast("DEU ERRO", {
  //         type: 'error',
  //       });
  //     }
  //   } catch (error) {

  //     console.error('Erro durante o login:', error); 
  //     const errorMessage = error.response ? error.response.data.message : 'Ocorreu um erro durante o login';


  //     toast(errorMessage, {
  //       type: 'error',
  //     });
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return { loginData, error, loading, handlerSubmitLogin: (payload) => login(payload) };
};

const useApiRequestGet = (path, payload) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://10.1.0.187:3003/api${path}`, {
        data: payload,
        headers: configHeaders(),
      });
      setData(response.data.content);
    } catch (error) {
      toast(error.response.data.message, {
        type: 'error',
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, loading, refetchData: fetchData };
};



const useApiRequestSubmit = (method = 'post' | 'delete' | 'put', path, callback) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      const response = await axios({
        method,
        url: `http://10.1.0.187:3003/api${path}`,
      });

      setData(response.data);
      // window.location.reload()

      // Chame o callback após a conclusão bem-sucedida do POST ou PUT
      if (callback) {
        callback(response.data);
      }
      
    } catch (error) {
      toast(error.response.data.message, {
        type: 'error',
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, handleSubmitData: () => submit() };
};



export { useApiLogin, useApiRequestGet, useApiRequestSubmit, axiosApi }; 
