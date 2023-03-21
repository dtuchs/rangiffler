import { IconButton, Stack } from "@mui/material";
import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CountryContext } from "../../context/CountryContext/index";
import { PhotoContext } from "../../context/PhotoContext/index";
import { CountryContext as MapCountryContext } from "react-svg-worldmap/dist/types";
import { ApiCountry, Photo, MapCountry} from "../../types/types";
import { LayoutContext } from "../Layout/index";
import { Map } from "../Map/index";
import { Photos } from "../Photos/index";
import ClearIcon from '@mui/icons-material/Clear';
import "./styles.scss"


export const MainTab: FC = () => {
    const {photos} = useContext(PhotoContext);
    const {countries} = useContext(CountryContext);
    const [photoFilter, setPhotoFilter] = useState<string | null>(null);
    const {handlePhotoClick} = useOutletContext<LayoutContext>();
    const filteredPhotos = useMemo<Photo[]>(
        () => photoFilter ? photos.filter(photo => photo.countryCode.toLowerCase() === photoFilter.toLowerCase()) : photos
    , [photoFilter, photos]);

    const [data, setData] = useState<MapCountry[]>([]);

    useEffect(() => {
        const countryData: MapCountry[] = [];
        countries.map((dataItem : ApiCountry) => {
            countryData.push({
                country: dataItem.code,
                value: photos.filter(photo => photo.countryCode === dataItem.code).length || 0
            });
        });
        setData(countryData);
    }, [photos]);

    const handleCountryClick = (context: MapCountryContext & {
        event: React.MouseEvent<SVGElement, Event>;
    }) => {
        setPhotoFilter(context.countryCode);
    };

    return (
        <>
            <Stack direction='row' spacing={2}>
                <Map data={data} handleCountryClick={handleCountryClick}/>
            </Stack>
                {photoFilter && (
                    <IconButton
                        sx={{
                            position: "absolute",
                            top: "130px",
                            right: "2%" }}
                        onClick={() => setPhotoFilter(null)}>
                        <ClearIcon/> Clear country
                    </IconButton>
                )}
            <Photos photos={filteredPhotos} handlePhotoClick={handlePhotoClick}/>
        </>
    );
}
