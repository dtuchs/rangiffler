import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { apiClient } from "../../api/apiClient";
import { User } from "../../types/types";
import { FriendsTab } from "../FriendsTab";
import { Header } from "../Header/index";
import { PeopleTab } from "../PeopleTab/index";
import { Profile } from "../Profile/index";

export const PeopleContent: FC = () => {
    const [tab, setTab] = useState("friends");
    const [profileOpen, setProfileOpen] = useState<boolean>(false);
    const [friendsData, setFriendsData] = useState<User[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);

    useEffect(() => {
        apiClient.get("/users/1")
            .then((res) => {
                setFriendsData(res.data);
            });
    }, []);

    useEffect(() => {
        apiClient.get("/users")
            .then((res) => {
                setAllUsers(res.data);
            });
    }, []);

    const handleAddFriend = (user: User) => {
      apiClient.post("users/1", {
          ...user,
      }).then(
          (res) => {
              if(res.data) {
                  setFriendsData(res.data);
              }
          }
      )
    };

    const handleRemoveFriend = (user: User) => {
        apiClient.delete("users/1", {
            data: user,
        }).then(
            (res) => {
                if(res.data) {
                    setFriendsData(res.data);
                }
            }
        )
    };
    const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };
    const handleAvatarClick = () => {
        setProfileOpen(true);
    };

    const handleAddPhotoClick = () => {

    }

    const handleClosePopup = () => {
        setProfileOpen(false);
    }

    return (
        <>
            <Header handleAvatarClick={handleAvatarClick} handleAddPhotoClick={handleAddPhotoClick}/>
            <main className="content">
                {profileOpen && <Profile onClose={handleClosePopup}/>}
                <TabContext value={tab}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                            onChange={handleChangeTab}
                            aria-label="Tabs"
                        >
                            <Tab
                                label="Your Friends"
                                value="friends"
                            />
                            <Tab
                                label="People Around"
                                value="all"
                            />
                        </TabList>
                    </Box>
                    <TabPanel value="friends">
                        <FriendsTab friends={friendsData} handleRemoveFriend={handleRemoveFriend}/>
                    </TabPanel>
                    <TabPanel value="all">
                        <PeopleTab friends={friendsData} allUsers={allUsers} handleAddFriend={handleAddFriend}/>
                    </TabPanel>
                </TabContext>
            </main>
        </>

    );
}
