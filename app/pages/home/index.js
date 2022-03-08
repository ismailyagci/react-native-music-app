import React from "react";
import {
    ScrollView,
    Text,
    View
} from "react-native";
import {
    HorizontalSlider,
    VerticalSlider,
    PlayerCard
} from "core";
import {
    setPlayList,
    setPlayer
} from "_redux";
import {
    useSelector,
    useDispatch
} from "react-redux";
import {
    styles
} from "./stylesheet";


const EXAMPLE_MUSICS = [
    {
        imageUrl: "https://i2.milimaj.com/i/milliyet/75/770x0/6056702a5542851d04ae176b",
        musicUrl: "https://mp3semti.com/dinle/Baris-Manco-Gul-Pembe",
        id: "4cd3c1b1-381a-4d1d-a39c-9426110457ad",
        content: "Barış Manço Gülpembe",
        title: "Barış Manço"
    },
    {
        imageUrl: "https://i2.cnnturk.com/i/cnnturk/75/800x400/5a027dd661361f10404fbb11.jpg",
        musicUrl: "https://mp3semti.com/dinle/Neset-Ertas-Vay-Vay-Dunya",
        id: "7287aea0-d544-11eb-b8bc-0242ac130003",
        content: "Vay Vay Dünya",
        title: "Neşet Ertaş"
    },
    {
        imageUrl: "https://www.indyturk.com/sites/default/files/styles/1368x911/public/article/main_image/2021/02/07/581286-429776035.jpg?itok=g1hPSv3s",
        musicUrl: "https://mp3semti.com/dinle/Cem-Karaca-Ay-Karanlik",
        id: "7933f222-d544-11eb-b8bc-0242ac130003",
        content: "Ay Karanlık",
        title: "Cem Karaca"
    },
    {
        imageUrl: "http://images.genius.com/7a0a601418389b8a359d4d15496676b8.333x333x1.jpg",
        musicUrl: "https://mp3semti.com/dinle/Erkin-Koray-Estarabim",
        id: "7cfaa504-d544-11eb-b8bc-0242ac130003",
        title: "Erkin Koray",
        content: "Estarabim"
    },
    {
        musicUrl: "https://mp3semti.com/dinle/Fikret-Kizilok-Gozlerim-Denizde",
        imageUrl: "https://i.ytimg.com/vi/pwP2minca1Y/maxresdefault.jpg",
        id: "807ca934-d544-11eb-b8bc-0242ac130003",
        content: "Gözlerim Denizde",
        title: "Fikret Kızılok"
    },
    {
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq75Isl7C1CB2SpdSeFG4C9yIDbfYyZgDmQA&usqp=CAU",
        musicUrl: "https://mp3semti.com/dinle/Edip-Akbayram-Aldirma-Gonul",
        id: "8870e6e6-d544-11eb-b8bc-0242ac130003",
        content: "Aldırma Gönül",
        title: "Edip Akbayram"
    }
];

const Home = ({
    navigation
}) => {
    const { player: playerState } = useSelector((state) => state.player);
    const dispatch = useDispatch();

    const goPlayer = (item, allMusics) => {
        if (item.id !== playerState.musicID) {
            dispatch(setPlayer({
                ...playerState,
                nowPlayingImage: "",
                nowPlaying: false,
                playingTitle: "",
                musicID: ""
            }));
            dispatch(setPlayList(allMusics));
        }
        navigation.navigate("Player", {
            id: item.id
        });
    };

    return <View style={styles.wrapper} >
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer} >
                <Text style={styles.title}>
                    KÜTÜPHANEM
                </Text>
            </View>

            <HorizontalSlider
                onPress={(item) => goPlayer(item, EXAMPLE_MUSICS.slice(0, 4))}
                datas={EXAMPLE_MUSICS.slice(0, 4)}
                title="Editörün Seçimi"
            />

            <VerticalSlider
                onPress={(item) => goPlayer(item, EXAMPLE_MUSICS)}
                datas={EXAMPLE_MUSICS}
                title="Bütün Müzikler"
            />
        </ScrollView>
        <PlayerCard />
    </View>;
};

export default Home;