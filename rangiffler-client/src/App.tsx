import {BrowserRouter, Route, Routes} from "react-router-dom";
import { MainContent } from "./components/MainContent/index";
import { PeopleContent } from "./components/PeopleContent/index";

export const App = () => {

  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path="/people" element={<PeopleContent/>}/>
                  <Route path="*" element={<MainContent/>}/>
              </Routes>
          </BrowserRouter>
      </div>
  );
};
