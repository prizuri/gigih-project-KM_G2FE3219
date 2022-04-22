import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPlaylistID } from "../../redux/create-slice"
import { Redirect } from "react-router-dom"
import TextField from '@mui/material/TextField';
import { Button} from "@mui/material"
import  "../../assets/styles/create-playlist.css"

export default function CreatePlaylist() {
    const currentToken = useSelector(state => state.token.token)
    const [playlistForm, setPlaylistForm] = useState({
        title: "",
        description: ""
    })
    const [titleError, setTitleError] = useState(false)
    const [textHelper, setTextHelper] = useState("")
    const dispatch = useDispatch()
    const handleUserID = async (token) => {
        try {
            const response = await axios({
                method: "GET",
                url: "https://api.spotify.com/v1/me",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const { id } = response.data
            return id
        }
        catch (error) {
            alert(error) 
        }
    }

    const handlePlaylistID = async (userID) => {
        try {
            const response = await axios({
                method: "POST",
                url: `https://api.spotify.com/v1/users/${userID}/playlists`,
                data: {
                    "name": playlistForm.title,
                    "description": playlistForm.description,
                    "public": false,
                    "collaborative": false
                },
                headers: {
                    Authorization: `Bearer ${currentToken}`
                }
            })
            const { id } = response.data
            return id
        }
        catch (error) {
            alert(error) 
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const userID = await handleUserID(currentToken)
        const title = playlistForm.title
        if (title.length >= 10) {
            const playlistID = await handlePlaylistID(userID)
            dispatch(setPlaylistID(playlistID))
        }
    }

    function handleChange(event) {
        const { name, value } = event.target
        setPlaylistForm(prevForm => {
            return {
                ...prevForm,
                [name]: value
            }
        })
        if (value.length < 10) {
            setTextHelper("the length should > 10")
            setTitleError(true)
        } else {
            setTextHelper("")
            setTitleError(false)
        }
    }

    return (
        !(currentToken) ? <Redirect to="/" /> :
            <form className="flex-container"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField  className="flex-item flex-input" name="title" label="Title" variant="outlined" onChange={handleChange} error={titleError} helperText={textHelper} required /><br/>
                <TextField  className="flex-item flex-input" label="Description" variant="outlined" name="description" onChange={handleChange} /><br/>
                <Button  className="flex-item flex-button" variant="outlined" type="submit">
                    Create Playlist
                </Button>
            </form>
    )
}