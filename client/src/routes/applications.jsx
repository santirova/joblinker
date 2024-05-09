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
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import ApplicationItem from "../components/applicationItem";
import Filters from "../components/filter";
import PaginationComp from "../components/paginationComp";

export default function Applications() {
  const dispatch = useDispatch();
  const id = localStorage.getItem('userId')
  const { error, loading, userApplications } = useSelector(
    (state) => state.applications
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    if (!userApplications) {
      dispatch(getUserApplications(id));
    }  
  }, [dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    };
    
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleApplications = userApplications?.slice(startIndex, startIndex + itemsPerPage);
  
  return (
    <Box bgcolor="#F5F5F5" padding={2}>
      <Container maxWidth="lg">
        <Grid container alignItems="center" spacing={2} marginBottom={2}>
          <Grid item xs={20} sm={8}>
            <Typography
              variant="h4"
              style={{ fontFamily: "Outfit, sans-serif", color: "#333333" }}
            >
              Mis Postulaciones
            </Typography>
          </Grid>
          <Grid item xs={201} sm={4}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
              >
                Agregar
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Filters/>
        <Box sx={{ height: "100", width: '100%' }}>
          {loading && <CircularProgress />}
        </Box>
        {error && (
          <Typography variant="body1" color="error">
            {error.message}
          </Typography>
        )}
        {visibleApplications &&
          visibleApplications.map((application) => (
            <ApplicationItem
              key={application._id}
              application={application}
            />
          ))}
          {visibleApplications &&
            <PaginationComp
            totalItems={userApplications?.length || 0}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          }
          {
            !userApplications?.length &&
            <Box display="flex" alignItems="center" justifyContent="center">
              <Typography variant="h5" color="primart" fontFamily="Outfit, sansserif">
                Todavia no tienes postulaciones
              </Typography>
            </Box>
          }
        
      </Container>
    </Box>
  );
}
