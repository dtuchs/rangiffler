import {createTheme} from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: "#174536",
        },
        secondary: {
            main: "#768c7d",
            light: "#FAFAFD",
        },
        error: {
            main: "#d32f2f",
        },
        info: {
            main: "#ced0cd",
        },
    },
    typography: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderRadius: "8px",
                    border: "1px solid #E4E6F1",
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: "12px 16px",
                    borderRadius: "8px"
                }
            }
        },
    }
});

export default theme;