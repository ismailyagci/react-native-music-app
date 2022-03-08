import React, {
    useEffect,
    useState
} from "react";
import {
    ImageBackground,
    Dimensions,
    View,
    Text
} from "react-native";
import TrackPlayer, {
    usePlaybackState
} from 'react-native-track-player';
import {
    useNavigation
} from "@react-navigation/core";
import {
    TouchableOpacity
} from "react-native-gesture-handler";
import Icons from "react-native-vector-icons/Ionicons";
import {
    useSelector,
    useDispatch
} from "react-redux";
import {
    setPlayer
} from "_redux";
import constants from "_constants";
import {
    styles
} from "./stylesheet";

const {
    height
} = Dimensions.get("window");

const PlayerCard = ({
    isAbsolute
}) => {
    const {
        playList: playListState,
        player: playerState
    } = useSelector((state) => state);
    const playerDispatch = useDispatch();

    const playbackState = usePlaybackState();
    const navigation = useNavigation();

    const [playStatus, setPlayStatus] = useState(false);

    const {
        nowPlayingImage,
        playingTitle,
        nowPlaying,
        musicID
    } = playerState.player;

    const startPlayer = async ({
        image,
        title,
        url,
        id
    }) => {
        await TrackPlayer.setupPlayer({
        });
        await TrackPlayer.updateOptions({
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_SEEK_TO,
            ],
            compactCapabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
            ],
            notificationCapabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
            ],
            stopWithApp: true
        });
        await TrackPlayer.add({
            id: id,
            url: url,
            title: title,
            artwork: image,
        });
        await TrackPlayer.play();

        playerDispatch(setPlayer({
            ...playerState.player,
            nowPlayingImage: image,
            playingTitle: title,
            musicID: id
        }));
    };

    const nextMusic = async () => {
        if (playListState.lists.length) {
            const musicIndex = playListState.lists.findIndex((playlist) => playlist.id === musicID);
            const isEndMusic = playListState.lists.length - 1 === musicIndex;
            const newMusic = isEndMusic ? playListState.lists[0] : playListState.lists[musicIndex + 1];
            await TrackPlayer.pause();
            startPlayer({
                image: newMusic.imageUrl,
                url: newMusic.musicUrl,
                title: newMusic.title,
                id: newMusic.id
            });
        };
    };

    useEffect(() => {
        if (playbackState === TrackPlayer.STATE_PLAYING) {
            setPlayStatus(true);
        }
        else if (playbackState === TrackPlayer.STATE_PAUSED) {
            setPlayStatus(false);
        };
    }, [playbackState]);

    useEffect(() => {
        const endedListener = TrackPlayer.addEventListener("playback-queue-ended", (data) => {
            if (data.position > 0) {
                nextMusic();
            }
        });

        return () => {
            endedListener.remove()
        }
    }, []);

    if (!nowPlaying) return <></>;
    return <ImageBackground
        style={[
            styles.container,
            isAbsolute ? {
                position: "absolute",
                top: height - 70,
                elevation: 2,
                zIndex: 5,
            } : null
        ]}
        source={{ uri: nowPlayingImage }}

    >
        <View
            style={[
                styles.container,
                {
                    padding: 15
                }
            ]}
            pointerEvents={"auto"}
        >

            <View style={styles.alignContainer} >
                <TouchableOpacity
                    onPress={() => navigation.navigate("Player", {
                        id: musicID
                    })}
                >
                    <Icons
                        color={constants.whiteColor}
                        name="chevron-up-outline"
                        size={30}
                    />
                </TouchableOpacity>

                <Text
                    style={styles.title}
                    numberOfLines={1}
                >
                    {playingTitle}
                </Text>
            </View>

            <View style={styles.alignContainer}>
                <TouchableOpacity
                    onPress={() => {
                        if (playStatus) {
                            TrackPlayer.pause()
                        }
                        else {
                            TrackPlayer.play()
                        }
                    }}
                    style={styles.musicControllerPlaying}
                >
                    <Icons
                        color={constants.whiteColor}
                        name={playStatus ? "pause" : "play"}
                        size={15}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => nextMusic()} >
                    <Icons
                        color={constants.whiteColor}
                        name="play-skip-forward"
                        size={20}
                    />
                </TouchableOpacity>
            </View>
        </View>
    </ImageBackground>
};

export default PlayerCard;