import {Box, Button, Container, Typography} from "@mui/material";
import {PhotoContainer} from "../../components/PhotoContainer";
import {WorldMap} from "../../components/WorldMap";
import {CountrySelect} from "../../components/CountrySelect";
import {Toggle} from "../../components/Toggle";
import {useState} from "react";
import { PhotoModal } from "../../components/PhotoModal";
import {PhotoFormProps} from "../../components/PhotoModal/formValidate";

export const MyTravelsPage = () => {
    const [modalState, setModalState] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<PhotoFormProps | null>(null);

    return (
        <Container>
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
                        <Toggle/>
                    </Box>
                    <CountrySelect/>
                </Box>
                <WorldMap/>
                <Box>
                    <Button
                        variant="contained"
                        sx={{
                            margin: 1,
                            marginLeft: "auto",
                        }}
                        onClick={() => {
                            setModalState(true)
                        }}
                    >Add photo
                    </Button>
                </Box>
            </Box>
            <PhotoContainer setSelectedImage={setSelectedImage}/>
            <PhotoModal 
                modalState={modalState}
                isEdit={Boolean(selectedImage)}
                formData={selectedImage}
                onClose={() => {
                    setModalState(false);
                    setSelectedImage(null);
                }}
            />
        </Container>
    )
}