import { TableHead as MuiTableHead, TableCell, TableRow} from "@mui/material";
import { HeadCell } from "../HeadCell";


interface TableProps {
    headCells: readonly HeadCell[];
}


export const TableHead = (props: TableProps) => {
    const {  headCells } = props;

    return (
        <MuiTableHead>
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