import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Link,
} from "@mui/material";

const ApplicationItem = ({ application }) => {
  const [showDetail, setShowDetail] = useState(false);

  const handleToggleDetail = () => {
    setShowDetail(!showDetail);
  };

  const renderDetailInfo = () => {
    if (showDetail) {
      return (
        <>
          <Box marginBottom={1}>
            <Typography variant="body2">
              <span style={{ fontWeight: 600 }}>Fecha de Creación:</span>{" "}
              {new Date(application.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
          <Box marginBottom={1}>
            <Typography variant="body2" gutterBottom>
              <span style={{ fontWeight: 600 }}>Enlace:</span>{" "}
              <Link
                href={application.link}
                target="_blank"
                rel="noopener noreferrer"
                underline="always"
                color="primary"
              >
                {application.link}
              </Link>
            </Typography>
          </Box>
          <Box marginBottom={1}>
            <Typography variant="body2" gutterBottom>
              <span style={{ fontWeight: 600 }}>Contacto:</span>{" "}
              {application.contact || "No proporcionado"}
            </Typography>
          </Box>
          <Box marginBottom={1}>
            <Typography variant="body2" gutterBottom>
              <span style={{ fontWeight: 600 }}>Estado:</span>{" "}
              {application.status}
            </Typography>
          </Box>
          <Box marginBottom={1}>
            <Typography variant="body2" gutterBottom>
              <span style={{ fontWeight: 600 }}>Tecnologías:</span>{" "}
              {application.technologies.join(", ")}
            </Typography>
          </Box>
          <Box marginBottom={1}>
            <Typography variant="body2" gutterBottom>
              <span style={{ fontWeight: 600 }}>Nivel:</span>{" "}
              {application.level}
            </Typography>
          </Box>
          <Box marginBottom={1}>
            <Typography variant="body2" gutterBottom>
              <span style={{ fontWeight: 600 }}>Nota:</span>{" "}
              {application.note || "Sin nota"}
            </Typography>
          </Box>
          <Box
            marginTop={2}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button onClick={handleToggleDetail} variant="outlined" size="small">
              Cerrar Detalles
            </Button>
          </Box>
        </>
      );
    }
    return null;
  };

  return (
    <>
      <Box
        border="1px solid #ccc"
        borderRadius={4}
        padding={2}
        marginBottom={2}
        boxShadow={1}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Box marginBottom={0.5}>
              <Typography color="primary" variant="h5" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {application.position}
              </Typography>
            </Box>
            <Box marginBottom={0.5}>
              <Typography variant="h6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {application.company}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} textAlign="right">
            {!showDetail && <Button onClick={handleToggleDetail} variant="outlined" size="small">
              Ver Detalles
            </Button>}
          </Grid>
        </Grid>
        {renderDetailInfo()}
      </Box>
    </>
  );
};

export default ApplicationItem;
