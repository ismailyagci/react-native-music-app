import {
    StyleSheet
} from "react-native";
import constants from "_constants";

export const styles = StyleSheet.create({
    header: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        padding: 15
    },
    headerTitle: {
        fontFamily: constants.medium,
        color: constants.whiteColor,
        fontSize: 18
    },
    headerCounter: {
        fontFamily: constants.light,
        color: constants.grayColor,
        fontSize: 14
    },
    itemContainer: {
        paddingHorizontal: 8,
    }
});