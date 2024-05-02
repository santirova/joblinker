import {AppBar,Toolbar, Typography,Stack} from "@mui/material"
import {Outlet } from "react-router-dom"
import ButtonNavLink from "../components/buttonNavLink"
export default function Root() {
  return (
    <div>
      <AppBar position="static">
          <Toolbar>
              <Typography variant="h6" component="div" flexGrow={1}>
                  JobLinker
              </Typography>
              <Stack direction="row" spacing={2}>
                <ButtonNavLink label={"Publicaciones"} to={"/publicaciones"}/>
                <ButtonNavLink label={"Postulaciones"} to={"/postulaciones"}/>
                <ButtonNavLink label={"Estadisticas"} to={"/estadisticas"}/>
              </Stack>
          </Toolbar>
      </AppBar>
      <div id="content">
        <Outlet/>
      </div>
    </div>
  )
}
