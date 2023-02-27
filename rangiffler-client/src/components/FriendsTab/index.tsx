import {
    Avatar,
    Grid, IconButton,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import React, { FC, useState } from "react";
import WorldMap from "react-svg-worldmap";
import { User } from "../../types/types";
import { PhotoCard, PhotoCardType } from "../PhoroCard/index";
import { Photos } from "../Photos/index";
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';

export type FriendsTabType = {
  friends: User[];
  handleRemoveFriend: (user: User) => user;
};
export const FriendsTab:FC<FriendsTabType> = ({friends, handleRemoveFriend}) => {

    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<PhotoCardType | null>(null);
    const [zoomed, setZoomed] =  useState<boolean>(false);

    const data = [
        { country: "cn", value: 10 },
        { country: "in", value: 13 },
        { country: "ru", value: 13 },
        { country: "fr", value: 67 },
        { country: "it", value: 45 },
        { country: "ca", value: 12 },
        { country: "us", value: 33 },
        { country: "de", value: 48 },
        { country: "es", value: 76 },
        { country: "fi", value: 39 },
    ];

    const handlePhotoClick = (item: PhotoCardType) => {
        setSelectedItem(item);
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
        setSelectedItem(null);
    }

    return (
        <>
            {popupOpen && <PhotoCard {...selectedItem} onClose={handleClosePopup}/>}
            <Grid container direction='row' columns={2} spacing={2}>
                <Grid item style={{margin: "0 auto"}} onClick={() => setZoomed((prevState) => !prevState)}>
                    <WorldMap
                        backgroundColor="#eeedea"
                        color="#3c5548"
                        value-suffix="photos"
                        size={zoomed ? "xxl" : "xl"}
                        data={data}
                    />
                </Grid>
                <Grid item>
                    <TableContainer component={Paper} sx={{ maxHeight: "50vh"}}>
                        <Table stickyHeader aria-label="friends table">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {friends.map(user => (
                                    <TableRow
                                        key={user.username}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>
                                            <Avatar sx={{ width: 48, height: 48 }}
                                                    src={user.avatar}
                                                    alt={user.username}
                                            />
                                        </TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>
                                            <IconButton size="small" onClick={() => handleRemoveFriend(user)}>
                                                <PersonRemoveAlt1Icon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Photos handlePhotoClick={handlePhotoClick}/>
        </>
    );
};
