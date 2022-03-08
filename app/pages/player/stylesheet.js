import {
    StyleSheet,
    Dimensions
} from "react-native";
import constants from "_constants";

const {
    width,
    height,
} = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        flex: 1
    },
    bufferingContainer: {
        backgroundColor: "rgba(0,0,0,0.8)",
        position: "absolute",
        height: height,
        width: width,
        zIndex: 999
    },
    gradientContainer: {
        justifyContent: "space-between",
        flex: 1
    },
    header: {
        width: "100%",
        padding: 10
    },

    detailContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 30
    },

    title: {
        fontFamily: constants.regular,
        color: constants.whiteColor,
        textAlign: "center",
        marginBottom: 5,
        fontSize: 22
    },
    content: {
        fontFamily: constants.regular,
        color: constants.grayColor,
        textAlign: "center",
        marginBottom: 20,
        fontSize: 24
    },

    controllerContainer: {
        justifyContent: "space-evenly",
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        width: "100%"
    },
    controllerPlaying: {
        backgroundColor: constants.greenColor,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        height: 60,
        width: 60
    },

    controllerSliderContainer: {
        width: "100%",
        padding: 10
    },
    controllerSlider: {
        width: width - 20,
        height: 10
    },
    controllerSliderTimesContainer: {
        justifyContent: "space-between",
        paddingHorizontal: 14,
        flexDirection: "row",
        paddingVertical: 5,
        width: "100%"
    },
    controllerSliderPositionTime: {
        fontFamily: constants.medium,
        color: constants.greenColor,
        fontSize: 11
    },
    controllerSliderDurationTime: {
        fontFamily: constants.medium,
        color: constants.whiteColor,
        fontSize: 11
    }
});