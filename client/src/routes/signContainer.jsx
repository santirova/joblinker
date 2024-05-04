import { Container } from '@mui/material';
import { containerForm } from '../styles/formStyles';

export default function Sign( {component} ) {
    return (
        <Container 
            maxWidth="lg" 
            style={containerForm}
        >
            { component }
        </Container>
    );
}
