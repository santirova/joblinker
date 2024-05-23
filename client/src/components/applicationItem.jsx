import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Link,
  Collapse,
  Divider,
  IconButton,
} from "@mui/material";
import { ExpandMore, ExpandLess, Edit as EditIcon } from "@mui/icons-material";

const ApplicationItem = ({ application, onEdit }) => {
  const [showDetail, setShowDetail] = useState(false);

  const handleToggleDetail = () => {
    setShowDetail(!showDetail);
  };

  const handleEditClick = () => {
    onEdit(application);
  };

  return (
    <Box
      border="1px solid #e0e0e0"
      borderRadius={4}
      padding={2}
      marginBottom={2}
      boxShadow={3}
      sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Typography color="primary" variant="h6" sx={{ fontFamily: 'Outfit, sans-serif' }}>
            {application.position}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" sx={{ fontFamily: 'Outfit, sans-serif' }}>
            {application.company}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} textAlign="right">
          <IconButton color="primary" onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
          <Button
            onClick={handleToggleDetail}
            variant="outlined"
            size="small"
            endIcon={showDetail ? <ExpandLess /> : <ExpandMore />}
          >
            {showDetail ? 'Cerrar Detalles' : 'Ver Detalles'}
          </Button>
        </Grid>
      </Grid>
      <Collapse in={showDetail} timeout="auto" unmountOnExit>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ mt: 2 }}>
          <Box marginBottom={1}>
            <Typography variant="body2">
              <span style={{ fontWeight: 600 }}>Fecha de Creación:</span>{" "}
              {new Date(application.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
          <Box marginBottom={1}>
            <Typography variant="body2">
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
            <Typography variant="body2">
              <span style={{ fontWeight: 600 }}>Contacto:</span>{" "}
              {application.contact || "No proporcionado"}
            </Typography>
          </Box>
          <Box marginBottom={1}>
            <Typography variant="body2">
              <span style={{ fontWeight: 600 }}>Estado:</span>{" "}
              {application.status}
            </Typography>
          </Box>
          <Box marginBottom={1}>
            <Typography variant="body2">
              <span style={{ fontWeight: 600 }}>Tecnologías:</span>{" "}
              {application.technologies.join(", ")}
            </Typography>
          </Box>
          <Box marginBottom={1}>
            <Typography variant="body2">
              <span style={{ fontWeight: 600 }}>Nivel:</span>{" "}
              {application.level}
            </Typography>
          </Box>
          <Box marginBottom={1}>
            <Typography variant="body2">
              <span style={{ fontWeight: 600 }}>Nota:</span>{" "}
              {application.note || "Sin nota"}
            </Typography>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default ApplicationItem;
