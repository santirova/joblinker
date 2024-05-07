import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserApplications } from "../redux/actions/applicationsActions";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Button,

} from "@mui/material";
import { Add as AddIcon, FilterAlt as FilterIcon } from "@mui/icons-material";
import ApplicationItem from "../components/applicationItem";

export default function Applications() {
  const dispatch = useDispatch();
  const id = "66105f2b85e75d4b48876abb";
  const { error, pending, userApplications } = useSelector(
    (state) => state.applications
  );

  useEffect(() => {
    dispatch(getUserApplications(id));
  }, [dispatch]);

  return (
    <Box bgcolor="#F5F5F5" padding="20px">
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginBottom="20px"
        >
          <Typography
            variant="h4"
            gutterBottom
            style={{ fontFamily: "Roboto Condensed, sans-serif", color: "#333333" }}
          >
            Mis Postulaciones
          </Typography>
          <Box display="flex">
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "10px" }}
              startIcon={<FilterIcon />}
            >
              Filtrar
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "10px" }}
              startIcon={<AddIcon />}
            >
              Agregar
            </Button>
          </Box>
        </Box>
        {pending && <CircularProgress />}
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
