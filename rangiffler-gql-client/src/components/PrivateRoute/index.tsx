import {Navigate, Outlet} from "react-router-dom"
import {MenuAppBar} from "../MenuAppBar"
import {Box} from "@mui/material"
import {useState} from "react";
import {DrawerHeader} from "../Drawer/DrawerHeader";
import {drawerWidth} from "../Drawer";
import {SessionContext} from "../../context/SessionContext";
import {useGetUser} from "../../hooks/useGetUser";
import {Loader} from "../Loader";
import {CountriesProvider} from "../../context/CountriesContext";
import {DialogProvider} from "../../context/DialogContext.tsx";

export const PrivateRoute = () => {
    const [sidebarState, setSidebarState] = useState(false);

    const {data, loading, refetch} = useGetUser();
    const sessionContext = {user: data?.user, updateUser: refetch};


    return (
        loading ?
            <Loader/>
            :
            data ? (
                    <SessionContext.Provider value={sessionContext}>
                        <CountriesProvider>
                            <DialogProvider>
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
                            </DialogProvider>
                        </CountriesProvider>
                    </SessionContext.Provider>
                ) :
                (
                    <Navigate to="/" replace={true}/>
                )
    )
}