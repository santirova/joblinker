import { Button, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

const ButtonNavLink = ({ to, label }) => {
  return (
    <Button
      component={NavLink}
      to={to}
      style={{ textDecoration: "none"}}
      color="inherit"
      sx={{
        "&.active": { 
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)" 
        }
      }}
    >
      <Typography style={{ fontFamily: 'Outfit' }}>
        {label}
      </Typography>
    </Button>
  )
}

export default ButtonNavLink
