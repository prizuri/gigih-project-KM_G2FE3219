import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { setToken } from "../../redux/token-slice"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function UserAuth() {
    const dispatch = useDispatch()
    const currentToken = useSelector(state => state.token.token)
    const hash = window.location.hash
    if (!currentToken && hash) {
        let token = hash.substring(1).split("&").find(element => element.startsWith("access_token")).split("=")[1]
        dispatch(setToken(token))
    }

    function handleLogin() {
        const BASE_URL = "https://accounts.spotify.com/authorize"
        const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
        const REDIRECT_URL_AFTER_LOGIN = "https://spotify-hehe-by-priz.vercel.app/login-success"
        const SCOPE = ["playlist-modify-private", "user-read-private"]
        const TOKEN = "token"
        const SHOW_DIALOG = true
        window.location = `${BASE_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPE}&response_type=${TOKEN}&show_dialog=${SHOW_DIALOG}`
    }

    return (
        !(currentToken) ?
            <Box textAlign='center'>
                <Button variant="outlined" className="login" onClick={handleLogin}>Login Spotify</Button>
            </Box>
            :
            <Redirect to="/create-playlist" />
    )
}