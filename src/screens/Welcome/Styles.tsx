import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    in: {
        // marginVertical: 10,
        marginHorizontal: 50
    },
    black: {
        // backgroundColor: 'black',
        height: height,
    },
})

export default styles