import React from "react";
import {
    TouchableOpacity,
    Image,
    View,
    Text
} from "react-native";
import {
    styles
} from "./stylesheet";

const RectangleMusicCard = ({
    imageUrl,
    onPress,
    content,
    title
}) => {
    return <TouchableOpacity
        style={styles.container}
        onPress={() => onPress()}
    >
        <Image
            style={styles.image}
            source={{
                uri: imageUrl
            }}
        />

        <View
            style={styles.descriptionContainer}
        >
            <Text
                style={styles.title}
                numberOfLines={1}
            >
                {title} 
            </Text>
            <Text
                style={styles.content}
                numberOfLines={1}
            >
                {content}
            </Text>
        </View>
    </TouchableOpacity>;
};

export default RectangleMusicCard;