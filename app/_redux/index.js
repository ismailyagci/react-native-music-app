import {
    configureStore
} from "@reduxjs/toolkit";
import playerListReducer, {
    playListSlice,
    setPlayList,
} from "./features/playListSlice";
import playerReducer, {
    playerSlice,
    setPlayer
} from "./features/playerSlice";

export default configureStore({
    reducer: {
        playList: playerListReducer,
        player: playerReducer
    }
});

export {
    playListSlice,
    playerSlice,
    setPlayList,
    setPlayer
}