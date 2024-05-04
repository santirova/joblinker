import { Button, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

const ButtonNavLink = ({to,label}) => {
  return (
    <Button as= {NavLink} to={to} style={{ textDecoration: "none"}} color="inherit">
       <Typography style={{fontFamily:'Outfit'}}>
          {label}
       </Typography>
     </Button>
  )
}

export default ButtonNavLink
