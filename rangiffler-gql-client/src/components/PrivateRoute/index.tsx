import {Outlet} from "react-router-dom"
import {MenuAppBar} from "../MenuAppBar"
import {Box} from "@mui/material"
import {useState} from "react";
import {DrawerHeader} from "../Drawer/DrawerHeader";
import {drawerWidth} from "../Drawer";

export const PrivateRoute = () => {
    const [sidebarState, setSidebarState] = useState(false);

    return (
        <>
            <MenuAppBar sidebarState={sidebarState} handleChangeState={setSidebarState}/>
            <Box component="main" sx={{
                height: 100,
                flexGrow: 1,
                p: 3,
                marginLeft: sidebarState ? `${drawerWidth}px` : 7,
            }}>
                <DrawerHeader/>
                <Outlet/>
            </Box>
        </>
    )
}