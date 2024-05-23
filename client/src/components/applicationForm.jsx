import { Autocomplete, Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, Chip } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { postApplication } from "../redux/actions/applicationsActions"; 

const ApplicationForm = ({ handleClose, initialData = null, isEditMode = false }) => {
  const userId = localStorage.getItem('userId');
  const dispatch = useDispatch();
  const { postError, loading } = useSelector((state) => state.applications);
  const [formData, setFormData] = useState({
    link: "",
    origin: "",
    position: "",
    technologies: [],
    company: "",
    note: "",
    level: "",
    status: ""
  });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleTechnologiesChange = (event, value) => {
    setFormData((prevData) => ({
      ...prevData,
      technologies: value
    }));
  };

  const validateForm = () => {
    const { link, origin, position, technologies, company, level } = formData;
    if (link && origin && position && technologies.length && company && level) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleFormSubmit = async (e) => {
    setIsValid(false);
    e.preventDefault();
    const data = {
      id: userId,
      formData
    };
    if (isEditMode) {
      console.log(data)
      // await dispatch(updateApplication({ id: initialData._id, data })).unwrap();
    } else {
      delete data.formData.status
      await dispatch(postApplication(data)).unwrap();
    }

    setFormData({
      link: "",
      origin: "",
      position: "",
      technologies: [],
      company: "",
      note: "",
      level: "",
      status: ""
    });

    handleClose();
  };

  const techOptions = [
    "JavaScript", "Python", "Java", "C#", "PHP", "C++", "TypeScript", "Ruby", "Swift", "Kotlin",
    "React", "Angular", "Vue.js", "Node.js", "Express.js", "Django", "Flask", "Spring Boot", "ASP.NET",
    "jQuery", "Bootstrap", "Tailwind CSS", "Sass", "Less", "MySQL", "PostgreSQL", "MongoDB", "SQLite", "Firebase"
  ];

  return (
    <Box p={2}>
      <Container maxWidth="lg">
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="link"
                label="Enlace"
                variant="outlined"
                fullWidth
                value={formData.link}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Origen</InputLabel>
                <Select
                  name="origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                  label="Origen"
                >
                  <MenuItem value="Linkedin">Linkedin</MenuItem>
                  <MenuItem value="Indeed">Indeed</MenuItem>
                  <MenuItem value="getOnboard">getOnboard</MenuItem>
                  <MenuItem value="glassdoor">glassdoor</MenuItem>
                  <MenuItem value="computrabajo">computrabajo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Posición</InputLabel>
                <Select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  label="Posición"
                >
                  <MenuItem value="Backend">Backend</MenuItem>
                  <MenuItem value="Fullstack">Fullstack</MenuItem>
                  <MenuItem value="Frontend">Frontend</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                multiple
                name="technologies"
                options={techOptions}
                getOptionLabel={(option) => option}
                value={formData.technologies}
                onChange={handleTechnologiesChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tecnologías"
                    variant="outlined"
                    fullWidth
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => {
                    // eslint-disable-next-line no-unused-vars
                    const { key, ...tagProps } = getTagProps({ index });
                    return <Chip key={index} label={option} {...tagProps} />;
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="company"
                label="Compañía"
                variant="outlined"
                fullWidth
                value={formData.company}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="note"
                label="Nota"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={formData.note}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Nivel</InputLabel>
                <Select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  label="Nivel"
                >
                  <MenuItem value="Junior">Junior</MenuItem>
                  <MenuItem value="Semisenior">Semisenior</MenuItem>
                  <MenuItem value="Senior">Senior</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {isEditMode && (
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Estado</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    label="Estado"
                  >
                    <MenuItem value="Pendiente">Pendiente</MenuItem>
                    <MenuItem value="Entrevista">Entrevista</MenuItem>
                    <MenuItem value="Ofrecido">Ofrecido</MenuItem>
                    <MenuItem value="Rechazado">Rechazado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" disabled={!isValid}>{loading ? "Enviando" : isEditMode ? "Guardar Cambios" : "Enviar"}</Button>
            </Grid>
          </Grid>
        </form>
        {postError && (
          <Typography variant="body2" color="error" style={{ marginTop: '16px' }}>
            {postError}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default ApplicationForm;
