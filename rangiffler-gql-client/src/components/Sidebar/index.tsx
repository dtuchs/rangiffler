import {Box, List, useTheme} from "@mui/material";
import {FC} from "react";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import {SidebarItem} from "./SidebarItem";
import {DrawerHeader} from "../Drawer/DrawerHeader";
import {Drawer} from "../Drawer";

interface SidebarProps {
    sidebarState: boolean,
}

export const Sidebar: FC<SidebarProps> = ({sidebarState}) => {
    const theme = useTheme();

    return (
        <Drawer
            anchor="left"
            open={sidebarState}
            variant="permanent"
            sx={{
                '& .MuiDrawer-paper': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                }
            }}
        >
            <DrawerHeader/>
            <Box sx={{width: 250, overflow: "auto"}}>
                <List>
                    <SidebarItem
                        sidebarState={sidebarState}
                        name="Profile"
                        icon={<AccountCircleRoundedIcon/>}
                        link="/profile"
                    />
                    <SidebarItem
                        sidebarState={sidebarState}
                        name="My map"
                        icon={<PublicRoundedIcon/>}
                        link="/my-travels"
                    />
                    <SidebarItem
                        sidebarState={sidebarState}
                        name="People"
                        icon={<PersonSearchRoundedIcon/>}
                        link="/people"
                    />
                </List>
            </Box>
        </Drawer>
    );
};