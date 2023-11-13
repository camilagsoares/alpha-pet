import React, { useState, useEffect, useContext } from "react";
import { Box, Button } from "@mui/material";
import Papa from 'papaparse';
import { AuthContext } from "../contexts/auth.context";

const DownloadTable = () => {
  const { session, token } = useContext(AuthContext);

  const handleDownload = () => {
    const savedData = localStorage.getItem('projetosData');

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      let teste = 'Simas'
      let teste1 = 'Renan'

      // const formattedData = parsedData.map(item => [
      //   item.idSonner,
      //   item.titulo,
      //   item.descricao,
      //   item.observacao,
      //   item.valor,
      //   item.tipoProjetoId

      //   // Adicione para as outras colunas
      // ]);

      const replaceSemicolon = (str) => {
        if (typeof str === 'string') {
          return str.replace(/;/g, '/');
        }
        return str;
      };

      const IDsonner = parsedData.map(item => item.idSonner);
      const Titulo = parsedData.map(item => item.titulo);
      const Descricao = parsedData.map(item => replaceSemicolon(item.descricao));
      const Observacao = parsedData.map(item => replaceSemicolon(item.observacao));
      const Valor = parsedData.map(item => item.valor);
      const TipoProjeto = parsedData.map(item => {
        switch (item.tipoProjetoId) {
          case 1:
            return 'Solicitação Comum	';
          case 2:
            return 'Abertura de Registro de Preço	';
          case 3:
            return 'Solicitação de Ata	';
          case 4:
            return 'Solicitação de Credenciamento	'
          case 5:
            return 'Solicitação de Contrato	'
          case 6:
            return 'Solicitação de Pré-aditamento'
          default:
            return '';
        }
      });
      const Departamento = parsedData.map(item => item.etapa.length > 0 ? item.etapa[0].departamento.nome : 'sem departamento')


      const prioridade = parsedData.map(item => item.prioridadeProjeto ? 'ALTA' : 'NORMAL');

      const pessoa = parsedData.map(item => item.usuario.nome);

      const converterHora = (hora) => {
        const data = new Date(hora);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
        const segundos = String(data.getSeconds()).padStart(2, '0');

        return `${dia}-${mes}-${ano}`
      };
      const Hora = parsedData.map(item => item.criadoEm);
      const HoraFormatada = Hora.map(hora => converterHora(hora));


      const relatorio = parsedData.map((item, index) => [
        IDsonner[index],
        HoraFormatada[index],
        pessoa[index],
        Departamento[index],
        Titulo[index],
        Descricao[index],
        Observacao[index],
        Valor[index],
        TipoProjeto[index],
        prioridade[index],
      ]);

      const headers = ['IDsonner', 'Criado Em', 'Criado Por', 'Departamento', 'Titulo', 'Descricao', 'Observacao', 'Valor', 'TipoProjeto', 'Prioridade'];
      relatorio.unshift(headers);

      const csvRows = relatorio.map(row => row.join(';'));
      const csvContent = csvRows.join('\n');

      const blob = new Blob(["\ufeff", csvContent], { type: 'text/csv;charset=utf-8;' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Relatório - Workflow de PABS.csv';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);




    } else {
      console.error('Não há dados para baixar.');
    }


  };

  const downloadLici = () => {
    const savedData = localStorage.getItem('licitatorioData');
    console.log('Licitatorio', savedData)
    const parsedData = JSON.parse(savedData);

    const IDsonner = parsedData.map(item => item.idSonner);
    const Titulo = parsedData.map(item => item.titulo);
    const Departamento = parsedData.map(item => item.etapa.length > 0 ? item.etapa[0].departamento.nome : 'sem departamento')
    const converterHora = (hora) => {
      const data = new Date(hora);
      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();
      const horas = String(data.getHours()).padStart(2, '0');
      const minutos = String(data.getMinutes()).padStart(2, '0');
      const segundos = String(data.getSeconds()).padStart(2, '0');

      return `${dia}-${mes}-${ano}`
    };
    const Hora = parsedData.map(item => item.criadoEm);
    const HoraFormatada = Hora.map(hora => converterHora(hora));



    const relatorio = parsedData.map((item, index) => [
      IDsonner[index],
      Titulo[index],
      Departamento[index],
      HoraFormatada[index]
    ]);

    const headers = ['IDsonner', 'Titulo', 'Departamento', 'Criado em']

    relatorio.unshift(headers);

    const csvRows = relatorio.map(row => row.join(';'));
    const csvContent = csvRows.join('\n');

    const blob = new Blob(["\ufeff", csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Relatório Licitações - Workflow de PABS.csv';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);


  }


  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
      <Button variant="contained" onClick={handleDownload}>
        Relatório Solitações
      </Button>
      {session && (session.permissao.id === 1 || session.permissao.id === 2) && session.permissao.id !== undefined && (
        <>
          <Button variant="contained" onClick={downloadLici}>
            Relatório Licitações
          </Button>
        </>
      )}


    </Box>
  );

};

export default DownloadTable;
