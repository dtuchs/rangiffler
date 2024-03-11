import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: "#174536",
        },
        secondary: {
            main: "#768c7d",
        },
        error: {
            main: "#d32f2f",
        },
        info: {
            main: "#ced0cd" ,
        },
    },
});

export default theme;