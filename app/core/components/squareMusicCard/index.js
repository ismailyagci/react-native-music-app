import React from "react";
import {
    TouchableOpacity,
    ImageBackground,
    Text
} from "react-native";
import Gradient from "react-native-linear-gradient";
import {
    styles
} from "./stylesheet";

const SquareMusicCard = ({
    imageUrl,
    onPress,
    title,
    style,
    size
}) => {
    return <TouchableOpacity
        onPress={() => onPress()}
    >
        <ImageBackground
            style={[
                {
                    width: size ? size : 250,
                    height: size ? size : 250
                },
                style
            ]}
            imageStyle={styles.imageContainer}
            source={{
                uri: imageUrl
            }}
        >
            <Gradient
                style={styles.container}
                colors={["rgba(10, 9, 9, 0)", "rgba(10, 9, 9, 0.7)",]}
            >
                <Text
                    style={styles.title}
                >
                    {title}
                </Text>
            </Gradient>
        </ImageBackground>
    </TouchableOpacity>;
};

export default SquareMusicCard;