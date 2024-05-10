import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPublications } from "../redux/actions/publicationsAcction";

export default function Publications() {

  const dispatch = useDispatch()
  const { publications } = useSelector((state)=> state.publications)
  useEffect(()=>{
    if (!publications) {
      dispatch(getPublications())
    }
  },[publications])
  return (
    <Box bgcolor="#F5F5F5" padding={2}>
      <Container maxWidth="lg">
        <Grid container alignItems="center" spacing={2} marginBottom={2}>
          <Grid item xs={20} sm={8}>
            <Typography
              variant="h4"
              style={{ fontFamily: "Outfit, sans-serif", color: "#333333" }}
            >
              Publicaciones
            </Typography>
          </Grid>
          <Grid item xs={201} sm={4}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
              >
                Crear
              </Button>
            </Box>
          </Grid>
        </Grid>
        </Container>
      </Box>
  )
}
