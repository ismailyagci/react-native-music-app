import React, {
    useEffect,
    useState,
    useRef
} from "react";
import {
    Dimensions,
    Animated,
    View,
    Text
} from "react-native";
import {
    styles
} from "./stylesheet";
import SquareMusicCard from "../squareMusicCard";

const {
    width
} = Dimensions.get("window");
const itemSize = width / 2.1;
const spacerItemSize = (width - itemSize - 15) / 2;

const renderItem = ({
    scrollX,
    onPress,
    index,
    item
}) => {
    const inputRange = [
        (index - 2) * itemSize,
        (index - 1) * itemSize,
        index * itemSize
    ];
    const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0.8, 1, 0.8]
    });

    if (!item.imageUrl) {
        return <View style={{ width: spacerItemSize }} />;
    }

    return <Animated.View
        style={{
            transform: [{
                scale: scale
            }],
        }}
    >
        <View
            style={[
                styles.itemContainer,
                {
                    width: itemSize
                }
            ]}
        >
            <SquareMusicCard
                imageUrl={item.imageUrl}
                onPress={() => onPress(item)}
                title={item.title}
                size={itemSize}
                key={index}
            />
        </View>
    </Animated.View>;
};

const HorizontalSlider = ({
    onPress,
    title,
    datas
}) => {
    const scrollX = useRef(new Animated.Value(0)).current;

    const [_datas, _setDatas] = useState([]);
    const [activeItemIndex, setActiveItemIndex] = useState(0);

    useEffect(() => {
        if (datas) _setDatas([
            {
                spacer: "left",
                id: "spacerID1"
            },
            ...datas,
            {
                spacer: "right",
                id: "spacerID2"
            }
        ]);
    }, [datas]);

    useEffect(() => {
        const newItemSize = parseInt(itemSize);
        scrollX.addListener((data) => {
            const _activeIndex = Math.round(data.value / newItemSize);
            setActiveItemIndex(_activeIndex);
        });
        return () => scrollX.removeAllListeners();
    }, []);

    return <View>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>
                {title}
            </Text>

            <Text style={styles.headerCounter} >
                {activeItemIndex + 1} / {datas.length}
            </Text>
        </View>

        <Animated.FlatList
            keyExtractor={(item) => item.id + "HorizontalSlider"}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
            )}
            showsHorizontalScrollIndicator={false}
            snapToInterval={itemSize}
            scrollEventThrottle={16}
            decelerationRate={0}
            horizontal={true}
            bounces={false}
            data={_datas}
            renderItem={({
                item,
                index
            }) => renderItem({
                scrollX,
                onPress,
                index,
                item
            })}
        />
    </View>;
};

export default HorizontalSlider;