import {
    Box,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
  } from "@mui/material";
  import { useState } from "react";
  
  const Filters = () => {
    const [selectedLevels, setSelectedLevels] = useState([]);
    const [selectedPositions, setSelectedPositions] = useState([]);
    const [orderBy, setOrderBy] = useState("Nuevo a viejo");
  
    return (
      <Box marginBottom={2}>
        <Divider textAlign="center">Filtros y ordenamientos</Divider>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}> 
            <FormControl fullWidth>
              <InputLabel id="level-select-label">Nivel</InputLabel>
              <Select
                labelId="level-select-label"
                id="level-select"
                multiple
                value={selectedLevels}
                onChange={(e) => setSelectedLevels(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                {["Senior", "Semisenior", "Junior"].map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth> 
              <InputLabel id="position-select-label">Posición</InputLabel>
              <Select
                labelId="position-select-label"
                id="position-select"
                multiple
                value={selectedPositions}
                onChange={(e) => setSelectedPositions(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                {[
                  "Backend",
                  "Frontend",
                  "Fullstack",
                  "Diseño UX/UI",
                ].map((position) => (
                  <MenuItem key={position} value={position}>
                    {position}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}> 
            <FormControl fullWidth> 
              <InputLabel id="order-by-select-label">Ordenar por</InputLabel>
              <Select
                labelId="order-by-select-label"
                id="order-by-select"
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
              >
                {[
                  "Nuevo a viejo",
                  "Viejo a nuevo",
                  "De la A - Z (por empresa)",
                  "De la Z - A (por empresa)",
                ].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Divider />
      </Box>
    );
  };
  
  export default Filters;
  