import {BrowserRouter, Route, Routes} from "react-router-dom";
import {RedirectPage} from "../../pages/Redirect";
import {PrivateRoute} from "../PrivateRoute";
import {AuthorizedPage} from "../../pages/Authorized";
import {MyTravelsPage} from "../../pages/MyTravelsPage";
import {ProfilePage} from "../../pages/ProfilePage";
import {LandingPage} from "../../pages/LandingPage";
import {PeoplePage} from "../../pages/PeoplePage";
import {FC} from "react";

export const AppContent: FC = () => {
    return (
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
    );
}