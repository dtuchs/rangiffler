import {Avatar, Box, Table, TableBody, TableCell, TableContainer, TableRow, Typography, useTheme} from "@mui/material";
import {HeadCell} from "../Table/HeadCell";
import {TableHead} from "../Table/TableHead";
import {TablePagination} from "../Table/Pagination";
import {User} from "../../types/User";
import {FC} from "react";
import {ActionButtons} from "../Table/ActionButtons";
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import {TableToolbar} from "../Table/TableToolbar";

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

interface PeopleTableInterface {
    data: User[];
    page: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    setPage: (page: number) => void;
    setSearch: (value: string) => void;
    onSearchSubmit: () => void;
}

export const PeopleTable: FC<PeopleTableInterface> = ({
                                                          data,
                                                          page,
                                                          hasPreviousPage,
                                                          hasNextPage,
                                                          setPage,
                                                          setSearch,
                                                          onSearchSubmit
                                                      }) => {

    const theme = useTheme();

    return (
        <TableContainer>
            <TableToolbar setSearch={setSearch} onSearchSubmit={onSearchSubmit}/>
            <>
                <Table sx={{minWidth: 750, marginTop: 2}}
                       aria-labelledby="tableTitle"
                >
                    <TableHead headCells={headCells}/>
                    {data?.length > 0 && (
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
                                        <TableCell>
                                            <img width={20} src={row.location?.flag ?? ""}
                                                 alt={row.location?.name}/> {row.location?.name}
                                        </TableCell>
                                        <TableCell align="right" sx={{
                                            maxWidth: "150px"
                                        }}>
                                            <ActionButtons userId={row.id} friendStatus={row.friendStatus}/>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>)
                    }
                </Table>
                {!data?.length && (
                    <Box sx={{
                        textAlign: "center",
                        width: "100%",
                        marginTop: 14,
                        marginBottom: 12,
                        color: theme.palette.primary.main,
                    }}>
                        <Typography
                            variant="h6"
                            component="p"
                            sx={{
                                fontWeight: 400,
                            }}
                        >
                            There are no users yet
                        </Typography>
                        <Box sx={{
                            width: 130,
                            height: 130,
                            margin: "0 auto",
                        }}>
                            <PeopleOutlineOutlinedIcon sx={{
                                width: "100%",
                                height: "100%",
                                padding: 4,
                                color: theme.palette.secondary.main,
                            }}/>
                        </Box>
                    </Box>
                )}
                <TablePagination
                    onPreviousClick={() => setPage(page - 1)}
                    onNextClick={() => setPage(page + 1)}
                    hasPreviousValues={hasPreviousPage}
                    hasNextValues={hasNextPage}
                />
            </>
        </TableContainer>
    )
}