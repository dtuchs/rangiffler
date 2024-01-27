// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { MyTravelsPage } from "./pages/MyTravelsPage";
import { LandingPage } from "./pages/LandingPage";
import { ProfilePage } from "./pages/ProfilePage";
import { PeoplePage } from "./pages/PeoplePage";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/my-travels" element={<MyTravelsPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/people" element={<PeoplePage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
