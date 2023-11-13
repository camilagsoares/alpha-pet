import React, { useEffect, useMemo } from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { useReducer } from 'react';
// import { useTable, usePagination } from 'react-table';
import { useApiRequestGet,useApiRequestSubmit } from '../../services/api';


const Teste = () => {
    const [data, setData] = useState([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
    const [names, setNames] = useState([]);
    const [userData, setUserData] = useState({
        nome: '',
        email: '',
        senha: '',
        telefone: '',
        matricula: 355,
        permissaoId: 1,
        departamentoId: 1,
    });
    const [usuarios, setUsuarios] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };


    useEffect(() => {
        // Fazer a chamada GET para buscar os dados
        axios.get('http://10.1.0.187:3000/api/auth/usuarios')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Erro na requisição GET:', error);
            });
    }, []);




    // Exemplo de requisição POST
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log('Dados que serão enviados para a API:', userData);

    //     axios.post('http://10.1.0.187:3000/api/auth/usuarios', userData)
    //         .then(response => {
    //             console.log('Usuário adicionado com sucesso:', response.data);
    //             // Atualize a lista de usuários após o POST
    //             axios.get('http://10.1.0.187:3000/api/auth/usuarios')
    //                 .then(response => {
    //                     setData(response.data);
    //                 })
    //                 .catch(error => {
    //                     console.error('Erro na requisição GET:', error);
    //                 });
    //         })
    //         .catch(error => {
    //             console.error('Erro ao adicionar usuário:', error);
    //         });
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Dados que serão enviados para a API:', userData);
    
        try {
            const response1 = await axios.post('http://10.1.0.187:3000/api/auth/usuarios', userData);
            console.log('Usuário adicionado com sucesso:', response1.data);
    
            const response2 = await axios.get('http://10.1.0.187:3000/api/auth/usuarios');
            setData(response2.data);
    
            // Após atualizar os dados, chame forceUpdate para forçar a atualização do componente
            forceUpdate();
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
        }
    };


    //teste simultaneo
    const { data: fetchData, loading: getLoading } = useApiRequestGet('/projetos');
    const { data: submitData, loading: submitLoading, handleSubmitData } = useApiRequestSubmit('put', `/projetos/1`);

    // Atualiza o estado do useApiRequestGet após um PUT bem-sucedido
    useEffect(() => {
      if (!submitLoading && submitData) {
        fetchData(); // Recarrega os dados do GET após o PUT
      }
    }, [submitLoading, submitData]);
  
    const handleCriarSecretaria = (data) => {
      setLoading(true);
      const updatedData = { ...data }; // Faça as modificações necessárias
      updatedData.prioridadeProjeto = !projetoSelecionado.prioridadeProjeto; // Exemplo de modificação
  
      // Chame a função de submissão
      handleSubmitData(updatedData);
    };
    return (
        // <div>
        //     <pre>{JSON.stringify(data, null, 2)}</pre>

        // </div>
        <div>
       
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}



            {getLoading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {fetchData && fetchData.map((projeto) => (
            <li key={projeto.idSonner}>
              {projeto.titulo}
            </li>
          ))}
        </ul>
      )}
        </div>
    );
};

Teste.propTypes = {
    //   changeTheme: PropTypes.func.isRequired,
};

export default Teste;
// ModalAtualizarEtapasProjeto


// quando o status for retorno mas aparece para o usuario,para quem abriu a solicitacao,nunca para o compras