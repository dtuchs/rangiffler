import {Box, Container, Tab, Tabs } from "@mui/material"
import {SyntheticEvent,  useState } from "react";
import { TabPanel } from "../../components/TabPanel";
import { PeopleTable } from "../../components/PeopleTable";



export const PeoplePage = () => {

    const [tabValue, setTabValue] = useState('friends');
    const handleChangeTab = (_event: SyntheticEvent<Element, Event>, value: string) => {
        setTabValue(value);
    }

    return (
        <Container>
            <Box sx={{ width: '100%' }}>
                <Tabs value={tabValue} onChange={handleChangeTab} aria-label="People tabs">
                    <Tab label="Friends" value="friends" />
                    <Tab label="All People" value="all" />
                    <Tab label="Outcome invitations" value="outcome" />
                    <Tab label="Income invitations" value="income"/>
                </Tabs>
            </Box>
            <TabPanel value="all">
                <PeopleTable/>
            </TabPanel>
        </Container>
    )
}