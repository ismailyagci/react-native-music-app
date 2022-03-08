import {
    StyleSheet,
    Dimensions
} from "react-native";
import constants from "_constants";

const {
    width
} = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 70,
    },
    alignContainer: {
        alignItems: "center",
        flexDirection: "row",
        maxWidth: width - 105
    },
    title: {
        fontFamily: constants.regular,
        color: constants.whiteColor,
        flexWrap: "wrap",
        marginLeft: 10,
        fontSize: 18,
        flex: 1,
    },
    musicControllerPlaying: {
        backgroundColor: constants.greenColor,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        marginRight: 10,
        height: 30,
        width: 30
    },
});