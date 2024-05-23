import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserApplications } from "../redux/actions/applicationsActions";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Button,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";
import ApplicationItem from "../components/applicationItem";
import Filters from "../components/filters";
import PaginationComp from "../components/paginationComp";
import ApplicationForm from "../components/applicationForm";

export default function Applications() {
  const dispatch = useDispatch();
  const id = localStorage.getItem('userId');
  const { error, loading, filteredApplications, userApplications } = useSelector(
    (state) => state.applications
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const itemsPerPage = 8;

  useEffect(() => {
    if (!userApplications) {
      dispatch(getUserApplications(id));
    }
  }, [dispatch, id]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditOpen = (application) => {
    setSelectedApplication(application);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedApplication(null);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleApplications = (filteredApplications ? filteredApplications : userApplications)?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box bgcolor="whitesmoke" padding={2}>
      <Container maxWidth="lg" sx={{ minHeight: "100vh", paddingBottom: 2 }}>
        <Grid container alignItems="center" spacing={2} marginBottom={2}>
          <Grid item xs={12} sm={8}>
            <Typography
              variant="h4"
              style={{ fontFamily: "Outfit, sans-serif", color: "#333333" }}
            >
              Mis Postulaciones
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
              >
                Agregar
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Filters />
        {loading && !filteredApplications && (
          <Box
            minHeight={200}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="whitesmoke"
          >
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Typography variant="body1" color="error">
            {error.message}
          </Typography>
        )}
        {visibleApplications?.length ? (
          <Box>
            {visibleApplications.map((application) => (
              <ApplicationItem key={application._id} application={application} onEdit={handleEditOpen} />
            ))}

            <PaginationComp
              totalItems={filteredApplications ? filteredApplications.length : userApplications.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </Box>
        ) : (
          ""
        )}
        {filteredApplications && !filteredApplications.length && !loading && (
          <Box
            minHeight={200}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="whitesmoke"
          >
            <Typography variant="h5" color="primary" fontFamily="Outfit, sansserif">
              No se encontraron resultados para los filtros aplicados
            </Typography>
          </Box>
        )}

        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>
            Crear Postulación
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <ApplicationForm handleClose={handleClose} />
          </DialogContent>
        </Dialog>

        <Dialog open={editOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
          <DialogTitle>
            Editar Postulación
            <IconButton
              aria-label="close"
              onClick={handleEditClose}
              sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <ApplicationForm handleClose={handleEditClose} initialData={selectedApplication} isEditMode={true} />
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}
