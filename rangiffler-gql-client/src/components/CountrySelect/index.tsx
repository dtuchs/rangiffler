import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {Box, Chip, IconButton} from '@mui/material';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Russia',
    'Kazahkstan',
    'Belarus',
    'Thailand',
    'USA',
    'France',
    'Germany',
];

export const CountrySelect = () => {
    const [country, setCountry] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof country>) => {
        const {
            target: {value},
        } = event;
        setCountry(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleClearCountries = () => {
        setCountry([]);
    }

    return (
        <Box sx={{
            display: "flex",
            alignItens: "center",
        }}>
            <FormControl sx={{m: 1, width: 240}}>
                <InputLabel size="small" id="demo-multiple-chip-label">Countries</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    multiline={false}
                    size="small"
                    value={country}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Countries" size="small" multiline={false}/>}
                    renderValue={(selected) => (
                        <Box
                            sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5, maxHeight: '200px', overflowY: 'scroll'}}>
                            {selected.map((value) => (
                                <Chip key={value} label={value}/>
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                        >
                            {name}
                        </MenuItem>
                    ))}

                </Select>
            </FormControl>
            <IconButton color="primary" aria-label="Clear country filters" onClick={handleClearCountries}
                        disabled={country.length === 0}>
                <FilterAltOffIcon/>
            </IconButton>
        </Box>
    );
}