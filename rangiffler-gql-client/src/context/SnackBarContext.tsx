import {Alert, Snackbar } from '@mui/material';
import {FC, ReactNode, createContext, useContext, useState } from 'react';

type SnackBarContextActions = {
    showSnackBar: (text: string, typeColor: "error" | "success") => void;
};

const SnackBarContext = createContext({} as SnackBarContextActions);

interface SnackBarContextProviderProps {
    children: ReactNode;
}

const SnackBarProvider: FC<SnackBarContextProviderProps> = ({children}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [typeColor, setTypeColor] = useState<"error"| "success">("success");

    const showSnackBar = (text: string, color: "error" | "success") => {
        setMessage(text);
        setTypeColor(color);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <SnackBarContext.Provider value={{ showSnackBar }}>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity={typeColor}>
                    {message}
                </Alert>
            </Snackbar>
            {children}
        </SnackBarContext.Provider>
    );
};

const useSnackBar = (): SnackBarContextActions => {
    const context = useContext(SnackBarContext);

    if (!context) {
        throw new Error('useSnackBar must be used within an SnackBarProvider');
    }

    return context;
};

export { SnackBarProvider, useSnackBar };