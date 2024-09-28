import {TableCell, TableHead as MuiTableHead, TableRow, useTheme} from "@mui/material";
import {HeadCell} from "../HeadCell";


interface TableProps {
    headCells: readonly HeadCell[];
}


export const TableHead = (props: TableProps) => {
    const theme = useTheme();
    const {headCells} = props;

    return (
        <MuiTableHead sx={{
            backgroundColor: theme.palette.secondary.main,
        }}>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={'normal'}
                        sx={{
                            color: theme.palette.secondary.light,
                            fontWeight: 600,
                        }}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </MuiTableHead>
    );
}