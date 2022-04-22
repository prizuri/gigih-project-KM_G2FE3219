import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPlaylistID } from "../../redux/create-slice"
import { Redirect } from "react-router-dom"

export default function CreatePlaylist() {
    const currentToken = useSelector(state => state.token.token)
    const [playlistForm, setPlaylistForm] = useState({
        title: "",
        description: ""
    })

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
        const playlistID = await handlePlaylistID(userID)
        dispatch(setPlaylistID(playlistID))
    }

    function handleChange(event) {
        const { name, value } = event.target
        setPlaylistForm(prevForm => {
            return {
                ...prevForm,
                [name]: value
            }
        })

    }

    return (
        !(currentToken) ? <Redirect to="/" /> :
            <form onSubmit={handleSubmit}>
                <p>Title</p>
                <input type="text" name="title" onChange={handleChange} minLength={10} required />
                <p>Description</p>
                <input name="description" onChange={handleChange} /><br />
                <button>Create</button>
            </form>
    )
}