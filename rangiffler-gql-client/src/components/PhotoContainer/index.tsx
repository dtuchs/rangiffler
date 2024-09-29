import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {FC} from "react";
import {PhotoCard} from "../PhotoCard";
import {Photo} from "../../types/Photo";
import {Box, Button} from "@mui/material";
import {Loader} from "../Loader";
import {useDialog} from "../../context/DialogContext.tsx";
import {formInitialState} from "../PhotoModal/formValidate.ts";

interface PhotoContainerInterface {
    data: Photo[];
    hasNextPage: boolean;
    loadNext: () => void;
    hasPreviousPage: boolean;
    loadPrevious: () => void;
    loading: boolean;
    withFriends: boolean;
    page: number;
}

export const PhotoContainer: FC<PhotoContainerInterface> = ({
                                                                data,
                                                                hasNextPage,
                                                                loadNext,
                                                                hasPreviousPage,
                                                                loadPrevious,
                                                                loading,
                                                                withFriends,
                                                                page
                                                            }) => {
    const dialog = useDialog();

    const handleSelectImage = (image: Photo) => {
        dialog.showDialog({
            title: "Edit photo",
            isEdit: true,
            formData: {
                ...formInitialState,
                id: image.id,
                description: {
                    ...formInitialState.description,
                    value: image.description
                },
                country: {
                    ...formInitialState.country,
                    value: image.country.code,
                },
                src: {
                    ...formInitialState.src,
                    value: image.src,
                }
            },
        });
    };

    if (loading) {
        return <Loader/>;
    }

    return (
        <Container sx={{
            position: "relative",
        }}>
            {loading ?
                <Loader/> :
                <>
                    <Grid container spacing={3}>
                        {data.map((item: Photo) => (
                            <Grid item key={item.id} xs={3}>
                                <PhotoCard
                                    photo={item}
                                    onEditClick={() => handleSelectImage(item)}
                                    withFriends={withFriends}
                                    page={page}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    {
                        data?.length > 0 &&
                        (
                            <Box sx={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                            }}>
                                <Button
                                    type="button"
                                    variant="contained"
                                    disabled={!hasPreviousPage}
                                    sx={{
                                        margin: "2rem auto",
                                        display: "block",
                                        width: "100%",
                                        maxWidth: "200px",
                                    }}
                                    onClick={loadPrevious}
                                >
                                    Previous
                                </Button>
                                <Button
                                    type="button"
                                    variant="contained"
                                    disabled={!hasNextPage}
                                    sx={{
                                        margin: "2rem auto",
                                        display: "block",
                                        width: "100%",
                                        maxWidth: "200px",
                                    }}
                                    onClick={loadNext}
                                >
                                    Next
                                </Button>
                            </Box>
                        )
                    }
                </>
            }
        </Container>
    );
};