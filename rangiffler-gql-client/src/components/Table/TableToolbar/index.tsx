import {IconButton, InputBase, Paper, Toolbar, useTheme } from "@mui/material";
import { FC, FormEvent, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';


interface TableToolbarProps {
    setSearch: (value: string) => void;
    onSearchSubmit: () => void;
}

export const TableToolbar: FC<TableToolbarProps> = ({setSearch, onSearchSubmit}) => {
    const [value, setValue] = useState("");
    const theme = useTheme();

    const handleSubmitSearch = (e: FormEvent) => {
        e.preventDefault();
        setSearch(value);
        onSearchSubmit();
    }

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                pt: { sm: 1},
                backgroundColor: theme.palette.info.main,
            }}
        >
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
                onSubmit={handleSubmitSearch}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search people"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    inputProps={{ 'aria-label': 'search people' }}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        </Toolbar>
    );
}