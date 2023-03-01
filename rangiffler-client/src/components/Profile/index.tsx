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
import React, { FC, FormEvent, useContext, useState } from "react";
import { apiClient } from "../../api/apiClient";
import { MAX_TEXT_FIELD_LENGTH, MIN_REQUIRED_TEXT_FIELD_LENGTH } from "../../constants/const";
import { UserContext } from "../../context/UserContext/index";
import { User } from "../../types/types";
import { ImageUpload } from "../ImageUpload/index";

interface ProfileInterface {
    onClose: () => void;
}

export const Profile: FC<ProfileInterface> = ({onClose}) => {

    const { user, handleChangeUser } = useContext(UserContext);

    const [profileData, setProfileData] = useState<Partial<User>>(user);
    const initialFieldErrorsState = {
        username: null,
        firstName: null,
        lastName: null,
    };
    const [fieldErrors, setFieldErrors] = useState<any>(initialFieldErrorsState);

    const hasFormAnyError: boolean =
        fieldErrors.username !== null ||
        fieldErrors.firstName !== null ||
        fieldErrors.lastName !== null;

    const resetFieldErrors = (fieldName: string) : void => {
        setFieldErrors({...fieldErrors, [fieldName]: null});
    };
    const checkTextLengthValid = (field: string, isFieldRequired: boolean, text?: string) : void => {
        if(isFieldRequired) {
            if(!text) {
                setFieldErrors({...fieldErrors, [field]: "This field is required!"})
            } else if(text.length < MIN_REQUIRED_TEXT_FIELD_LENGTH) {
                setFieldErrors({...fieldErrors, [field]: "Length of this field must be more than 2 characters!"})
            } else {
                resetFieldErrors(field);
            }
        } else if (text && (text.length > MAX_TEXT_FIELD_LENGTH)){
            setFieldErrors({...fieldErrors, [field]: "Length of this field must be no longer than 50 characters"})
        } else {
            resetFieldErrors(field);
        }
    };
    const handleProfileChange = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        apiClient.patch("/currentUser", profileData)
            .then(res => handleChangeUser(res.data));
        onClose();
        setFieldErrors(initialFieldErrorsState);
    }

    return (
        <Box sx={ {
            position: "fixed",
            zIndex: "5",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
        } }
             width="600px">
            <Card>
                <CardActions sx={ {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                } }>
                    <IconButton size='small'>
                        <CloseIcon onClick={ () => {
                            onClose();
                            setFieldErrors(initialFieldErrorsState);
                        }}/>
                    </IconButton>
                </CardActions>
                <CardContent>
                    {
                        <>
                            <form onSubmit={ handleProfileChange }>
                                <Grid container width="100%" direction="column" gap={ 1 } sx={ {
                                    justifyContent: "center",

                                } }>
                                    <Grid item sx={ {
                                        display: "flex",
                                        justifyContent: "center",
                                        marginBottom: "8px",
                                    } }>
                                        <Box sx = {{
                                            position: "relative",
                                        }}>
                                            <Avatar sx={ { width: 450, height: 450 } }
                                                    src={profileData?.avatar}
                                                    alt={ profileData?.username}
                                                    variant="rounded"
                                            />
                                            <Box sx={{
                                                position: "absolute",
                                                right: 0,
                                                top: "80%",
                                            }}>
                                                <ImageUpload
                                                    handlePhotoChange={(avatar) => setProfileData({
                                                        ...profileData,
                                                        avatar,
                                                    })}
                                                />
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item sx={{
                                        textAlign: "center",
                                        maxHeight: "70px",
                                    }}>
                                        <TextField
                                            sx={{
                                                width: "80%",
                                                margin: "12px",
                                            }}
                                            label="Username"
                                            size="small"
                                            required
                                            value={ profileData?.username }
                                            helperText={fieldErrors["username"]}
                                            error={fieldErrors["username"] !== null}
                                            onChange={ event => {
                                                checkTextLengthValid( "username", true, event.target.value);
                                                setProfileData({
                                                    ...profileData,
                                                    username: event.target.value
                                                });
                                            }}
                                        />
                                    </Grid>
                                    <Grid item sx={{
                                        textAlign: "center",
                                        maxHeight: "70px",
                                    }}>
                                        <TextField
                                            sx={ {
                                                width: "80%",
                                                margin: "12px",
                                            } }
                                            label="First name"
                                            size="small"
                                            value={ profileData?.firstName }
                                            helperText={fieldErrors["firstName"]}
                                            error={fieldErrors["firstName"] !== null}
                                            onChange={ event =>
                                            {
                                                checkTextLengthValid( "firstName", false, event.target.value);
                                                setProfileData({
                                                ...profileData,
                                                firstName: event.target.value
                                            })} }
                                        />
                                    </Grid>
                                    <Grid item sx={{ textAlign: "center",
                                        maxHeight: "70px",
                                    }}>
                                        <TextField
                                            sx={ {
                                                width: "80%",
                                                margin: "12px",
                                            } }
                                            label="Last name"
                                            size="small"
                                            value={ profileData?.lastName }
                                            helperText={fieldErrors["lastName"]}
                                            error={fieldErrors["lastName"] !== null}
                                            onChange={ event => {
                                                checkTextLengthValid( "lastName", false, event.target.value);
                                                setProfileData({
                                                    ...profileData,
                                                    lastName: event.target.value
                                                })
                                            }}
                                        />
                                    </Grid>
                                    <Grid item sx={{ textAlign: "center" }}>
                                        <LoadingButton variant="contained" type="submit" disabled={hasFormAnyError}>Save</LoadingButton>
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
