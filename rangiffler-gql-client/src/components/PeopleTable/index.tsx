import {Avatar, Button, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useQueryPeople } from "../../hooks/useQueryPeople";
import { HeadCell } from "../Table/HeadCell";
import { TableHead } from "../Table/TableHead";
import { TablePagination } from "../Table/Pagination";
import { User } from "../../types/User";
import { useState } from "react";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { useSnackBar } from "../../context/SnackBarContext";
import { useUpdateFriendshipStatus } from "../../hooks/useUpdateFriendshipStatus";

const headCells: readonly HeadCell[] = [
    {
        id: 'avatar',
        numeric: false,
        label: 'Avatar',
    },
    {
        id: 'username',
        numeric: false,
        label: 'Username',
    },
    {
        id: 'firstname',
        numeric: false,
        label: 'Name',
    },
    {
        id: 'surname',
        numeric: false,
        label: 'Surname',
    },
    {
        id: 'country',
        numeric: false,
        label: 'Location',
    },
    {
        id: 'actions',
        numeric: true,
        label: 'Actions',
    },
];
export const PeopleTable = () => {
    const [page, setPage] = useState(0);
    const {data, hasNextPage, hasPreviousPage} = useQueryPeople({page});
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

    const resolveFriendActions = (userId: string, friendStatus?: string) => {
        if(!friendStatus) {
            return (
                <Button
                    startIcon={<AddOutlinedIcon  />}
                    type="button"
                    variant="outlined"
                    size="small"
                    onClick={() => handleAddUser(userId)}
                >
                    Add friend
                </Button>
            )
        }
        switch(friendStatus) {
            case "INVITATION_SENT":
                return (
                    <Chip label="Waiting response..." />
                );
            case "INVITATION_RECEIVED":
                return (
                    <>
                        <Button
                            startIcon={<AddOutlinedIcon/>}
                            type="button"
                            variant="contained"
                            size="small"
                            sx={{
                                marginRight: 1
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
                        >
                            Decline
                        </Button>
                    </>
                );
            case "FRIEND":
                return (
                    <Button
                        startIcon={<RemoveOutlinedIcon/>}
                        type="button"
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteFriend(userId)}
                    >
                        Remove friend
                    </Button>
                );
        }
    }

    return (
        <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer>
                <Table sx={{ minWidth: 750 }}
                       aria-labelledby="tableTitle"
                >
                    <TableHead headCells={headCells}/>
                    <TableBody>
                        {data.map((row: User) => {
                            return (
                                <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={row.id}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        sx={{
                                            paddingTop: 0,
                                            paddingBottom: 0,
                                        }}
                                    >
                                        <Avatar src={row.avatar}/>
                                    </TableCell>
                                    <TableCell>{row.username}</TableCell>
                                    <TableCell>{row.firstname ?? "---"}</TableCell>
                                    <TableCell>{row.surname ?? "---"}</TableCell>
                                    <TableCell>{row.location?.name}</TableCell>
                                    <TableCell align="right" sx={{
                                        maxWidth: "150px"
                                    }}>
                                        {resolveFriendActions(row.id, row.friendStatus)}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <TablePagination
                    onPreviousClick={() => setPage(page - 1)}
                    onNextClick={() => setPage(page + 1)}
                    hasPreviousValues={hasPreviousPage}
                    hasNextValues={hasNextPage}
                />
            </TableContainer>
        </Paper>
    )
}