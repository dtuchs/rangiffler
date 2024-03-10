import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {Dispatch, FC, SetStateAction, useState } from "react";
import { PhotoCard } from "../PhotoCard";
import { PhotoFormProps } from "../PhotoModal/formValidate";
import { useGetPhotos } from "../../hooks/useGetPhotos";
import { Photo } from "../../types/Photo";

interface PhotoContainerInterface {
    setSelectedImage: Dispatch<SetStateAction<PhotoFormProps | null>>;
}
export const PhotoContainer: FC<PhotoContainerInterface> = ({setSelectedImage}) => {
    const [page, setPage] = useState(0);
    const {data, hasNextPage, hasPreviousPage} = useGetPhotos({page});

    return (
        <Container>
            <Grid container spacing={3}>
                {data.map((item: Photo) => (
                    <Grid item key={item.id} xs={3}>
                    <PhotoCard
                        photo={item}
                        onEditClick={setSelectedImage}
                    />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};