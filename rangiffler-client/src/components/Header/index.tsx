import deer from "@img/deer-logo.svg";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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
import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext/index";

interface HeaderInterface {
    handleAvatarClick: () => void;
    handleAddPhotoClick: () => void;
}

export const Header: FC<HeaderInterface> = ({handleAvatarClick, handleAddPhotoClick}) => {
    const { user } = useContext(UserContext);

    return (
        <AppBar position="static" color="transparent">
            <Toolbar>
                <Link to={"/"}>
                        <img src={deer} height={55} width={55} alt="Rangiffler logo"/>
                </Link>
                <Typography variant="h3" component="h1" sx={{ flexGrow: 1, margin: "12px" }}>
                    Rangiffler
                </Typography>
                <Stack direction='row' spacing={3}>
                    <Button onClick={handleAddPhotoClick}
                        variant="contained"
                        startIcon={<AddCircleOutlineIcon/>}>Add photo</Button>
                    <Stack direction="row" spacing={2}>
                        <Avatar sx={{
                            width: 48,
                            height: 48,
                            cursor: "pointer",
                        }}
                                src={user?.avatar}
                                alt={user?.username}
                                onClick={handleAvatarClick}
                        />
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
