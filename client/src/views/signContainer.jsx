// Sign.js
import { Container, Typography, Box } from '@mui/material';
import { containerForm } from '../styles/formStyles';

export default function Sign({ component }) {
  return (
    <Container maxWidth="100%" style={containerForm}>
      <Box textAlign="center">
        <Typography variant="h3" color="primary" fontWeight="bold" fontFamily= 'Outfit, sans-serif'>
          JobLinker
        </Typography>
      </Box>
      {component}
    </Container>
  );
}
