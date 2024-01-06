import React, { useEffect } from 'react'

import { View, TouchableOpacity, Alert, ImageBackground, Text } from 'react-native'
import styles from './Styles'
import Button from '../../components/Button'
// import Button from '../../components/Button';

const Welcome = ({ navigation }: { navigation: any }) => {
    useEffect(() => {
        // setTimeout(() => {
        //     navigation.replace("Login");
        // }, 5000);
    }, [])
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/background.jpg')}
                style={styles.black} />
            <View
                style={{
                    position: 'absolute',//use absolute position to show button on top of the map
                    // bottom: '5%', //for center align
                    alignSelf: 'center' //for align to right
                }}
            >
                <Text style={{ color: 'black', fontSize: 25, textAlign: 'center' }}>Welcome To the Lubb Tech Personal Blog App</Text>
                <TouchableOpacity onPress={() => navigation.replace('Home')}>
                    <Button text='Get Started...' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Welcome