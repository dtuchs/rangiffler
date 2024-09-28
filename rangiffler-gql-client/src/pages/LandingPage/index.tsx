import {Box, Button, Grid, Typography} from "@mui/material";
import deerLogo from "./../../assets/deer-logo.svg";
import "./styles.css";
import {Navigate} from "react-router-dom";
import {initLocalStorageAndRedirectToAuth} from "../../api/authUtils";
import {Loader} from "../../components/Loader";
import {useGetUser} from "../../hooks/useGetUser";

export const LandingPage = () => {
    const {data, loading} = useGetUser();
    const onLoginClick = () => {
        initLocalStorageAndRedirectToAuth();
    }

    return (
        loading ?
            (<Loader/>) :
            data ?
                (
                    <Navigate to="/my-travels" replace={true}/>
                ) :
                (
                    <Box className="landing__wrapper">
                        <Grid
                            container
                            spacing={0}
                            className="landing__container"
                            width={"70%"}>
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    maxWidth: "100%",
                                    width: "100%",
                                }}
                                className="landing__hero">
                            </Grid>
                            <Grid item xs={6} className="landing__content">
                                <Typography
                                    variant="h3"
                                    component="h2"
                                    sx={{
                                        fontWeight: "bold",
                                        margin: 2,
                                    }}
                                    className="landing__header">
                                    <span className="landing__header-accent">R</span>angiffler
                                </Typography>
                                <img className="landing__logo"
                                     src={deerLogo}
                                     width="90"
                                     alt="Rangiffler logo"/>
                                <Box sx={{margin: 2}}>
                                    <Typography>
                                        Share your best places with Rangiffler
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        className="landing__content-button"
                                        sx={{margin: 2, marginBottom: 4}}
                                        onClick={onLoginClick}
                                    >Login
                                    </Button>
                                    <Typography>
                                        If you don't have account, we're waiting for you to join our journey
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        className="landing__content-button"
                                        sx={{margin: 2}}
                                        component="a"
                                        href={`${import.meta.env.VITE_AUTH_URL}/register`}>
                                        Register
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                )
    );
};