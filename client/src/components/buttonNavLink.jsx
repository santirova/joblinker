import { Button } from '@mui/material'
import { NavLink } from 'react-router-dom'

const ButtonNavLink = ({to,label}) => {
  return (
    <Button as= {NavLink} to={to} style={{ textDecoration: "none" }} color="inherit" >
            {label}
     </Button>
  )
}

export default ButtonNavLink
