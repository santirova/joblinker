import { useState } from 'react';
import { Typography, Grid, Button, Modal, IconButton } from '@mui/material';
import { Mail, Phone } from '@mui/icons-material';

const ApplicationItem = ({ application }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">{application.position}</Typography>
          <Typography variant="body1">{application.company}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} textAlign="right">
          <Button onClick={handleOpen} variant="outlined" size="small">Ver Detalles</Button>
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <div style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>Detalles de la Postulación</Typography>
          <Typography variant="body1" gutterBottom>Enlace: {application.link}</Typography>
          <Typography variant="body1" gutterBottom>Contacto: {application.contact}</Typography>
          <Typography variant="body1" gutterBottom>Estado: {application.status}</Typography>
          {/* Otros detalles aquí */}
          <IconButton href={`mailto:${application.contact}`}><Mail /></IconButton>
          <IconButton href={`tel:${application.contact}`}><Phone /></IconButton>
          <Button onClick={handleClose} variant="contained" color="primary">Cerrar</Button>
        </div>
      </Modal>
    </div>
  );
};

export default ApplicationItem;
