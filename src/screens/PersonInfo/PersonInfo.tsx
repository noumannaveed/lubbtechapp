import React, { useEffect, useState } from 'react';
import {
    View, TouchableOpacity, Alert, Text, Image, Dimensions, TouchableWithoutFeedback, Keyboard,
    Animated, Easing, ImageBackground
} from 'react-native';
import styles from './Styles';
import DropDownPicker from 'react-native-dropdown-picker';
import Input from '../../components/Input/Input'
import Button from '../../components/Button';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { ActivityIndicator } from "react-native-paper";

const { height, width } = Dimensions.get('screen');
const PersonInfo = ({ navigation, route }: any) => {
    const [userInfo, setUserInfo] = useState<any>(null);
    const [uid, setUid] = useState<any>(null);

    const [age, setAge] = useState<number>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadDel, setIsLoadDel] = useState<boolean>(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [gender, setGender] = useState('');
    const [genders, setGenders] = useState([
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Gay-Male', value: 'gay-Male' },
        { label: 'Gay-Female', value: 'gay-Female' },
        { label: 'Male identify as Female', value: 'male identify as Female' },
        { label: 'Female identify as Male', value: 'female identify as Male' },
    ]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await route.params?.userInfo;
                const uid = await route.params?.uid;

                setUserInfo(user);
                setUid(uid);

                console.log('data=', uid);
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
                                    .doc(uid)
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

    const signUp = async () => {
        console.log(userInfo?.id);
        setIsLoading(true);
        firestore()
            .collection('Users')
            .doc(uid)
            .update({
                age: age ? age : 0,
                gender: gender ? gender : '',
                isFirstLogin: true
            })
            .then(() => {
                setIsLoading(false);
                console.log('User added!');
                navigation.replace('Welcome')
            })
            .catch(error => {
                setIsLoading(false);
                console.log(error);
            })
    }

    return (
        <ImageBackground
            source={require('../../assets/background.jpg')}
            style={styles.backgroundImage}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View
                    style={styles.container}
                >
                    <Image
                        source={{ uri: userInfo?.photo }}
                        style={styles.image}
                    />
                    <Text style={{ color: 'black', fontSize: 25 }}>{userInfo?.name}</Text>

                    <Input
                        placeholder="Age"
                        value={age}
                        onChangeText={(age: number) => setAge(age)}
                        keyboardType='numeric'
                    />
                    <View style={styles.pick}>
                        <DropDownPicker
                            placeholder='Gender....'
                            placeholderStyle={{ color: '#8B8B8B' }}
                            open={open}
                            value={value}
                            items={genders}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setGenders}
                            style={styles.picker}
                            containerStyle={{ height: height * 0.07 }}
                            onChangeValue={(gender: any) => setGender(gender)}
                            dropDownContainerStyle={{
                                borderTopLeftRadius: 20, borderTopRightRadius: 20,
                                borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
                                backgroundColor: '#f5f5f5',
                            }}
                            labelStyle={{
                                color: 'black'
                            }}
                        />
                    </View>
                    <View style={{ height: '85%', justifyContent: 'flex-end' }}>
                        <View>
                            {isLoading ? (
                                <ActivityIndicator style={{ padding: 25 }} animating={isLoading} color='#ec4745' />
                            ) : (
                                <TouchableOpacity onPress={signUp}>
                                    <Button text='Submit' style={styles.in} />
                                </TouchableOpacity>
                            )
                            }
                        </View>
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
            </TouchableWithoutFeedback>
        </ImageBackground>
    );
};

export default PersonInfo;

