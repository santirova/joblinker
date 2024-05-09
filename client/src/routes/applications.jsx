import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserApplications } from "../redux/actions/applicationsActions";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Button,
  Grid
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import ApplicationItem from "../components/applicationItem";
import Filters from "../components/filter";

export default function Applications() {
  const dispatch = useDispatch();
  const id = localStorage.getItem('userId')
  const { error, loading, userApplications } = useSelector(
    (state) => state.applications
  );

  useEffect(() => {
    if (!userApplications) {
      dispatch(getUserApplications(id));
    }
    
  }, [dispatch]);

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
        {userApplications &&
          userApplications.map((application) => (
            <ApplicationItem
              key={application._id}
              application={application}
            />
          ))}
      </Container>
    </Box>
  );
}
