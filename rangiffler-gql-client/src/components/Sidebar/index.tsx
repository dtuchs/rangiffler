import {Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { FC } from "react";

export const Sidebar: FC = () => {
    const [sidebarState, setSidebarState] = React.useState(false);
    const toggleDrawer = (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            setSidebarState(open);
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <div>
            {(['left']).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(true)}>{anchor}</Button>
                    <Drawer
                        anchor="left"
                        open={sidebarState}
                        onClose={toggleDrawer(false)}
                    >
                        <Box
                            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
                            role="presentation"
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                        >
                            <List>
                                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                            <Divider />
                            <List>
                                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
};