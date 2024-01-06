import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('screen');

const Button = ({text, style} : any) => {
    return (
        <View style={[styles.in, style]}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    in: {
        width: width * 0.8,
        height: width * 0.15,
        backgroundColor: '#ec4745',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: width * 0.8 / 2,
        marginTop: 30,
    },
});

export default Button;