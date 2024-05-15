import { ArrowBack } from "@mui/icons-material";
import { Autocomplete, Box, Button, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip, Typography, Chip } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getUserApplications, postApplication } from "../redux/actions/applicationsActions";

const ApplicationForm = () => {
  const userId = localStorage.getItem('userId');
  const dispatch = useDispatch();
  const { postError, loading, userApplications } = useSelector((state) => state.applications);
  const [formData, setFormData] = useState({
    link: "",
    origin: "",
    position: "",
    technologies: [],
    company: "",
    note: "",
    level: ""
  });
  const [isValid, setIsValid] = useState(false);

  useEffect(()=>{
    if (!userApplications) {
      dispatch(getUserApplications(userId))
    }
  },[userApplications])

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
    const { link, origin, position, technologies, company, note, level } = formData;
    if (link && origin && position && technologies.length && company && note && level) {
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
    console.log(data);
    await dispatch(postApplication(data)).unwrap();

    // Limpia los campos después de enviar la solicitud
    setFormData({
      link: "",
      origin: "",
      position: "",
      technologies: [],
      company: "",
      note: "",
      level: ""
    });
    
  };

  // Opciones para el select de tecnologías
  const techOptions = [
    "JavaScript", "Python", "Java", "C#", "PHP", "C++", "TypeScript", "Ruby", "Swift", "Kotlin",
    "React", "Angular", "Vue.js", "Node.js", "Express.js", "Django", "Flask", "Spring Boot", "ASP.NET",
    "jQuery", "Bootstrap", "Tailwind CSS", "Sass", "Less", "MySQL", "PostgreSQL", "MongoDB", "SQLite", "Firebase"
  ];

  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/home/postulaciones');
  };

  return (
    <Box bgcolor="whitesmoke" p={2}>
      <Container maxWidth="lg">
        <Box pb={2} display="flex" alignItems="center" justifyContent="start">
          <Tooltip title="Volver">
            <IconButton sx={{ marginRight: 2 }} onClick={handleBack}>
              <ArrowBack />
            </IconButton>
          </Tooltip>
          <Typography variant="h4" fontFamily="Outfit, sans-serif">Crear Postulación</Typography>
        </Box>
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
                  <MenuItem value="Trainee">Trainee</MenuItem>
                  <MenuItem value="Junior">Junior</MenuItem>
                  <MenuItem value="Semisenior">Semisenior</MenuItem>
                  <MenuItem value="Senior">Senior</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" disabled={!isValid}>{loading ? "Enviando" : "Enviar"}</Button>
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
