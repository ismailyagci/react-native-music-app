import {
    createSlice
} from "@reduxjs/toolkit";

const defaultState = {
    lists: []
};

export const playListSlice = createSlice({
    initialState: defaultState,
    name: "playList",
    reducers: {
        setPlayList: (state, action) => {
            state.lists = action.payload
        }
    }
});

export const { setPlayList } = playListSlice.actions;
export default playListSlice.reducer;