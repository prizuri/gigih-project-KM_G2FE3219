import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        musics: [],
        userID: "",
        playlistID: "",
        query: ""
    },
    reducers: {
        musicList: (state, action) => {
            state.musics = action.payload
        },
        setUserID: (state, action) => {
            state.userID = action.payload
        },
        setPlaylistID: (state, action) => {
            state.playlistID = action.payload
        },
        setQuery: (state, action) => {
            state.query = action.payload
        }
    }
})
export const { musicList, setUserID, setPlaylistID, setQuery } = userSlice.actions
export default userSlice.reducer