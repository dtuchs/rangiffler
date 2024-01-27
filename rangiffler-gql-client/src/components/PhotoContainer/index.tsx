import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { FC } from "react";
import { PhotoCard } from "../PhotoCard";

export const PhotoContainer: FC = () => {
    return (
        <Container>
            <Grid container spacing={3}>
                <PhotoCard/>
                <PhotoCard/>
                <PhotoCard/>
                <PhotoCard/>
            </Grid>
        </Container>
    );
};