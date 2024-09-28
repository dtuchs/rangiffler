import {Box, Container, Tab, Tabs} from "@mui/material"
import {SyntheticEvent, useState} from "react";
import {TabPanel} from "../../components/TabPanel";
import {AllTable} from "../../components/PeopleTable/AllTable";
import {InvitationsTable} from "../../components/PeopleTable/InvitationsTable";
import {OutcomeInvitationsTable} from "../../components/PeopleTable/OutcomeInvitationsTable";
import {FriendsTable} from "../../components/PeopleTable/FriendsTable";

export const PeoplePage = () => {

    const [tabValue, setTabValue] = useState("friends");
    const handleChangeTab = (_event: SyntheticEvent<Element, Event>, value: string) => {
        setTabValue(value);
    }

    const resolveTab = () => {
        switch (tabValue) {
            case "all":
                return (
                    <TabPanel value="all">
                        <AllTable/>
                    </TabPanel>
                );
            case "income":
                return (
                    <TabPanel value="income">
                        <InvitationsTable/>
                    </TabPanel>
                );
            case "outcome":
                return (
                    <TabPanel value="outcome">
                        <OutcomeInvitationsTable/>
                    </TabPanel>
                );
            case "friends":
                return (
                    <TabPanel value="friends">
                        <FriendsTable/>
                    </TabPanel>
                );
        }
    }

    return (
        <Container>
            <Box sx={{width: '100%'}}>
                <Tabs value={tabValue} onChange={handleChangeTab} aria-label="People tabs">
                    <Tab label="Friends" value="friends"/>
                    <Tab label="All People" value="all"/>
                    <Tab label="Outcome invitations" value="outcome"/>
                    <Tab label="Income invitations" value="income"/>
                </Tabs>
            </Box>
            {
                resolveTab()
            }
        </Container>
    )
}