import {Avatar, Box, Checkbox, Container, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material"
import { TableToolbar } from "../../components/Table/TableToolbar"
import {useMemo, useState } from "react";
import { TableHead } from "../../components/Table/TableHead";
import { Order } from "../../types/Order";
import { HeadCell } from "../../components/Table/HeadCell";
import { stableSort } from "../../utils/arrays";
import { getComparator } from "../../utils/comparator";

interface Data {
    id: string;
    avatar: string;
    username: string;
    name: string;
    surname: string;
    location: string;
    visited: number;
}
function createData(
    id: string,
    avatar: string,
    username: string,
    name: string,
    surname: string,
    location: string,
    visited: number,
): Data {
    return {
        id,
        avatar,
        username,
        name,
        surname,
        location,
        visited,
    };
}
const rows = [
    createData(
        "1",
        "https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
        ,
        "dtuchs",
        "Dmitry",
        "Tuchs",
        "Kazakhstan",
        10),
];

const headCells: readonly HeadCell[] = [
    {
        id: 'avatar',
        numeric: false,
        disablePadding: true,
        label: 'Avatar',
    },
    {
        id: 'username',
        numeric: false,
        disablePadding: false,
        label: 'Username',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'surname',
        numeric: false,
        disablePadding: false,
        label: 'Surname',
    },
    {
        id: 'country',
        numeric: false,
        disablePadding: false,
        label: 'Location',
    },
    {
        id: 'visited',
        numeric: true,
        disablePadding: false,
        label: 'Visited countries',
    },
];
export const PeoplePage = () => {
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<string>('calories');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const handleRequestSort = (
        _event: React.MouseEvent<unknown>,
        property: string,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    return (
        <Container>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableToolbar numSelected={selected.length} tableHeader="People around"/>
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }}
                               aria-labelledby="tableTitle"
                        >
                            <TableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                                headCells={headCells}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                <Avatar sx={{width: 48, height: 48}}
                                                        src={row.avatar}
                                                        alt={row.username}
                                                />
                                            </TableCell>
                                            <TableCell>{row.username}</TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.surname}</TableCell>
                                            <TableCell>{row.location}</TableCell>
                                            <TableCell align="right">{row.visited}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </Container>
    )
}