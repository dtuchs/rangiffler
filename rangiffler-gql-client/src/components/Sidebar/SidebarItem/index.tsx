import { ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material"
import { FC, ReactNode } from "react";
import {Link} from 'react-router-dom';

interface SidebarItemProps {
    name: string,
    link: string,
    icon: ReactNode,
    sidebarState: boolean,
}
export const SidebarItem: FC<SidebarItemProps> = ({name, link, icon, sidebarState}) => {
    const theme = useTheme();
    return (
        <ListItem key="people" disablePadding sx={{ display: 'block' }}>
            <ListItemButton component={Link} to={link} sx={{
                minHeight: 48,
                justifyContent: sidebarState ? 'initial' : 'center',
                px: 2.5,
            }}>
                <ListItemIcon  sx={{
                    minWidth: 0,
                    mr: sidebarState ? 3 : 'auto',
                    justifyContent: 'center',
                    color: theme.palette.primary.contrastText,
                }}>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={name} sx={{ opacity: sidebarState ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
    )
}