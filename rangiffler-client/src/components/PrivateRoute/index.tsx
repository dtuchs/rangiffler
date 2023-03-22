import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../context/UserContext/index";

export const PrivateRoute = () => {

    const { user } = useContext(UserContext);
    return (
        <>
            {user ? <Outlet/> : <Navigate to={"/landing"} replace/>}
        </>
    )
}
