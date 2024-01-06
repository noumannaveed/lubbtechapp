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
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch' for different result
    },
    overlayContainer: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.8)', // adjust the alpha value for overlay transparency
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: height * 0.1,
        height: height * 0.1,
        resizeMode: 'contain',
        borderRadius: height * 0.1 / 2,
        alignSelf: 'center',
        // marginVertical: height * 0.01
    },
})

export default styles