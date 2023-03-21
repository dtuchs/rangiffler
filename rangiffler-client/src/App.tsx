import {useEffect, useState } from "react";
import { Route, Routes} from "react-router-dom";
import { apiClient } from "./api/apiClient";
import { Landing } from "./components/Landing/index";
import { Layout } from "./components/Layout/index";
import { Content } from "./components/Content/index";
import { NotFoundPage } from "./components/NotFoundPage/index";
import { Redirect } from "./components/Redirect/index";
import { CountryContext } from "./context/CountryContext/index";
import { PhotoContext } from "./context/PhotoContext/index";
import { UserContext } from "./context/UserContext/index";
import { ApiCountry, Photo, User } from "./types/types";

export const App = () => {

    const [user, setUser] = useState<Partial<User>>({});
    const [countries, setCountries] = useState<Array<ApiCountry>>([]);
    const [userPhotos, setUserPhotos] = useState<Array<Photo>>([]);
    const handleChangeUser = (user: User) => {
        setUser(user);
    };
    const handleAddPhoto = (photo: Photo) => {
      setUserPhotos([...userPhotos, photo]);
    };

    const handleEditPhoto = (photo: Photo) => {
        const newArr = [...userPhotos];
        const ph = newArr.find(ph => ph.id === photo.id);
        if(ph) {
            newArr[newArr.indexOf(ph)] = photo;
            setUserPhotos(newArr);
        }
    }

    const handleDeletePhoto = (photoId: string) => {
      setUserPhotos(userPhotos.filter(ph => ph.id !== photoId));
    };

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
        });

        apiClient.get("/photos")
            .then((res) => {
                if (res.data) {
                    setUserPhotos(res.data.map((photo: any) => ({
                        id: photo.id,
                        src: photo.photo,
                        description: photo.description,
                        countryCode: photo.country.code,
                        username: photo.username,
                    } as Photo)));
                }
            })
    }, []);

        return (
            <UserContext.Provider value={{
                user,
                handleChangeUser,
            }}>
                <CountryContext.Provider value={{
                    countries
                }}
                >
                   <PhotoContext.Provider value={{
                       photos: userPhotos,
                       handleAddPhoto,
                       handleEditPhoto,
                       handleDeletePhoto,
                   }}>
                       <Routes>
                           <Route path="/redirect" element={<Redirect />}/>
                           <Route path="/authorized" element={<Redirect />}/>
                           <Route path="/landing" element={<Landing/>}/>
                           <Route path="/" element={<Layout/>}>
                               <Route index element={<Content/>}/>
                           </Route>
                           <Route path="*" element={<NotFoundPage/>}/>
                       </Routes>
                   </PhotoContext.Provider>
                </CountryContext.Provider>
            </UserContext.Provider>
        );

};
