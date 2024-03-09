import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RedirectPage } from "../../pages/Redirect";
import { PrivateRoute } from "../PrivateRoute";
import { AuthorizedPage } from "../../pages/Authorized";
import { MyTravelsPage } from "../../pages/MyTravelsPage";
import { ProfilePage } from "../../pages/ProfilePage";
import { LandingPage } from "../../pages/LandingPage";
import { PeoplePage } from "../../pages/PeoplePage";
import { SessionContext } from "../../context/SessionContext";
import {FC} from "react";
import { useGetUser } from "../../hooks/useGetUser";
import { useSnackBar } from "../../context/SnackBarContext";
import { Loader } from "../Loader";

export const AppContent: FC = () => {
    const snackbar = useSnackBar();
    const {data, error, loading, refetch} = useGetUser();
    const sessionContext =  {user: data?.user, updateUser: refetch};

    if(error) {
        snackbar.showSnackBar("Failed to fetch userdata", "error");
    }

    return (
        <SessionContext.Provider value={sessionContext}>
            {loading ? (
                <Loader/>
                ):(
                <BrowserRouter>
                    <Routes>
                        <Route path="/redirect" element={<RedirectPage/>}/>
                        <Route path="/authorized" element={<AuthorizedPage/>}/>
                        <Route element={<PrivateRoute/>}>
                            <Route path="/my-travels" element={<MyTravelsPage/>}/>
                            <Route path="/profile" element={<ProfilePage/>}/>
                            <Route path="/people" element={<PeoplePage/>}/>
                        </Route>
                        <Route path="/" element={<LandingPage/>}/>
                    </Routes>
                </BrowserRouter>
            )}
        </SessionContext.Provider>
    );
}