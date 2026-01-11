import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from './logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios";

const pages = [
    { name: 'Home', link: 'home' },
    { name: 'Films', link: 'films' },
    { name: 'Popular shows', link: 'popular' },
    { name: 'Saved films', link: 'savedFilms' },
];

const settings = ['Logout'];

function NavMenu() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [search, setSearch] = React.useState("");
    const [results, setResults] = React.useState([]);

    const navigate = useNavigate();

    const handleSearch = async (value) => {
        setSearch(value);

        if (value.length < 3) {
            setResults([]);
            return;
        }

        const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${value}`);
        setResults(res.data);
    };

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/auth/login');
    };

    return (
        <>
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Box
                        component="img"
                        sx={{ height: 40, display: { xs: 'none', md: 'flex' }, mr: 1 }}
                        alt="Logo"
                        src={logo}
                    />

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            anchorEl={anchorElNav}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                        >
                            {pages.map(({ name, link }) => (
                                <MenuItem key={link} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map(({ name, link }) => (
                            <NavLink
                                key={link}
                                to={link}
                                style={({ isActive }) => ({
                                    textDecoration: 'none',
                                    margin: '0 10px',
                                    color: isActive ? '#eb0000' : '#d6d4d4'
                                })}
                            >
                                {name}
                            </NavLink>
                        ))}
                    </Box>

                    <input
                        type="text"
                        placeholder="Search…"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{
                            padding: "6px 10px",
                            borderRadius: "2px",
                            border: "1px solid #555",
                            background: "#222",
                            color: "white",
                            marginRight: "20px",
                        }}
                    />

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="User" src="/logo.png" />
                            </IconButton>
                        </Tooltip>

                        <Menu
                            sx={{ mt: '45px' }}
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleLogout}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

        {/* SEARCH RESULTS */}
        {results.length > 0 && (
            <Box
                sx={{
                    position: "fixed",
                    top: "70px",
                    left: 0,
                    width: "100%",
                    background: "black",
                    color: "white",
                    padding: "20px",
                    zIndex: 9999,
                    maxHeight: "400px",
                    overflowY: "auto",
                }}
            >
                {results.map((item) => (
                    <Box
                        key={item.show.id}
                        sx={{
                            padding: "10px 0",
                            borderBottom: "1px solid #333",
                            display: "flex",
                            gap: "15px",
                            alignItems: "center",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            navigate(`/films/${item.show.id}`);
                            setResults([]);
                            setSearch("");
                        }}
                    >
                        <img
                            src={item.show.image?.medium}
                            alt=""
                            style={{ width: "60px", borderRadius: "6px" }}
                        />
                        <Typography>{item.show.name}</Typography>
                    </Box>
                ))}
            </Box>
        )}
        </>
    );
}

export default NavMenu;