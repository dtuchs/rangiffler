import { TableHead as MuiTableHead, TableCell, TableRow, useTheme} from "@mui/material";
import { HeadCell } from "../HeadCell";


interface TableProps {
    headCells: readonly HeadCell[];
}



export const TableHead = (props: TableProps) => {
    const theme = useTheme();
    const {  headCells } = props;

    return (
        <MuiTableHead sx={{
            backgroundColor: theme.palette.info.main,
        }}>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={'normal'}
                    >
                            {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </MuiTableHead>
    );
}