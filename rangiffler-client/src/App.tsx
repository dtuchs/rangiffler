import { useEffect, useState } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { apiClient } from "./api/apiClient";
import { MainContent} from "./components/MainContent/index";
import { PeopleContent } from "./components/PeopleContent/index";
import { User } from "./types/types";

export const App = () => {

    const [user, setUser] = useState<User>();

    useEffect(() => {
        apiClient.get("/currentUser")
            .then((res) => {
                if(res.data) {
                    console.log(res.data);
                    setUser(res.data);
                }
            });
    }, []);

  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path="/people" element={<PeopleContent/>}/>
                  <Route path="*" element={<MainContent user={user}/>}/>
              </Routes>
          </BrowserRouter>
      </div>
  );
};
