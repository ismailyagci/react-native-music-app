import React from "react";
import {
    FlatList,
    View,
    Text
} from "react-native";
import RectangleMusicCard from "../rectangleMusicCard";
import {
    styles
} from "./stylesheet";

const renderItem = ({
    onPress,
    index,
    item
}) => {
    return <RectangleMusicCard
        onPress={() => onPress(item)}
        key={index + "Rectangle"}
        imageUrl={item.imageUrl}
        content={item.content}
        title={item.title}
    />
};

const VerticalSlider = ({
    onPress,
    title,
    datas
}) => {
    return <View>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>
                {title}
            </Text>
        </View>

        <FlatList
            keyExtractor={(item) => item.id + "VerticalSlider"}
            contentContainerStyle={styles.contentContainerStyle}
            data={datas}
            renderItem={({
                item,
                index
            }) => renderItem({
                onPress,
                index,
                item
            })}
        />
    </View>;
};

export default VerticalSlider;