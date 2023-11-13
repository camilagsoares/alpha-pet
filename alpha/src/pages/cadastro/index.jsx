import { useState } from 'react';
import { TextField, Button, Container, Grid, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

function Cadastro() {
  // const [session, setSession] = useState(JSON.parse(localStorage.getItem('session')) || null);

  // const criarSessao = (objectSession) => {
  //   localStorage.setItem('session', JSON.stringify(objectSession));
  //   setSession(objectSession);
  // };

  const [usemail, setUsemail] = useState('');
  const [ususers, setUsusers] = useState('');
  const [ussenha, setUssenha] = useState('');
  const [ustelefone, setUstelefone] = useState('');
  const [usmatricula, setUsmatricula] = useState('');
  const [usperfil, setUsperfil] = useState('');
  const [Departamento_id, setDepartamento_id] = useState('');

  // const recoveredSession = localStorage.getItem('session');
  // const { ususerss } = JSON.parse(recoveredSession);

  const handleSubmit = (e) => {
    e.preventDefault();

    // const formData = {
    //   usemail,
    //   ususers,
    //   ussenha,
    //   ustelefone,
    //   usmatricula,
    //   usperfil,
    //   Departamento_id,
    // };

    // api
    //   .post('users', formData)
    //   .then((res) => {
    //     console.log('Data saved successfully!', res);
    //   })
    //   .catch((error) => {
    //     console.error('Error saving data:', error);
    //   });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'usemail':
        setUsemail(value);
        break;
      case 'ususers':
        setUsusers(value);
        break;
      case 'ussenha':
        setUssenha(value);
        break;
      case 'ustelefone':
        setUstelefone(value);
        break;
      case 'usmatricula':
        setUsmatricula(value);
        break;
      case 'usperfil':
        setUsperfil(value);
        break;
      case 'Departamento_id':
        setDepartamento_id(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Typography component='h2' variant='h5' fontWeight={700} color='text.primary'>
        Cadastro
      </Typography>
      <Divider />
      <div>
        <Container style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          <Paper elevation={3} style={{ padding: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <form onSubmit={handleSubmit} autoComplete='off'>
              <Grid container spacing={2} justifyContent='center'>
                <Grid item xs={12}>
                  <TextField
                    label='Email'
                    type='email'
                    name='usemail'
                    value={usemail}
                    onChange={handleInputChange}
                    variant='outlined'
                    autoComplete='off'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='Nome de usuário'
                    type='text'
                    name='ususers'
                    value={ususers}
                    onChange={handleInputChange}
                    variant='outlined'
                    autoComplete='off'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='Senha'
                    type='password'
                    name='ussenha'
                    value={ussenha}
                    onChange={handleInputChange}
                    variant='outlined'
                    autoComplete='off'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='Telefone'
                    type='text'
                    name='ustelefone'
                    value={ustelefone}
                    onChange={handleInputChange}
                    variant='outlined'
                    autoComplete='off'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='Matricula'
                    type='text'
                    name='usmatricula'
                    value={usmatricula}
                    onChange={handleInputChange}
                    variant='outlined'
                    autoComplete='off'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='Perfil'
                    type='text'
                    name='usperfil'
                    value={usperfil}
                    onChange={handleInputChange}
                    variant='outlined'
                    autoComplete='off'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='Departamento ID'
                    type='text'
                    name='Departamento_id'
                    value={Departamento_id}
                    onChange={handleInputChange}
                    variant='outlined'
                    autoComplete='off'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant='contained' size='medium' type='submit' fullWidth>
                    Criar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </div>
    </div>
  );
}

export default Cadastro;
