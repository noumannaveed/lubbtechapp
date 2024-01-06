import React, {useEffect, useState} from 'react'

import { View, TouchableOpacity, Alert, Text } from 'react-native'
import styles from './Styles'
import { ActivityIndicator } from 'react-native-paper'
import Button from '../../components/Button';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Home = ({ navigation, route }: any ) => {
    
    const [isLoadDel, setIsLoadDel] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [uid, setUid] = useState<any>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await route.params?.userInfo;
                const uid = await route.params?.uid;

                setUserInfo(user);
                setUid(uid);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    const deleteAccount = async () => {
        try {
            const user = auth().currentUser;
            setIsLoadDel(true)
            if (user) {
                // Display a confirmation dialog
                Alert.alert(
                    'Delete Account',
                    'Are you sure you want to delete your account?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => {setIsLoadDel(false)}
                        },
                        {
                            text: 'Delete',
                            onPress: async () => {
                                
                                firestore()
                                    .collection('Users')
                                    .doc(user.uid)
                                    .delete()
                                    .then(() => {
                                        console.log('User Deleted!');
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    })
                                // Delete the user account
                                await user.delete();
                                setIsLoadDel(false)
                                // Navigate to the desired screen (e.g., sign-in screen)
                                navigation.replace('Login');
                            },
                        },
                    ],
                    { cancelable: false }
                );
            } else {
                setIsLoadDel(false)
                console.log('No user is currently signed in.');
            }
        } catch (error) {
            setIsLoadDel(false)
            console.error('Error deleting account:', error);
        }
    };


    return (
        <View style={styles.container}>
            <View
                style={{
                    position: 'absolute',//use absolute position to show button on top of the map
                    // bottom: '5%', //for center align
                    alignSelf: 'center' //for align to right
                }}
            >
                <Text style={{ color: 'black', fontSize: 25, textAlign: 'center' }}>This is under construction...</Text>
                <View>
                    {isLoadDel ? (
                        <ActivityIndicator style={{ padding: 30 }} animating={isLoadDel} color='#ec4745' />
                    ) : (

                        <TouchableOpacity onPress={deleteAccount}>
                            <Button text='Delete Account' style={styles.in} />
                        </TouchableOpacity>
                    )
                    }
                </View>
            </View>
        </View>
    )
}

export default Home