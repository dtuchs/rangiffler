import { ButtonGroup, IconButton, Stack, Tooltip } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { apiClient } from "../../api/apiClient";
import { Header } from "../Header/index";
import { PhotoCard, PhotoCardType } from "../PhoroCard/index";
import { Photos } from "../Photos/index";
import WorldMap from "react-svg-worldmap";

import "./styles.scss"
import { Profile } from "../Profile/index";

export type ApiCountry = {
    id: number,
    code: string,
    name: string,
};

export type UICountry = {
    country: string,
    value: number,
};

export const MainContent: FC = () => {
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


    const [zoomed, setZoomed] =  useState<boolean>(false);

    return (
        <>
            <Header handleAvatarClick={handleAvatarClick}/>
            <main className="content">
                <Stack direction='row' spacing={2}>
                    {popupOpen && <PhotoCard {...selectedItem} onClose={handleClosePopup}/>}
                    {profileOpen && <Profile onClose={handleClosePopup}/>}
                    <div style={{margin: "0 auto"}} onClick={() => setZoomed((prevState) => !prevState)}>
                        <ButtonGroup>
                            <Tooltip title="Zoom in">
                                <IconButton>

                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Zoom out">
                                <IconButton>

                                </IconButton>
                            </Tooltip>
                        </ButtonGroup>
                        <WorldMap
                            backgroundColor="#eeedea"
                            color="#3c5548"
                            value-suffix="photos"
                            size={zoomed ? "xxl" : "xl"}
                            data={data}
                        />
                    </div>
                </Stack>
                <Photos handlePhotoClick={handlePhotoClick}/>
            </main>
        </>

    );
}
