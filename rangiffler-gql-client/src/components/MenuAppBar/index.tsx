import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Sidebar } from '../Sidebar';
import { FC } from 'react';

interface MenuAppBarInterface {
    sidebarState: boolean,
    handleChangeState: (isOpened: boolean) => void,
}
export const MenuAppBar: FC<MenuAppBarInterface> = ({sidebarState, handleChangeState}) => {
    return (
        <Box sx={{
            flexGrow: 1,
            marginBottom: 2,
            display: "flex",
        }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="open drawer"
                        color="inherit"
                        sx={{
                            marginRight: 5,
                        }}
                        onClick={() => handleChangeState(!sidebarState)}
                        component="button"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Rangiffler
                    </Typography>
                    <Box>
                        <IconButton
                            size="large"
                            aria-label="Logout"
                            onClick={() => {}}
                            color="inherit"
                        >
                            <ExitToAppOutlinedIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Sidebar sidebarState={sidebarState}/>
        </Box>
    );
}