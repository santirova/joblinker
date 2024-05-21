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
import { NavLink } from "react-router-dom";

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
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    };
    
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleApplications = userApplications?.slice(startIndex, startIndex + itemsPerPage);
  
  return (
    <Box bgcolor="whitesmoke" padding={2} >
      <Container maxWidth="md" sx={{ minHeight:400, paddingBottom:2}} >
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
                component={NavLink}
                to="agregar"
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
        {loading && <Box minHeight={200} display="flex" alignItems="center" justifyContent="center" bgcolor="whitesmoke">
          <CircularProgress />
        </Box>}
        {error && (
          <Typography variant="body1" color="error">
            {error.message}
          </Typography>
        )}
        {visibleApplications?.length ?
          <Box>
            {visibleApplications.map((application) => (
              <ApplicationItem
                key={application._id}
                application={application}
              />
            ))}

            <PaginationComp
              totalItems={userApplications?.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </Box>
          :
          ""
        }
          {
            !userApplications?.length && !loading &&
            <Box minHeight={200} display="flex" alignItems="center" justifyContent="center" bgcolor="whitesmoke">
              <Typography variant="h5" color="primary" fontFamily="Outfit, sansserif">
                Todavia no tienes postulaciones
              </Typography>
            </Box>
          }
        
      </Container>

    </Box>
  );
}
