import { Box, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, filterApplications, clearFilters } from "../redux/slices/applicationsSlice";
import { useEffect } from "react";

const Filters = () => {
    const dispatch = useDispatch();
    const { filters } = useSelector((state) => state.applications);
    const { selectedLevel, selectedPosition, orderBy } = filters;

    useEffect(() => {
        dispatch(filterApplications());
    }, [filters, dispatch]);

    const handleLevelChange = (event) => {
        const value = event.target.value;
        dispatch(setFilters({ ...filters, selectedLevel: value }));
    };

    const handlePositionChange = (event) => {
        const value = event.target.value;
        dispatch(setFilters({ ...filters, selectedPosition: value }));
    };

    const handleOrderByChange = (event) => {
        const value = event.target.value;
        dispatch(setFilters({ ...filters, orderBy: value }));
    };

    const handleClearFilters = () => {
        dispatch(clearFilters());
    };

    return (
        <Box marginBottom={2}>
            <Divider textAlign="center">Filtros y ordenamientos</Divider>
            <Grid mb={2} container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                        <InputLabel id="level-select-label">Nivel</InputLabel>
                        <Select
                            labelId="level-select-label"
                            id="level-select"
                            value={selectedLevel}
                            onChange={handleLevelChange}
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
                            value={selectedPosition}
                            onChange={handlePositionChange}
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
                            onChange={handleOrderByChange}
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
                {selectedLevel != "" || selectedPosition !=="" ?
                  <Grid mb={2} item xs={12} md={12} textAlign="right">
                    <Button onClick={handleClearFilters} variant="outlined" color="error" >
                        Eliminar filtros
                    </Button>
                </Grid>
                :
                ""
                }
            </Grid>
            <Divider />
        </Box>
    );
};

export default Filters;
