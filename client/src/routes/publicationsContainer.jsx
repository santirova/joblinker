import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Publication from "../components/publication";
import { getPublications } from "../redux/actions/publicationsAcction";

export default function PublicationsContainer() {
  const dispatch = useDispatch();
  const { publications } = useSelector((state) => state.publications);

  useEffect(() => {
    if (!publications) {
      dispatch(getPublications());
    }
  }, [publications, dispatch]);

  return (
    <Box bgcolor="#F5F5F5" padding={2}>
      <Container maxWidth="lg">
        <Grid container justifyContent="space-between" alignItems="center" marginBottom={2}>
          <Grid item>
            <Typography variant="h4" style={{ fontFamily: "Outfit, sans-serif", color: "#333333" }}>
              Publicaciones
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
              Crear
            </Button>
          </Grid>
        </Grid>
        {publications &&
          publications.map((publication) => (
            <Publication key={publication._id} publication={publication} />
          ))}
      </Container>
    </Box>
  );
}
