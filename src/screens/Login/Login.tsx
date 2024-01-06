import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Text, ImageBackground, Image } from 'react-native'
import styles from './Styles'
import Input from '../../components/Input/Input'
import Button from '../../components/Button';
import { ActivityIndicator } from "react-native-paper";

import firestore from '@react-native-firebase/firestore';

const Login = ({ navigation }: { navigation: any }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['email'],
            webClientId: '35865774635-23s2t7t701fbjgnrjhvdrm8vgq08ku0k.apps.googleusercontent.com',
            offlineAccess: true,
        });
    }, []);

    const _signIn = async () => {
        try {
            setIsLoading(true)
            await GoogleSignin.hasPlayServices();

            // Check if the user is already signed in
            const isSignedInBefore = await GoogleSignin.isSignedIn();
            console.log('Is user signed in before:', isSignedInBefore);

            if (isSignedInBefore) {
                console.log('User is already signed in.');
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();

            }
            const { idToken, user } = await GoogleSignin.signIn();
            setLoggedIn(true);
            setUserInfo(user);


            // Get the ID token and access token
            const credential = auth.GoogleAuthProvider.credential(idToken);
            const userCredential = await auth().signInWithCredential(credential);
            const uid = userCredential.user.uid
            console.log('User signed in:', userCredential.additionalUserInfo?.isNewUser);
            // Extract the access token from the ID token
            const accessToken = await userCredential.user?.getIdToken();
            setAccessToken(accessToken);
            setIsLoading(false)
            if (userCredential.additionalUserInfo?.isNewUser) {
                firestore()
                    .collection('Users')
                    .doc(userCredential.user.uid)
                    .set({
                        ...user,
                        isFirstLogin: false
                    })
                    .then(() => {
                        setIsLoading(false);
                        console.log('User added!');
                    })
                    .catch(error => {
                        setIsLoading(false);
                        console.log(error);
                    })
                navigation.replace('PersonInfo', { userInfo: user, uid: userCredential.user?.uid });
            } else {
                firestore()
                    .collection('Users')
                    .doc(userCredential.user.uid)
                    .get()
                    .then(user => {
                        if (!user.data()?.isFirstLogin) {
                            firestore()
                                .collection('Users')
                                .doc(userCredential.user.uid)
                                .update({
                                    isFirstLogin: true
                                })
                                .then(() => {
                                    setIsLoading(false);
                                    console.log('User added!');
                                })
                                .catch(error => {
                                    setIsLoading(false);
                                    console.log(error);
                                })
                            setIsLoading(false);
                            navigation.replace('Welcome', { userInfo: user, uid: userCredential.user?.uid });
                        } else {
                            setIsLoading(false);
                            navigation.replace('Home', { userInfo: user, uid: userCredential.user?.uid });
                        }
                        console.log('User added!');
                    })
                    .catch(error => {
                        setIsLoading(false);
                        console.log(error);
                    })
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    };
    return (
        <ImageBackground
            source={require('../../assets/background.jpg')}
            style={styles.backgroundImage}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>

                    <View
                        style={{
                            position: 'absolute',//use absolute position to show button on top of the map
                            // bottom: '5%', //for center align
                            alignSelf: 'center' //for align to right
                        }}
                    >
                        <Image
                            source={require('../../assets/lubbtechLogo.jpg')}
                            style={styles.image}
                        />
                        <Input
                            placeholder="Email"
                            value={email}
                            onChangeText={(email: string) => setEmail(email)}
                        />
                        <Input
                            placeholder="Password"
                            value={password}
                            onChangeText={(password: string) => setPassword(password)}
                        />
                        <TouchableOpacity onPress={() => {
                            console.log(email, password);
                        }}>
                            <Button text='Login' style={styles.in} />
                        </TouchableOpacity>
                        <View>
                            {isLoading ? (
                                <ActivityIndicator style={{ padding: 25 }} animating={isLoading} color='#ec4745' />
                            ) : (
                                <TouchableOpacity onPress={_signIn}>
                                    <Button text='Google Sign-in' style={styles.in} />
                                </TouchableOpacity>
                            )
                            }
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ImageBackground >
    )
}

export default Login


