import { Box, Typography } from "@mui/material";

export default function ProfileInfo({ user }) {
  return (
    <Box>
      <Typography variant="body1">
        <strong>Correo electrónico:</strong> {user?.email}
      </Typography>
      <Typography variant="body1" mt={1}>
        <strong>Teléfono:</strong> {user?.phone}
      </Typography>
      <Typography variant="body1" mt={1}>
        <strong>Cuenta creada el:</strong> {new Date(user?.creatAt).toLocaleDateString()}
      </Typography>
    </Box>
  );
}
