import { Box, Typography } from "@mui/material";


export default function StatBox({title,subtitle}) {
  return (
    <Box width="100%" m="0 30px" border="solid 1">
        <Box display="flex" justifyContent="space-between">
            <Box >
                <Typography
                    variant="h4"
                    fontWeight="bold"
                >
                    {title}
                </Typography>
            </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
            <Box >
                <Typography
                    variant="h5"
                    fontWeight="bold"
                >
                    {subtitle}
                </Typography>
            </Box>
        </Box>
        
    </Box>
  )
}
