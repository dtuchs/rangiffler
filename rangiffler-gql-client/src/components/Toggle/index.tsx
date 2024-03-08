import {ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useState } from "react";

export const Toggle = () => {

    const [filter, setFilter] = useState('my');

    const handleChange = (
        _event: React.MouseEvent<HTMLElement>,
        newFilter: "my" | "friends",
    ) => {
        setFilter(newFilter);
    };

    return (
        <ToggleButtonGroup
            color="primary"
            size="small"
            value={filter}
            exclusive
            onChange={handleChange}
            aria-label="Travels filter"
        >
            <ToggleButton value="my">Only my travels</ToggleButton>
            <ToggleButton value="friends">Include friends</ToggleButton>
        </ToggleButtonGroup>
    )
}