import { LoadingButton } from "@mui/lab";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia, Grid,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import React, { FC, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

export type PhotoCardType = {
    src?: string;
    description?: string;
    country?: string;

    onClose: () => void;
};
export const PhotoCard: FC<PhotoCardType> = ({src, description, country, onClose}) => {

    const [edit, setEdit] = useState<boolean>(false);
    const onEditClick = () => {
        setEdit((prevState) => !prevState);
    };

    return (
        <Box sx={{
            position: "fixed",
            zIndex: "5",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
        }}
             width="600px">
            <Card>
                <CardActions sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                }}>
                    <IconButton size='small'>
                        <EditIcon onClick={onEditClick}/>
                    </IconButton>
                    <IconButton size='small'>
                        <CloseIcon onClick={onClose}/>
                    </IconButton>
                </CardActions>
                <CardMedia
                    sx={{
                        maxHeight: "500px",
                    }}
                    component="img"
                    image={src}
                    alt={description}
                />
                <CardContent>
                    {
                        edit ? (
                             <>
                                 <form>
                                     <Grid container width="100%" direction="column" sx={{
                                         justifyContent: "center",

                                     }}>
                                         <Grid item sx={{textAlign: "center"}}>
                                             <TextField
                                                 sx={{
                                                     width: "80%",
                                                     margin: "12px",
                                                 }}
                                                 label='Country'
                                                 size='small' />
                                         </Grid>
                                         <Grid item sx={{textAlign: "center"}}>
                                             <TextField
                                                 sx={{
                                                     width: "80%",
                                                     margin: "12px",
                                                 }}
                                                 label='Description'
                                                 size='small' />
                                         </Grid>
                                         <Grid item sx={{textAlign: "center"}}>
                                             <LoadingButton>Save</LoadingButton>
                                         </Grid>
                                     </Grid>
                                 </form>
                             </>)
                            : (<>
                                    <Typography gutterBottom variant="h5" component="p">
                                        {country}
                                    </Typography>
                                    <Typography variant="body2">
                                        {description}
                                    </Typography>
                                </>)
                    }
                </CardContent>
            </Card>
        </Box>
    )
};
