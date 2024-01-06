import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        position: 'absolute',
        alignSelf: 'center',
        flex: 1
    },
    in: {
        // marginVertical: 10,
        marginHorizontal: 50
    },
    image: {
        width: height * 0.1,
        height: height * 0.1,
        resizeMode: 'contain',
        borderRadius: height * 0.1 / 2,
        // alignSelf: 'center',
        marginVertical: height * 0.01
    },
    pick: {
        marginHorizontal: width * 0.1,
        marginVertical: height * 0.01,
    },
    picker: {
        // paddingHorizontal: width * 0.03,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: '#f5f5f5',
        borderColor: 'black',
    },
    black: {
        // backgroundColor: 'black',
        height: height,
        width: width,
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
})

export default styles