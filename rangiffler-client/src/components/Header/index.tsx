import deer from "@img/deer-logo.svg";
import PeopleIcon from "@mui/icons-material/People";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import PublicIcon from "@mui/icons-material/Public";
import {
    AppBar,
    Avatar,
    Button,
    ListItemIcon,
    Stack,
    Toolbar, Tooltip,
    Typography
} from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";

export type HeaderType = {
    handleAvatarClick: () => void;
};

export const Header: FC<HeaderType> = ({handleAvatarClick}) => {
    return (
        <AppBar position="static" color="transparent">
            <Toolbar>
                <Link to={"/"}>
                        <img src={deer} height={55} width={55} alt="Rangiffler logo"/>
                </Link>
                <Typography variant="h3" component="h1" sx={{ flexGrow: 1, margin: "12px" }}>
                    Rangiffler
                </Typography>
                <Stack direction='row' spacing={2}>
                    <Stack direction="row" spacing={2}>
                        <Button onClick={handleAvatarClick}>
                            <Avatar sx={{ width: 48, height: 48 }}
                                    src='https://randomuser.me/api/portraits/women/54.jpg'
                                    alt='Anna Travelling'
                            />
                        </Button>
                        <Stack direction='row'
                               spacing={0.5}
                               sx={{ display: "flex",
                                   alignItems: "center"
                               }}
                        >
                            <ListItemIcon>
                                <Tooltip title="Your visited countries">
                                    <Stack direction="row" gap={1}>
                                        <PublicIcon/> 4
                                    </Stack>
                                </Tooltip>
                            </ListItemIcon>
                            <ListItemIcon>
                                <Tooltip title="Your photos">
                                    <Stack direction="row" gap={1}>
                                        <PhotoCameraIcon/> 10
                                    </Stack>
                                </Tooltip>
                            </ListItemIcon>
                            <ListItemIcon>
                                <Tooltip title="Go to people around you">
                                    <Link to="/people">
                                        <PeopleIcon/>
                                    </Link>
                                </Tooltip>
                            </ListItemIcon>
                        </Stack>
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};
