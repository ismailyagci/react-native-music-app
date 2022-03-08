import {
    StyleSheet
} from "react-native";
import constants from "_constants";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15
    },
    image: {
        borderRadius: 5,
        height: 60,
        width: 60
    },
    descriptionContainer: {
        justifyContent: "space-between",
        flexDirection: "column",
        paddingLeft: 10,
        flex: 1
    },  
    title: {
        fontFamily: constants.regular,
        color: constants.whiteColor,
        marginBottom: 5,
        fontSize: 22
    },
    content: {
        fontFamily: constants.regular,
        color: constants.grayColor,
        fontSize: 16
    }
});