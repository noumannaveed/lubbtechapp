import React, { useEffect } from 'react'

import { View, TouchableOpacity, Button, Alert, ImageBackground, Image } from 'react-native'
import styles from './Styles'
// import Button from '../../components/Button';

const Splash = ({ navigation }: { navigation: any }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace("Login");
        }, 5000);
    }, [])
    return (
        <ImageBackground
            source={require('../../assets/background.jpg')}
            style={styles.backgroundImage}>
            <View style={styles.container}>
                <Image
                    source={require('../../assets/lubbtechLogo.jpg')}
                    style={styles.image}
                />
            </View>
        </ImageBackground>
    )
}

export default Splash