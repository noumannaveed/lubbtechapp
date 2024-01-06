import React from "react";
import { View, TextInput, Image, ViewStyle } from "react-native";

import styles from "./Styles";

const Input = ({ placeholder, onChangeText, value, icon, secureTextEntry, style, lng, keyboardType, image } : any) => {
    return (
        <View style={styles.input}>
            {/* <Image
                source={image}
                style={{height:20,width:40}}
                resizeMode='contain'
            /> */}
            <TextInput
                placeholder={placeholder}
                placeholderTextColor='#8B8B8B'
                onChangeText={onChangeText}
                value={value}
                secureTextEntry={secureTextEntry}
                style={[lng ? styles.textInputRight : styles.textInputLeft, style]}
                keyboardType={keyboardType}
            />
        </View>
    );
};

export default Input;