import React from "react";
import {
    ActivityIndicator,
    View
} from "react-native";
import {
    styles
} from "./stylesheet";
import constants from "_constants";

const Loading = () => {
    return <View style={styles.container}>
        <ActivityIndicator
            size={"large"}
            color={constants.greenColor}
        />
    </View>
};

export default Loading;