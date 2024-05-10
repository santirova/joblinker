import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileIcon() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate()

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleLogout = async () =>{
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        handleCloseUserMenu()
        navigate('/')
    }

    return (
        <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Aemy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Mi perfil</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <Typography textAlign="center">Cerrar sesión</Typography>
                    </MenuItem>
                </Menu>
            </Box>
    )
}
