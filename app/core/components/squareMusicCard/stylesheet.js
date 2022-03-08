import {
    StyleSheet
} from "react-native";
import constants from "_constants";

export const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-end",
        height: "100%",
        width: "100%",
        padding: 10
    },
    imageContainer: {
        borderRadius: 15
    },
    title: {
        fontFamily: constants.regular,
        color: constants.whiteColor,
        fontSize: 18
    }
});