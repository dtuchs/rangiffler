import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {Dispatch, FC, SetStateAction } from "react";
import { PhotoCard } from "../PhotoCard";
import { PhotoFormProps } from "../PhotoModal/formValidate";

interface PhotoContainerInterface {
    setSelectedImage: Dispatch<SetStateAction<PhotoFormProps | null>>;
}
export const PhotoContainer: FC<PhotoContainerInterface> = ({setSelectedImage}) => {
    
    return (
        <Container>
            <Grid container spacing={3}>
                <PhotoCard onEditClick={setSelectedImage}/>
                <PhotoCard/>
                <PhotoCard/>
                <PhotoCard/>
            </Grid>
        </Container>
    );
};