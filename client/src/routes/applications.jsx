import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getUserApplications } from "../redux/actions/applicationsActions";
import {
  Container,
  Typography,
  CircularProgress,
  Button,
  Modal,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Divider,
  
} from '@mui/material';
import ApplicationItem from "../components/applicationItem";


export default function Applications() {
  const dispatch = useDispatch();
  const id = "66105f2b85e75d4b48876abb";
  const { error, pending, userApplications } = useSelector((state) => state.applications);
  const [openFilter, setOpenFilter] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    position: "",
    origin: "",
    level: ""
  });

  useEffect(() => {
    dispatch(getUserApplications(id));
  }, [dispatch]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterOptions({ ...filterOptions, [name]: value });
  };

  const handleFilterApply = () => {
    // Aquí se aplicaría la lógica de filtrado
    setOpenFilter(false);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Mis Postulaciones
      </Typography>
      <Box marginBottom={2}>
        <Button onClick={() => setOpenFilter(true)} variant="outlined">Filtrar y Ordenar</Button>
      </Box>
      {pending && <CircularProgress />}
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      {userApplications && userApplications.map(application => (
        <ApplicationItem key={application._id} application={application} />
      ))}
      <Modal open={openFilter} onClose={() => setOpenFilter(false)}>
        <Container maxWidth="sm" style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>Filtrar y Ordenar</Typography>
          <Divider />
          <Box marginTop={2}>
            <FormControl fullWidth>
              <InputLabel id="position-label">Position</InputLabel>
              <Select
                labelId="position-label"
                id="position"
                name="position"
                value={filterOptions.position}
                onChange={handleFilterChange}
              >
                <MenuItem value="">Todas</MenuItem>
                <MenuItem value="Full Stack Developer">Full Stack Developer</MenuItem>
                <MenuItem value="Frontend Developer">Frontend Developer</MenuItem>
                {/* Otros valores posibles */}
              </Select>
            </FormControl>
          </Box>
          {/* Agregar más filtros aquí */}
          <Box marginTop={2}>
            <Button onClick={handleFilterApply} variant="contained" color="primary">Aplicar Filtros</Button>
          </Box>
        </Container>
      </Modal>
    </Container>
  );
}
