import { Stack } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { apiClient } from "../../api/apiClient";
import { ApiCountry, Photo, MapCountry} from "../../types/types";
import { Header } from "../Header/index";
import { Map } from "../Map/index";
import { PhotoCard } from "../PhoroCard/index";
import { Photos } from "../Photos/index";
import { Profile } from "../Profile/index";
import "./styles.scss"


export const MainContent: FC = () => {
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<Partial<Photo> | null>(null);
    const [profileOpen, setProfileOpen] = useState<boolean>(false);
    const [data, setData] = useState<MapCountry[]>([]);

    const handleAvatarClick = () => {
        setProfileOpen(true);
        setPopupOpen(false);
    };

    const handlePhotoClick = (item: Photo) => {
        setSelectedItem(item);
        setPopupOpen(true);
        setProfileOpen(false);
    };

    const handleAddPhotoClick = () => {
        setSelectedItem(null);
        setPopupOpen(true);
        setProfileOpen(false);
    }
    const handleClosePopup = () => {
        setPopupOpen(false);
        setProfileOpen(false);
        setSelectedItem(null);
    }

    useEffect(() => {
        apiClient.get("/countries")
            .then((res) => {
                const countryData: MapCountry[] = [];
                res.data.map((dataItem : ApiCountry) => {
                    countryData.push({country: dataItem.code, value: 20});
                });
                setData(countryData);
            });
    }, []);


    return (
        <>
            <Header handleAvatarClick={handleAvatarClick} handleAddPhotoClick={handleAddPhotoClick}/>
            <main className="content">
                {popupOpen && <PhotoCard photo={selectedItem} onClose={handleClosePopup}/>}
                {profileOpen && <Profile onClose={handleClosePopup}/>}
                <Stack direction='row' spacing={2}>
                    <Map data={data}/>
                </Stack>
                <Photos handlePhotoClick={handlePhotoClick}/>
            </main>
        </>
    );
}
