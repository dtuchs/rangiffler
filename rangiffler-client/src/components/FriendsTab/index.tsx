import {
    Avatar,
    Grid, IconButton,
    Paper, Stack,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import React, { FC, useState } from "react";
import { Photo, User } from "../../types/types";
import { Map } from "../Map/index";
import { PhotoCard} from "../PhoroCard/index";
import { Photos } from "../Photos/index";
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';

interface FriendsTabInterface {
  friends: User[];
  handleRemoveFriend: (user: User) => void;
}
export const FriendsTab:FC<FriendsTabInterface> = ({friends, handleRemoveFriend}) => {

    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<Partial<Photo> | null>(null);

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

    const handlePhotoClick = (item: Photo) => {
        setSelectedItem(item);
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
        setSelectedItem(null);
    }

    return (
        <>
            {popupOpen && <PhotoCard photo={selectedItem} onClose={handleClosePopup}/>}
            <Grid container direction='row' columns={2} spacing={2}>
                <Grid item style={{margin: "0 auto"}}>
                    <Map data={data}/>
                </Grid>
                <Grid item>
                    <TableContainer component={Paper} sx={{ maxHeight: "50vh"}}>
                        {friends?.length > 0 ? (
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
                        </Table> ) :
                            (
                                <Stack sx={{ margin: "16px auto", width: "200px", textAlign: "center"}}>
                                    No friends yet
                                </Stack>
                            )}
                    </TableContainer>
                </Grid>
            </Grid>
            <Photos handlePhotoClick={handlePhotoClick}/>
        </>
    );
};
