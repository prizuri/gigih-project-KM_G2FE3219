import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { musicList, setQuery } from "../../redux/create-slice"
import React, { useState } from "react"
import "../../assets/styles/music.css"
import { Button } from "@mui/material"
import TextField from '@mui/material/TextField';
import  "../../assets/styles/create-playlist.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function Search() {
    const currentMusics = useSelector(state => state.user.musics)
    const currentToken = useSelector(state => state.token.token)
    const currentQuery = useSelector(state => state.user.query)
    const playlistID = useSelector(state => state.user.playlistID)
    const [isSelect, setIsSelect] = useState({})
    let uri = ""
    const dispatch = useDispatch()

    async function handleSearch(event) {
        event.preventDefault()
        try {
            const response = await axios({
                method: "GET",
                url: "https://api.spotify.com/v1/search",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentToken}`
                },
                params: {
                    q: currentQuery,
                    type: "track"
                }
            })
            const { items } = response.data.tracks
            dispatch(musicList(items))
        }
        catch {
            (dispatch(musicList([])))
        }
    }
    async function fetchAddItem(uri) {
        try {
            await axios({
                method: "POST",
                url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
                params: {
                    uris: uri,
                    position: 0
                },
                headers: {
                    Authorization: `Bearer ${currentToken}`
                }
            })
        }
        catch (error) {
            alert(error)
        }
    }

    return (
        <div>
            {
                !playlistID ?
                    <span></span>
                    :
                    <div>
                        <form className="flex-container" onSubmit={handleSearch}>
                            <TextField className="flex-item flex-input" name="search" label="Search" variant="outlined" onChange={e => dispatch(setQuery(e.target.value))} required /><br />
                            <Button variant="contained" type="submit">Search</Button>
                        </form>
                        <Card className="grid-container" sx={{ minWidth: 275 }}>
                            {currentMusics.length !== 0 &&
                                currentMusics.map(track => {
                                    return (
                                        <CardContent key={track.uri} className="grid-item">
                                            <div className="flex-container">
                                                <img width="100%" src={track.album.images[0].url} alt="" />
                                                <div>
                                                    <p>{track.name}</p>
                                                    <p >{track.album.artists[0].name}</p>
                                                    {!isSelect[track.uri] ?
                                                        <Button variant="contained" onClick={() => {
                                                            uri = track.uri
                                                            fetchAddItem(uri)
                                                            setIsSelect({ ...isSelect, [track.uri]: true })
                                                        }}>Select</Button>
                                                        : <Button variant="contained" onClick={() => {
                                                            setIsSelect({ ...isSelect, [track.uri]: false })
                                                        }}>Deselect</Button>
                                                    }
                                                </div>
                                            </div>
                                        </CardContent>
                                    )
                                })
                            }
                        </Card>

                    </div>
            }
        </div>
    )
}
