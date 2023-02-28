import { Stack } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { apiClient } from "../../api/apiClient";
import { ApiCountry, UICountry, User } from "../../types/types";
import { Header } from "../Header/index";
import { Map } from "../Map/index";
import { PhotoCard, PhotoCardType } from "../PhoroCard/index";
import { Photos } from "../Photos/index";

import "./styles.scss"
import { Profile } from "../Profile/index";


export type MainContentType = {
    user?: User;
}

export const MainContent: FC<MainContentType> = ({user}) => {
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<PhotoCardType | null>(null);
    const [profileOpen, setProfileOpen] = useState<boolean>(false);
    const [data, setData] = useState<UICountry[]>([]);
    const handleAvatarClick = () => {
        setProfileOpen(true);
        setPopupOpen(false);
    }

    const handlePhotoClick = (item: PhotoCardType) => {
        setSelectedItem(item);
        setPopupOpen(true);
        setProfileOpen(false);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
        setProfileOpen(false);
        setSelectedItem(null);
    }

    useEffect(() => {
        apiClient.get("/countries")
            .then((res) => {
                const countryData: UICountry[] = [];
                res.data.map((dataItem : ApiCountry) => {
                    countryData.push({country: dataItem.code, value: 20});
                });
                setData(countryData);
            });
    }, []);


    return (
        <>
            <Header handleAvatarClick={handleAvatarClick}/>
            <main className="content">
                {popupOpen && <PhotoCard {...selectedItem} onClose={handleClosePopup}/>}
                {profileOpen && user && <Profile onClose={handleClosePopup} user={user}/>}
                <Stack direction='row' spacing={2}>
                    <Map data={data}/>
                </Stack>
                <Photos handlePhotoClick={handlePhotoClick}/>
            </main>
        </>

    );
}
