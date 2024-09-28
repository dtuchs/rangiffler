import {FC, useState} from "react";
import {useSnackBar} from "../../../context/SnackBarContext";
import {useUpdateFriendshipStatus} from "../../../hooks/useUpdateFriendshipStatus";
import {Button, Chip} from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

interface ActionButtonsInterface {
    userId: string;
    friendStatus?: "FRIEND" | "INVITATION_SENT" | "INVITATION_RECEIVED";
}

export const ActionButtons: FC<ActionButtonsInterface> = ({userId, friendStatus}) => {
    const snackbar = useSnackBar();

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const {updateFriendship} = useUpdateFriendshipStatus({
        onError: () => snackbar.showSnackBar(errorMessage, "error"),
        onCompleted: () => snackbar.showSnackBar(successMessage, "success"),
    });

    const handleAddUser = (userId: string) => {
        setErrorMessage("Can not send invitation");
        setSuccessMessage("Invitation sent");
        updateFriendship({
            variables: {
                input: {
                    user: userId,
                    action: "ADD",
                }
            }
        });
    }

    const handleAcceptInvitation = (userId: string) => {
        setErrorMessage("Can not accept invitation");
        setSuccessMessage("Invitation accepted");
        updateFriendship({
            variables: {
                input: {
                    user: userId,
                    action: "ACCEPT",
                }
            }
        });
    }

    const handleDeclineInvitation = (userId: string) => {
        setErrorMessage("Can not decline invitation");
        setSuccessMessage("Invitation declined");
        updateFriendship({
            variables: {
                input: {
                    user: userId,
                    action: "REJECT",
                }
            }
        });
    }

    const handleDeleteFriend = (userId: string) => {
        setErrorMessage("Can not delete friend");
        setSuccessMessage("Friend deleted");
        updateFriendship({
            variables: {
                input: {
                    user: userId,
                    action: "DELETE",
                }
            }
        });
    }

    if (!friendStatus) {
        return (
            <Button
                startIcon={<AddOutlinedIcon/>}
                type="button"
                variant="outlined"
                size="small"
                onClick={() => handleAddUser(userId)}
                sx={{
                    width: 100
                }}
            >
                Add
            </Button>
        )
    }

    return (
        <>
            {
                friendStatus === "FRIEND" && (
                    <Button
                        startIcon={<RemoveOutlinedIcon/>}
                        type="button"
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteFriend(userId)}
                        sx={{
                            width: 100
                        }}
                    >
                        Remove
                    </Button>
                )}
            {
                friendStatus === "INVITATION_SENT" && (
                    <Chip
                        sx={{
                            width: 100
                        }}
                        label="Waiting..."
                    />

                )
            }
            {
                friendStatus === "INVITATION_RECEIVED" && (
                    <>
                        <Button
                            startIcon={<AddOutlinedIcon/>}
                            type="button"
                            variant="contained"
                            size="small"
                            sx={{
                                marginRight: 1,
                                width: 100,
                            }}
                            onClick={() => handleAcceptInvitation(userId)}
                        >
                            Accept
                        </Button>
                        <Button
                            startIcon={<RemoveOutlinedIcon/>}
                            type="button"
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleDeclineInvitation(userId)}
                            sx={{
                                width: 100
                            }}
                        >
                            Decline
                        </Button>
                    </>
                )
            }
        </>
    )
}