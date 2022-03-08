import {
    StyleSheet
} from "react-native";
import constants from "_constants";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    container: {
        backgroundColor: constants.blackColor,
        flex: 1
    },
    headerContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 15
    },
    title: {
        fontFamily: constants.medium,
        color: constants.greenColor,
        fontSize: 24
    }
});