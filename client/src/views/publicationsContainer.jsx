import { Box, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Publication from "../components/publication";
import { getPublications } from "../redux/actions/publicationsAcction";
import CreatePublication from "../components/createPublication";

export default function PublicationsContainer() {
  const dispatch = useDispatch();
  const { publications, loading } = useSelector((state) => state.publications);

  useEffect(() => {
    if (publications.length === 0) {
      dispatch(getPublications());
    }
  }, [dispatch, publications.length]);

  return (
    <Box bgcolor="whitesmoke" padding={2} overflow="hidden" minHeight="100vh">
      <Container maxWidth="lg" style={{minHeight:"100vh"}}>
        <Box display="flex" alignItems="start" mb={2}>
          <Typography
            variant="h4"
            style={{ fontFamily: "Outfit, sans-serif", color: "#333333" }}
          >
            Publicaciones
          </Typography>
        </Box>
        <Grid container justifyContent="center" marginBottom={2}>
          <Grid item xs={12}>
            <CreatePublication />
          </Grid>
        </Grid>
        {
          loading && 
            <Box minHeight="100%" display="flex" alignItems="center" justifyContent="center" bgcolor="whitesmoke">
              <CircularProgress />
            </Box>
        }
        {publications &&
          publications.map((publication) => (
            <Publication key={publication._id} publication={publication} />
          ))}
      </Container>
    </Box>
  );
}
