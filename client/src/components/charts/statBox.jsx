import { Typography, Paper } from "@mui/material";

export default function StatBox({ title, subtitle, backgroundColor }) {
  return (
    <Paper
      sx={{
        padding: 2,
        borderRadius: 2,
        backgroundColor,
        color: "#FFF",
        textAlign: "center",
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="h4" fontWeight="bold">
        {subtitle}
      </Typography>
    </Paper>
  );
}
