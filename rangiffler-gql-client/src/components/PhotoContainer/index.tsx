import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {FC} from "react";
import {PhotoCard} from "../PhotoCard";
import {Photo} from "../../types/Photo";
import {Button} from "@mui/material";
import {Loader} from "../Loader";
import {useDialog} from "../../context/DialogContext.tsx";
import {formInitialState} from "../PhotoModal/formValidate.ts";

interface PhotoContainerInterface {
    data: Photo[];
    hasNextPage: boolean;
    loadMore: () => void;
    loading: boolean
}

export const PhotoContainer: FC<PhotoContainerInterface> = ({data, hasNextPage, loadMore, loading}) => {
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
                                />
                            </Grid>
                        ))}
                    </Grid>
                    {
                        hasNextPage &&
                        <Button
                            type="button"
                            variant="contained"
                            sx={{
                                margin: "2rem auto",
                                display: "block",
                            }}
                            onClick={loadMore}
                        >
                            Next
                        </Button>
                    }
                </>
            }
        </Container>
    );
};