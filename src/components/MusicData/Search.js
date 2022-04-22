import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { musicList, setQuery } from "../../redux/create-slice"
import React, { useState } from "react"
import MusicData from "./MusicData"

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
        catch  {
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
                    <p>Please create the playlist first</p>
                    :
                    <div>
                        <form onSubmit={handleSearch}>
                            <input type="text" onChange={e => dispatch(setQuery(e.target.value))} />
                            <button type="submit">Search</button>
                        </form>
                        {currentMusics.length !== 0 &&
                            currentMusics.map(track => {
                                return (
                                    <div key={track.uri}>
                                        <MusicData key={track.uri} url={track.album.images[0].url} name={track.name} album={track.album.artists[0].name} />
                                        {!isSelect[track.uri] ?
                                            <button onClick={() => {
                                                uri = track.uri
                                                fetchAddItem(uri)
                                                setIsSelect({ ...isSelect, [track.uri]: true })
                                            }}>Select</button>
                                            : <button onClick={() => {
                                                setIsSelect({ ...isSelect, [track.uri]: false })
                                            }}>Deselect</button>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
            }
        </div>
    )
}
