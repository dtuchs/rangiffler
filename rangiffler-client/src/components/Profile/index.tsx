import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardContent,
    Grid,
    IconButton,
    TextField
} from "@mui/material";
import React, { FC, useState } from "react";
import { User } from "../../types/types";

export type ProfileType = {
    onClose: () => void;
    user: User;
};
export const Profile: FC<ProfileType> = ({onClose, user}) => {

    const [profileData, setProfileData] = useState<User>(user);

    return (
        <Box sx={{
            position: "fixed",
            zIndex: "5",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
        }}
             width="600px">
            <Card>
                <CardActions sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                }}>
                    <IconButton size='small'>
                        <CloseIcon onClick={onClose}/>
                    </IconButton>
                </CardActions>
                <CardContent>
                    {
                        <>
                            <form>
                                <Grid container width="100%" direction="column" gap={1} sx={{
                                    justifyContent: "center",

                                }}>
                                    <Grid item sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginBottom: "8px",
                                    }}>
                                        <Avatar sx={{ width: 450, height: 450 }}
                                                src={profileData?.avatar}
                                                alt={profileData?.username}
                                                variant="rounded"
                                        />
                                    </Grid>
                                    <Grid item sx={{textAlign: "center"}}>
                                        <TextField
                                            sx={{
                                                width: "80%",
                                                margin: "12px",
                                            }}
                                            label="Username"
                                            size="small"
                                            value={profileData?.username}
                                            onChange={event => setProfileData({...profileData, username: event.target.value})}
                                        />
                                    </Grid>
                                    <Grid item sx={{textAlign: "center"}}>
                                        <TextField
                                            sx={{
                                                width: "80%",
                                                margin: "12px",
                                            }}
                                            label="First name"
                                            size="small"
                                            value={profileData?.firstName}
                                            onChange={event => setProfileData({...profileData, firstName: event.target.value})}
                                        />
                                    </Grid>
                                    <Grid item sx={{textAlign: "center"}}>
                                        <TextField
                                            sx={{
                                                width: "80%",
                                                margin: "12px",
                                            }}
                                            label="Last name"
                                            size="small"
                                            value={profileData?.lastName}
                                            onChange={event => setProfileData({...profileData, lastName: event.target.value})}
                                        />
                                    </Grid>
                                    <Grid item sx={{textAlign: "center"}}>
                                        <LoadingButton>Save</LoadingButton>
                                    </Grid>
                                </Grid>
                            </form>
                        </>
                    }
                </CardContent>
            </Card>
        </Box>
    );
}
