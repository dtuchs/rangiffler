import {Avatar, Box, Button, Container, Grid, MenuItem, TextField, Typography } from "@mui/material"
import { MenuAppBar } from "../../components/MenuAppBar"

export const ProfilePage = () => {
    const countries = [
        {
            value: 'RU',
            label: 'Russia',
        },
        {
            value: 'GE',
            label: 'Germany',
        },
        {
            value: 'KZ',
            label: 'Kazakhstan',
        },
    ];

    return (
        <>
            <MenuAppBar/>
            <Container>
                <Grid
                    container
                    spacing={0}
                    sx={{
                        marginTop: 5,
                    }}
                >
                    <Grid item xs={4} sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}>
                        <input accept={"image/*"} id="avatar__input" type="file" hidden/>
                        <label htmlFor="avatar__input">
                            <Avatar src="" sx={{width: 220, height: 220}}/>
                            <Button variant="contained" sx={{margin: 5}}>Update avatar</Button>
                        </label>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{
                                marginBottom: 3,
                            }}
                        >
                            My profile
                        </Typography>
                        <form>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid item xs={6}>
                                    <TextField
                                        id="firstName"
                                        name="name"
                                        label="Name"
                                        type="text"
                                        value="Dmitry"
                                        onChange={() => {}}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="lastName"
                                        name="lastName"
                                        label="Surname"
                                        type="text"
                                        value="Tuchs"
                                        onChange={() => {}}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="username"
                                        name="username"
                                        label="Username"
                                        type="text"
                                        value="dtuchs"
                                        onChange={() => {}}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="location"
                                        select
                                        defaultValue="KZ"
                                        label="Location"
                                        fullWidth
                                    >
                                        {countries.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={8} sx={{
                                    margin: "0 auto",
                                }}>
                                    <Box sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: "100%",
                                    }}>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                            margin: 2,
                                            width: "100%",
                                            }}
                                            disabled
                                        >Reset</Button>
                                        <Button
                                            variant="contained"
                                            sx={{
                                            margin: 2,
                                            width: "100%",
                                            }}
                                            disabled
                                        >Save</Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}