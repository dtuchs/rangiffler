import {Box, Button, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { FC } from 'react';
import "./styles.css";

interface PhotoCardInterface {
    onDeleteClick: () => void;
    onEditClick: () => void;
}
export const PhotoCard: FC<PhotoCardInterface> = ({onDeleteClick, onEditClick}) => {
    return (
        <Grid item xs={3}>
            <Paper elevation={3}>
                <img
                    className="photo-card__image"
                    src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
                />
                <Box paddingX={1.25}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <FavoriteOutlinedIcon sx={{width: 15}}/>
                        <Typography component="p" variant="body2" marginLeft={0.5}>
                            20 likes
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <PlaceOutlinedIcon sx={{width: 18}}/>
                        <Typography component="h3" variant="subtitle1" marginLeft={0.5}>
                            Spain
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Typography component="p" variant="body2" className="photo-card__content" color="secondary">
                            The best place I've ever been. Magic memories forever. I'll be back for sure! Best, best, best
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button variant="contained" sx={{margin: 2}} onClick={onEditClick}>Edit</Button>
                        <Button sx={{margin: 2}} onClick={onDeleteClick}>Delete</Button>
                    </Box>
                </Box>
            </Paper>
        </Grid>
    );
};
