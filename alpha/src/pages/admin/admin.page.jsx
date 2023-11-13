import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

const AdminPage = () => {
  return (
    <Box>
      <Typography component='h2' variant='h5' fontWeight={700}>
        Administração
      </Typography>
      <Typography>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas obcaecati eum, non deserunt beatae, doloremque
        cum consequatur Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas obcaecati eum, non deserunt
        beatae, doloremque cum consequatur incidunt laboriosam sint ipsam numquam amet dicta quibusdam impedit tempora
        laudantium ad debitis.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas obcaecati eum, non deserunt
        beatae, doloremque cum consequatur incidunt laboriosam sint ipsam numquam amet dicta quibusdam impedit tempora
        laudantium ad debitis.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas obcaecati eum, non deserunt
        beatae, doloremque cum consequatur incidunt laboriosam sint ipsam numquam amet dicta quibusdam impedit tempora
        laudantium ad debitis.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas obcaecati eum, non deserunt
        beatae, doloremque cum consequatur incidunt laboriosam sint ipsam numquam amet dicta quibusdam impedit tempora
        laudantium ad debitis. incidunt laboriosam sint ipsam numquam amet dicta quibusdam impedit tempora laudantium ad
        debitis.
      </Typography>
    </Box>
  );
};

AdminPage.propTypes = {
  changeTheme: PropTypes.func.isRequired,
};

export default AdminPage;
