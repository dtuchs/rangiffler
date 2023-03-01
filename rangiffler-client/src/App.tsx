import {useEffect, useState } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { apiClient } from "./api/apiClient";
import { MainContent} from "./components/MainContent/index";
import { PeopleContent } from "./components/PeopleContent/index";
import { CountryContext } from "./context/CountryContext/index";
import { UserContext } from "./context/UserContext/index";
import { ApiCountry, User } from "./types/types";

export const App = () => {

    const [user, setUser] = useState<Partial<User>>({});
    const [countries, setCountries] = useState<Array<ApiCountry>>([]);
    const handleChangeUser = (user: User) => {
        setUser(user);
    }

    useEffect(() => {
        apiClient.get("/currentUser")
            .then((res) => {
                if(res.data) {
                    setUser(res.data);
                }
            });

        apiClient.get("/countries")
            .then((res) => {
            if(res.data) {
                setCountries(res.data);
            }
        })
    }, []);

  return (
      <div className="App">
          <BrowserRouter>
              <UserContext.Provider value={{
                  user,
                  handleChangeUser,
              }}>
                  <CountryContext.Provider value={{
                      countries
                  }}
                  >
                      <Routes>
                          <Route path="/people" element={<PeopleContent/>}/>
                          <Route path="*" element={<MainContent/>}/>
                      </Routes>
                  </CountryContext.Provider>
              </UserContext.Provider>
          </BrowserRouter>
      </div>
  );
};
