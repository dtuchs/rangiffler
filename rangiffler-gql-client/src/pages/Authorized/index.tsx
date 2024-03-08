import {useContext, useEffect } from "react";
import { Loader } from "../../components/Loader"
import {useNavigate, useSearchParams } from "react-router-dom";
import { SessionContext } from "../../context/SessionContext";
import { getTokenFromUrlEncodedParams } from "../../api/authUtils";
import { authClient } from "../../api/authClient";
import { useGetUser } from "../../hooks/useGetUser";
import { useSnackBar } from "../../context/SnackBarContext";

export const AuthorizedPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const {handleChangeUser} = useContext(SessionContext);
    const snackbar = useSnackBar();

    const getToken = async (data: URLSearchParams) => {
        const res = await authClient.getToken("oauth2/token", data);
        if (res?.id_token) {
            localStorage.setItem("id_token", res.id_token);
            setTimeout(async () => {
                const user = useGetUser();
                if (user) {
                    handleChangeUser(user);
                } else {
                    snackbar.showSnackBar(
                        "не удалось получить данные пользователя",
                        "error"
                    );
                }
            }, 500);
        } else {
            console.log("Не удалось получить токен")
        }
    };

    useEffect(() => {
        const code = searchParams?.get("code");
        const verifier = localStorage.getItem("codeVerifier");
        if(code && verifier) {
            const data = getTokenFromUrlEncodedParams(code, verifier);
            getToken(data);
        } else {
            console.log("Can not login to Cabinet")
        }
        navigate("/");
    }, []);

    return (
        <Loader/>
    )
}