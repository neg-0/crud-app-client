import InventoryIcon from '@mui/icons-material/Inventory';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider, Link } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { AvatarGenerator } from 'random-avatar-generator';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuthentication';

const avatarGenerator = new AvatarGenerator();

const pages = {
  "View All Items": { role: "all", path: '/' },
  "My Items": { role: "user", path: '/myItems' },
  "Create": { role: "user", path: '/create' },
}

function ResponsiveAppBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate('/');
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <InventoryIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex', ":hover": { color: 'white' } },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CRUD
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {Object.entries(pages).map(([page, pathData]) => {
                if (pathData.role === "all" || (pathData.role === "user" && user)) {
                  return (
                    <MenuItem key={page} onClick={handleCloseNavMenu} component={Link} href={pathData.path}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  )
                }
              }
              )}
            </Menu>
          </Box>
          <InventoryIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none', ":hover": { color: 'white' } },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CRUD
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {Object.entries(pages).map(([page, pathData]) => {
              if (pathData.role === "all" || (pathData.role === "user" && user)) {
                return (<Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block', ":hover": { color: 'white', backgroundColor: '#4795e2' } }}
                  variant="outlined"
                  href={pathData.path}
                >
                  {page}
                </Button>)
              }
            })}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user ? avatarGenerator.generateRandomAvatar("" + user.id) : ""} />
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
              {user ?
                <Box sx={{ minWidth: "200px" }}>
                  <MenuItem disabled sx={{ mb: 1 }}>
                    <Typography textAlign="center">{user.username}</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu} component={Link} href='/profile'>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Box>
                :
                <Box sx={{ minWidth: "200px" }}>
                  <MenuItem disabled sx={{ mb: 1 }}>
                    <Typography textAlign="center">Visitor</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu} component={Link} href='/register'>
                    <Typography textAlign="center">Register</Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleCloseUserMenu} component={Link} href='/login'>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                </Box>
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;