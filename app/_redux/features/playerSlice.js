import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    nowPlayingImage: "",
    nowPlaying: false,
    playingTitle: "",
    duration: 0,
    position: 0,
    musicID: ""
};

export const playerSlice = createSlice({
    name: "player",
    initialState: {
        player: defaultState
    },
    reducers: {
        setPlayer: (state, action) => {
            state.player = action.payload;
        }
    }
});

export const { setPlayer } = playerSlice.actions;
export default playerSlice.reducer;