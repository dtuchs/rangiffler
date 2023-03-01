import {
    Avatar,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import React, { FC } from "react";
import { User } from "../../types/types";

interface PeopleTabInterface {
    friends: User[];
    allUsers: User[];
    handleAddFriend: (user: User) => void;
}
export const PeopleTab: FC<PeopleTabInterface> = ({friends, allUsers, handleAddFriend}) => {

    return (
        <TableContainer component={Paper} sx={{ maxHeight: "80vh"}}>
            <Table stickyHeader aria-label="all people table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allUsers.map(user => (
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
                            <TableCell>{user.firstName} {user.lastName}</TableCell>
                            <TableCell>{
                                friends.map(friend => friend.id).includes(user.id) ? (
                                    <span>Your friend</span>
                                ) : (
                                    <Button size={"small"} onClick={() => handleAddFriend(user)}>
                                        Add to friends
                                    </Button>
                                )
                            }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        );
};
