import {Box, Button, Grid, MenuItem, Modal as MuiModal, TextField, Typography} from "@mui/material";
import {ChangeEvent, FormEvent, FC, useState } from "react";
import { ImageUpload } from "../ImageUpload";
import { PhotoFormProps, formHasErrors, formValidate } from "./formValidate";
import { useCountries } from "../../context/CountriesContext";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const formInitialState: PhotoFormProps = {
    description: {
        value: "",
        error: false,
        errorMessage: "",
    },
    country: {
        value: "KZ",
        error: false,
        errorMessage: "",
    },
    src: {
        value: undefined,
        error: false,
        errorMessage: "",
    }
};


interface PhotoModalInterface {
    modalState: boolean;
    onClose: () => void;
    formData: PhotoFormProps | null;
    isEdit: boolean;
}

export const PhotoModal: FC<PhotoModalInterface> = ({modalState, onClose, formData, isEdit = false}) => {
    const {countries} = useCountries();

    const [formValues, setFormValues] = useState<PhotoFormProps>(formData ?? formInitialState);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormValues({
            ...formValues,
            [name]: {
                ...formValues[name],
                value,
            }
        })
    };

    const handleClose = () => {
        onClose();
        setFormValues(formInitialState);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validatedData = formValidate(formValues);
        setFormValues(validatedData);
        if (!formHasErrors(validatedData)) {
            // update data, clear fields, close modal
            handleClose();
        } else {

        }
    };

    return (
        <MuiModal
            open={modalState}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form" noValidate onSubmit={handleSubmit}>
                <Typography id="modal-modal-title" variant="h5" component="h2" sx={{textAlign: "center"}}>
                    Add new photo
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {
                            isEdit ? 
                                <img src={formValues.src.value} alt={formValues.description.value ?? "Фото пользователя"}/>
                            :
                            <ImageUpload
                                buttonText="Upload new image"
                                file={formValues.src.value}
                                error={formValues.src.error}
                                helperText={formValues.src.error ? formValues.src.errorMessage: ""}
                                onFileUpload={(file) => {
                                    setFormValues({...formValues, src: {
                                            ...formValues.src,
                                            value: file,
                                        }})
                                }}/>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="country"
                            select
                            value={formValues.country.value}
                            error={formValues.country.error}
                            helperText={formValues.country.error && formValues.country.errorMessage}
                            onChange={handleChange}
                            required
                            label="Country"
                            fullWidth
                        >
                            {countries.map((option) => (
                                <MenuItem key={option.code} value={option.code}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="description"
                            name="description"
                            placeholder="About this photo"
                            label="Description"
                            type="text"
                            value={formValues.description.value}
                            onChange={handleChange}
                            error={formValues.description.error}
                            helperText={formValues.description.error && formValues.description.errorMessage}
                            fullWidth
                            multiline
                            maxRows={4}
                        />
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Button variant="contained" sx={{margin: 2}} type="submit">Save</Button>
                    <Button sx={{margin: 2}} onClick={handleClose}>Close</Button>
                </Box>
            </Box>
        </MuiModal>
    );
}