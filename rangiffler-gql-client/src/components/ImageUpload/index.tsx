import {Avatar, Box, Button, useTheme} from "@mui/material"
import {ChangeEvent, FC} from "react";
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';
import "./styles.css";

interface ImageUploadInterface {
    onFileUpload: (newFile?: string) => void;
    buttonText: string;
    error: boolean;
    file?: string;
    helperText?: string;
    isAvatar?: boolean
}

export const ImageUpload: FC<ImageUploadInterface> = ({
                                                          onFileUpload,
                                                          buttonText,
                                                          file,
                                                          error = false,
                                                          helperText,
                                                          isAvatar = false
                                                      }) => {

    const theme = useTheme();

    const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function () {
            onFileUpload(reader.result?.toString());
        };
    };

    return (
        <Box sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            flexDirection: "column",
        }}>
            <input
                accept={"image/*"}
                id="image__input"
                type="file"
                hidden
                onChange={handleUpload}
            />
            {isAvatar ? (
                <Box sx={{margin: "0 auto"}}>
                    <Avatar src={file} sx={{width: 220, height: 220}}/>
                </Box>
            ) : (
                <Box sx={{
                    margin: "0 auto",
                    width: "300px",
                    height: "300px"
                }}>
                    {
                        file ? (
                                <img
                                    className="image-upload__image"
                                    src={file}
                                    width="100%"
                                    height="100%"
                                />
                            ) :
                            <PhotoCameraRoundedIcon
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    padding: 5,
                                    color: theme.palette.primary.main,
                                    border: `2px solid ${theme.palette.primary.main}`,
                                    borderRadius: 3,
                                }}
                            />
                    }
                </Box>
            )}
            <label htmlFor="image__input">
                <Button variant="contained" component="span" sx={{marginTop: 1}}>{buttonText}</Button>
            </label>
            <Box sx={{
                color: theme.palette.error.main
            }}>{error && helperText}</Box>
        </Box>
    );
}