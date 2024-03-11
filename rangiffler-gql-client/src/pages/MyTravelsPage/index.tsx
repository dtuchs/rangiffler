import {Box, Button, Container, Typography} from "@mui/material";
import {PhotoContainer} from "../../components/PhotoContainer";
import {WorldMap} from "../../components/WorldMap";
import {Toggle} from "../../components/Toggle";
import {useState} from "react";
import { PhotoModal } from "../../components/PhotoModal";
import {PhotoFormProps, formInitialState} from "../../components/PhotoModal/formValidate";
import { Photo } from "../../types/Photo";
import { useGetFeed } from "../../hooks/useGetFeed";

export const MyTravelsPage = () => {
    const [modalState, setModalState] = useState<{ isVisible: boolean, formData: PhotoFormProps | null, }>({
        isVisible: false,
        formData: null
    });

    const [withMyFriends, setWithMyFriends] = useState(false);
    const [page, setPage] = useState(0);
    const {photos, stat} = useGetFeed({page, withFriends: withMyFriends});

    const handleSelectImage = (photo: Photo) => {
        setModalState({
            isVisible: true,
            formData: {...formInitialState,
                    description: {
                    ...formInitialState.description,
                        value: photo.description
                    },
                    src: {
                    ...formInitialState.src,
                        value: photo.src,
                    }
                }
        });
    }

    return (
        <Container sx={{
            paddingBottom: 5,
        }}>
            <Typography
                variant="h5"
                component="h2"
                sx={{
                    marginBottom: 2,
                }}
            >
                Travels map
            </Typography>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItens: "center",
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: 'column',
                }}>
                    <Box sx={{
                        margin: 1,
                    }}>
                        <Toggle withMyFriends={withMyFriends} setWithMyFriends={setWithMyFriends}/>
                    </Box>
                </Box>
                <WorldMap data={stat}/>
                <Box>
                    <Button
                        variant="contained"
                        sx={{
                            margin: 1,
                            marginLeft: "auto",
                        }}
                        onClick={() => {
                            setModalState({
                                isVisible: true,
                                formData: null,
                            })
                        }}
                    >Add photo
                    </Button>
                </Box>
            </Box>
            <PhotoContainer onSelectImage={handleSelectImage} data={photos}/>
            <PhotoModal
                modalState={modalState}
                isEdit={!!(modalState.formData)}
                onClose={() => {
                    setModalState({
                        isVisible: false,
                        formData: null,
                    });
                }}
            />
        </Container>
    )
}

