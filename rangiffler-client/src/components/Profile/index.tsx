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
import React, { FC } from "react";

export type ProfileType = {
    onClose: () => void;
};
export const Profile: FC<ProfileType> = ({onClose}) => {


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
                                                src="https://randomuser.me/api/portraits/women/54.jpg"
                                                alt="Anna Travelling"
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
                                            size="small"/>
                                    </Grid>
                                    <Grid item sx={{textAlign: "center"}}>
                                        <TextField
                                            sx={{
                                                width: "80%",
                                                margin: "12px",
                                            }}
                                            label="First name"
                                            size="small" />
                                    </Grid>
                                    <Grid item sx={{textAlign: "center"}}>
                                        <TextField
                                            sx={{
                                                width: "80%",
                                                margin: "12px",
                                            }}
                                            label="Last name"
                                            size="small" />
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
