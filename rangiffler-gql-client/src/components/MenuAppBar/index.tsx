import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

export const MenuAppBar = () => {
    return (
        <Box sx={{
            flexGrow: 1,
            marginBottom: 2
        }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Rangiffler
                    </Typography>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="Logout"
                            onClick={() => {}}
                            color="inherit"
                        >
                            <ExitToAppOutlinedIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}