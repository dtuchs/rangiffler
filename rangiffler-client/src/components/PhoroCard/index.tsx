import { LoadingButton } from "@mui/lab";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia, Grid,
    IconButton, MenuItem,
    TextField,
    Typography
} from "@mui/material";
import React, { FC, useContext, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { CountryContext } from "../../context/CountryContext/index";
import { Photo } from "../../types/types";
import { ImageUpload } from "../ImageUpload/index";
import imageMock from "@img/uploadImageMock.jpg";

interface PhotoCardInterface {
    photo: Partial<Photo> | null;
    onClose: () => void;
}
export const PhotoCard: FC<PhotoCardInterface> = ({photo, onClose}) => {
    const {countries} = useContext(CountryContext);
    const [photoData, setPhotoData] = useState<Partial<Photo> | null>(photo);
    const [edit, setEdit] = useState<boolean>(photo === null);
    const onEditClick = () => {
        setEdit((prevState) => !prevState);
    };
    const selectOptions = countries?.map(country => (<MenuItem value={country.code}>{country.name}</MenuItem>));

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
                    {
                        photo &&
                        (<IconButton size='small'>
                            <EditIcon onClick={onEditClick}/>
                        </IconButton>)
                    }
                    <IconButton size='small'>
                        <CloseIcon onClick={onClose}/>
                    </IconButton>
                </CardActions>
                <CardContent sx={{
                    width: "500px",
                    margin: "0 auto",
                }}>
                    {
                        edit ? (
                             <>
                                 <form>
                                     <Grid container direction="column" sx={{
                                         justifyContent: "center",
                                     }}>
                                         <Grid item sx = {{
                                             display: "flex",
                                             textAlign: "center",
                                             position: "relative",
                                             justifyContent: "center",

                                         }}>
                                         <CardMedia
                                             sx={{
                                                 width: "500px",
                                                 height: "500px",
                                                 objectFit: "fit-content"
                                             }}
                                             component="img"
                                             image={ photoData?.src || imageMock}
                                             alt="New image"
                                         />
                                         <Grid sx={{
                                             position: "absolute",
                                             right: "10%",
                                             top: "85%",
                                         }}>
                                             { !photo?.src &&
                                                 <ImageUpload
                                                     handlePhotoChange={(photo) => setPhotoData({
                                                         ...photoData,
                                                         src: photo,
                                                     })}                                                 />
                                             }
                                         </Grid>
                                     </Grid>
                                     <Grid item sx={{textAlign: "center"}}>
                                         <TextField
                                             sx={{
                                                 width: "500px",
                                                 margin: "12px",
                                                 textAlign: "left"
                                             }}
                                             select
                                             required
                                             label="Country"
                                             size="small"
                                             value={photoData?.countryCode}
                                             onChange={event =>  setPhotoData({
                                                 ...photoData,
                                                 countryCode: event.target.value
                                             })}>
                                             {selectOptions}
                                         </TextField>
                                     </Grid>
                                     <Grid item sx={{textAlign: "center"}}>
                                         <TextField
                                             multiline
                                             minRows={2}
                                             maxRows={5}
                                             sx={{
                                                 width: "500px",
                                                 margin: "12px",
                                             }}
                                             label='Description'
                                             size='small'
                                             value={photoData?.description}
                                             onChange={event =>  setPhotoData({
                                                 ...photoData,
                                                 description: event.target.value
                                             })}
                                         />
                                     </Grid>
                                     <Grid item sx={{textAlign: "center"}}>
                                         <LoadingButton variant="contained" type="submit">Save</LoadingButton>
                                     </Grid>
                                 </Grid>
                             </form>
                         </>)
                        : (
                            <>
                                <CardMedia
                                    sx={{
                                        width: "500px",
                                        height: "500px",
                                        objectFit: "fit-content"
                                    }}
                                    component="img"
                                    image={photo?.src}
                                    alt={photo?.description}
                                />
                                <Typography gutterBottom variant="h5" component="p">
                                    {photo?.countryCode}
                                </Typography>
                                <Typography variant="body2">
                                    {photo?.description}
                                </Typography>
                            </>)
                }
            </CardContent>
        </Card>
    </Box>
)
};
