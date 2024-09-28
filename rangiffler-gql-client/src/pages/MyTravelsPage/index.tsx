import {Box, Button, Container, Typography} from "@mui/material";
import {PhotoContainer} from "../../components/PhotoContainer";
import {WorldMap} from "../../components/WorldMap";
import {Toggle} from "../../components/Toggle";
import {useState} from "react";
import {useGetFeed} from "../../hooks/useGetFeed";
import {useDialog} from "../../context/DialogContext.tsx";
import {formInitialState} from "../../components/PhotoModal/formValidate.ts";

export const MyTravelsPage = () => {
    const [withFriends, setWithFriends] = useState(false);
    const [page, setPage] = useState(0);
    const {photos, stat, hasNextPage, hasPreviousPage, loading, fetchMore} = useGetFeed({page, withFriends});

    const dialog = useDialog();

    const handleAddClick = () => {
        dialog.showDialog({
            title: "Add photo",
            isEdit: false,
            formData: {...formInitialState,},
        });
    };

    const loadNext = () => {
        fetchMore({
            variables: {
                page: page + 1,
                size: 10,
                withFriends,
            },
        });
        setPage(page + 1);
    }

    const loadPrevious = () => {
        fetchMore({
            variables: {
                page: page - 1,
                size: 10,
                withFriends,
            },
        });
        setPage(page - 1);
    }

    return (
        <Container sx={{
            paddingBottom: 5,
        }}>
            <Typography
                variant="h4"
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
                        <Toggle withMyFriends={withFriends} setWithMyFriends={setWithFriends}/>
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
                        onClick={handleAddClick}
                    >
                        Add photo
                    </Button>
                </Box>
            </Box>
            <PhotoContainer
                withFriends={withFriends}
                loading={loading}
                data={photos}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
                loadNext={loadNext}
                loadPrevious={loadPrevious}
                page={page}
            />
        </Container>
    )
}

