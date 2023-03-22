import React, {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {apiClient} from "../../api/apiClient";
import {Photo, User} from "../../types/types";
import {FriendsPopup} from "../FriendsPopup/index";
import {Header} from "../Header/index";
import {PhotoCard} from "../PhoroCard/index";
import {Popup} from "../Popup/index";
import {Profile} from "../Profile/index";

export type LayoutContext = {
  handlePhotoClick: (item: Photo) => void;
  initSubmitPopupAndOpen: (text: string, onSubmit: () => void) => void;
};

export const Layout = () => {
  const [photoCardOpen, setPhotoCardOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [friendsPopupOpen, setFriendsPopupOpen] = useState<boolean>(false);
  const [submitPopupOpen, setSubmitPopupOpen] = useState<boolean>(false);
  const [submitPopupData, setSubmitPopupData] = useState<{ text: string, onSubmit: () => void }>({
    text: "",
    onSubmit: () => {
    },
  });
  const [selectedItem, setSelectedItem] = useState<Partial<Photo> | null>(null);

  const [friendsData, setFriendsData] = useState<User[]>([]);

  useEffect(() => {
    apiClient.get("/friends")
    .then((res) => {
      setFriendsData(res.data);
    });
  }, []);

  const initSubmitPopupAndOpen = (text: string, onSubmit: () => void) => {
    setSubmitPopupData({text, onSubmit});
    setSubmitPopupOpen(true);
    setPhotoCardOpen(false);
    setProfileOpen(false);
    setFriendsPopupOpen(false);
  };


  const handleDeleteFriend = (user: User) => {
    initSubmitPopupAndOpen("Delete friend?", () => {
      apiClient.post("friends/remove", {
        ...user
      }).then(() => {
        setFriendsData(friendsData.filter(f => f.id !== user.id));
      });
    });
  };

  const handleAddPhotoClick = () => {
    setSelectedItem(null);
    setPhotoCardOpen(true);
    setProfileOpen(false);
    setSubmitPopupOpen(false);
  }

  const handleAvatarClick = () => {
    setProfileOpen(true);
    setPhotoCardOpen(false);
    setSubmitPopupOpen(false);
  };

  const handleClosePopup = () => {
    setPhotoCardOpen(false);
    setProfileOpen(false);
    setSubmitPopupOpen(false);
    setFriendsPopupOpen(false);
    setSelectedItem(null);
  }

  const handlePhotoClick = (item: Photo) => {
    setSelectedItem(item);
    setPhotoCardOpen(true);
    setProfileOpen(false);
    setSubmitPopupOpen(false);
    setFriendsPopupOpen(false);
  };

  const handleFriendsIconClick = () => {
    setPhotoCardOpen(false);
    setProfileOpen(false);
    setSubmitPopupOpen(false);
    setFriendsPopupOpen(true);
  };

  return (
      <div className="App">
        <Header handleAvatarClick={handleAvatarClick} handleAddPhotoClick={handleAddPhotoClick}
                handleFriendsIconClick={handleFriendsIconClick} friends={friendsData}/>
        <main className="content">
          {photoCardOpen &&
              <PhotoCard key={selectedItem?.src} photo={selectedItem} onClose={handleClosePopup}
                         initSubmitPopupAndOpen={initSubmitPopupAndOpen}/>}
          {profileOpen && <Profile onClose={handleClosePopup}/>}
          {submitPopupOpen && <Popup onSubmit={submitPopupData.onSubmit} onClose={handleClosePopup}
                                     text={submitPopupData.text}/>}
          {friendsPopupOpen && <FriendsPopup friends={friendsData} onClose={handleClosePopup}
                                             handleRemoveFriend={handleDeleteFriend}/>}
          <Outlet context={{handlePhotoClick, initSubmitPopupAndOpen}}/>
        </main>
      </div>
  );
}
