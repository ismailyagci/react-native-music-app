import React, {
    useEffect,
    useState,
    useRef
} from "react";
import {
    TouchableOpacity,
    ImageBackground,
    BackHandler,
    Dimensions,
    Animated,
    Text,
    View
} from "react-native";
import {
    Loading,
    musicTimeConverter
} from "core";
import TrackPlayer, {
    useTrackPlayerProgress,
    usePlaybackState,
} from 'react-native-track-player';
import Icons from "react-native-vector-icons/Ionicons";
import Slider from '@react-native-community/slider';
import Gradient from "react-native-linear-gradient";
import constants from "_constants";
import {
    setPlayer
} from "_redux";
import {
    useSelector,
    useDispatch
} from "react-redux";
import {
    styles
} from "./stylesheet";

const { height } = Dimensions.get("window");
const GRADIENT_COLORS = ["rgba(10, 9, 9, 0)", "rgba(10, 9, 9, 0.8)", "rgba(10, 9, 9, 1)", "rgba(10, 9, 9, 1)",];

const Player = ({
    navigation,
    route
}) => {
    const dispatch = useDispatch();
    const {
        playList: playListState,
        player: playerState
    } = useSelector((state) => state);

    const bufferAnimation = useRef(new Animated.Value(0)).current;
    const playbackState = usePlaybackState();

    let {
        duration,
        position
    } = useTrackPlayerProgress();
    const {
        id
    } = route.params;
    const {
        musicID,
    } = playerState.player;

    const [currentMusicID, setCurrentMusicID] = useState("");
    const [playStatus, setPlayStatus] = useState(false);
    const [buffering, setBuffering] = useState(true);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");

    const getMusicDatas = ({
        id
    }) => {
        startBufferAnimation();
        const musicDatas = playListState.lists.filter((item) => item.id === id);
        if (musicDatas.length !== 0) {
            const musicData = musicDatas[0];
            setCurrentMusicID(musicData.id);
            startPlayer({
                content: musicData.content,
                image: musicData.imageUrl,
                url: musicData.musicUrl,
                title: musicData.title,
                id: musicData.id
            });
        }
    };

    const startPlayer = async ({
        content,
        image,
        title,
        url,
        id
    }) => {
        setContent(content);
        setTitle(title);
        setImage(image);
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
        setLoading(false);
    };

    const prevMusic = async () => {
        if (playListState.lists.length) {
            const musicIndex = playListState.lists.findIndex((playlist) => playlist.id === currentMusicID);
            const isFirstMusic = musicIndex === 0;
            const newMusic = isFirstMusic ? playListState.lists[playListState.lists.length - 1] : playListState.lists[musicIndex - 1];
            await TrackPlayer.pause();
            setLoading(true);
            getMusicDatas({
                id: newMusic.id
            });
        };
    };

    const nextMusic = async () => {
        if (playListState.lists.length) {
            const musicIndex = playListState.lists.findIndex((playlist) => playlist.id === currentMusicID);
            const isEndMusic = playListState.lists.length - 1 === musicIndex;
            const newMusic = isEndMusic ? playListState.lists[0] : playListState.lists[musicIndex + 1];
            await TrackPlayer.pause();
            setLoading(true);
            getMusicDatas({
                id: newMusic.id
            });
        };
    };

    const startBufferAnimation = () => {
        bufferAnimation.setValue(0);
        Animated.loop(
            Animated.timing(
                bufferAnimation, {
                toValue: 1,
                useNativeDriver: true,
                duration: 800,
            })
        ).start(() => startBufferAnimation());
    };

    const onClosePlayerPage = () => {
        dispatch(setPlayer({
            ...playerState.player,
            musicID: currentMusicID,
            nowPlayingImage: image,
            playingTitle: title,
            nowPlaying: true,
        }))
    };

    useEffect(() => {
        if (!musicID && !musicID.length) {
            getMusicDatas({
                id
            });
        }
        else {
            const existPlayingMusicDatas = playListState.lists.filter((item) => item.id === id)[0];
            if (existPlayingMusicDatas) {
                startBufferAnimation();
                TrackPlayer.play();
                setLoading(false);
                setCurrentMusicID(existPlayingMusicDatas.id);
                setContent(existPlayingMusicDatas.content);
                setImage(existPlayingMusicDatas.imageUrl);
                setTitle(existPlayingMusicDatas.title);
            }
        }
    }, [musicID, id]);

    useEffect(() => {
        if (playbackState === TrackPlayer.STATE_PLAYING) {
            setPlayStatus(true);
            setBuffering(false);
        }
        else if (playbackState === TrackPlayer.STATE_PAUSED) {
            setPlayStatus(false);
            setBuffering(false);
        }
        else if (playbackState === TrackPlayer.STATE_BUFFERING) {
            setBuffering(true);
        }
        else if (playbackState === TrackPlayer.STATE_READY) {
            setBuffering(false);
        }
    }, [playbackState]);

    useEffect(() => {
        const onBack = BackHandler.addEventListener("hardwareBackPress", () => {
            onClosePlayerPage();
            navigation.goBack();
        });

        return () => {
            onBack.remove();
        };
    }, []);

    useEffect(() => {
        const endedListener = TrackPlayer.addEventListener("playback-queue-ended", (data) => {
            if (data.position > 0) {
                nextMusic();
            }
        });

        return () => {
            endedListener.remove()
        }
    }, [currentMusicID]);

    const opacityAnimation = bufferAnimation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0.5, 1]
    });

    if (loading) return <Loading />;

    return <ImageBackground
        style={styles.container}
        source={{
            uri: image
        }}
    >
        <Animated.View
            style={[
                styles.bufferingContainer,
                {
                    top: buffering ? 0 : -height,
                    opacity: opacityAnimation
                }
            ]}
        />
        <Gradient
            style={styles.gradientContainer}
            colors={GRADIENT_COLORS}
        >
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        onClosePlayerPage();
                        navigation.goBack();
                    }}
                >
                    <Icons
                        color={constants.whiteColor}
                        name="chevron-back"
                        size={28}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.detailContainer}>
                <Text
                    style={styles.title}
                    numberOfLines={3}
                >
                    {title}
                </Text>
                <Text
                    style={styles.content}
                    numberOfLines={3}
                >
                    {content}
                </Text>

                <View style={styles.controllerSliderContainer}>
                    <Slider
                        minimumTrackTintColor={constants.whiteColor}
                        maximumTrackTintColor={constants.grayColor}
                        thumbTintColor={constants.whiteColor}
                        style={styles.controllerSlider}
                        maximumValue={duration}
                        value={position}
                        minimumValue={0}
                        trackHeight={30}
                        onValueChange={async () => {
                            await TrackPlayer.pause();
                        }}
                        onSlidingComplete={async (value) => {
                            await TrackPlayer.seekTo(value);
                            await TrackPlayer.play();
                        }}
                        onSlidingStart={async () => {
                            await TrackPlayer.pause();
                        }}
                    />
                    <View style={styles.controllerSliderTimesContainer}>
                        <Text style={styles.controllerSliderPositionTime}>
                            {
                                musicTimeConverter(position)
                            }
                        </Text>
                        <Text style={styles.controllerSliderDurationTime}>
                            {
                                musicTimeConverter(duration)
                            }
                        </Text>
                    </View>
                </View>

                <View style={styles.controllerContainer}>
                    <TouchableOpacity onPress={() => prevMusic()}>
                        <Icons
                            color={constants.whiteColor}
                            name="play-skip-back"
                            size={30}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            if (playStatus) {
                                TrackPlayer.pause()
                            }
                            else {
                                TrackPlayer.play()
                            }
                        }}
                        style={styles.controllerPlaying}
                    >
                        <Icons
                            color={constants.whiteColor}
                            name={playStatus ? "pause" : "play"}
                            size={30}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => nextMusic()}
                    >
                        <Icons
                            color={constants.whiteColor}
                            name="play-skip-forward"
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </Gradient>
    </ImageBackground >;
};

export default Player;