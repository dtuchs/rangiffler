import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { IconButton, Tooltip } from "@mui/material";
import React, { FC, useState } from "react";
import WorldMap from "react-svg-worldmap";
import { MapCountry } from "../../types/types";

interface MapInterface {
    data: MapCountry[];
}
export const Map: FC<MapInterface>= ({data}) => {

    const [zoomed, setZoomed] =  useState<boolean>(false);

    return (
        <div style={{margin: "0 auto", position: "relative"}}>
            <Tooltip title={zoomed ? "Zoom out" : "Zoom in"}>
                <IconButton onClick={() => setZoomed((prevState) => !prevState)}
                            sx={{
                                position: "absolute",
                                top: 20,
                                right: 40,
                            }}
                >
                    {zoomed ? (
                        <ZoomOutIcon sx={{
                            width: "50px",
                            height: "50px",
                        }}/>
                    ) : (
                        <ZoomInIcon sx={{
                            width: "50px",
                            height: "50px",
                        }}/>
                    )}
                </IconButton>
            </Tooltip>
            <WorldMap
                color="#3c5548"
                value-suffix="photos"
                size={zoomed ? "xxl" : "xl"}
                data={data}
            />
        </div>
    );
}
