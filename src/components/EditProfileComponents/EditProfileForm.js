import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import {
    View, Item, Input, Text, Icon, Button, Spinner
} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'

import styles from '../../styles/AuthStyles'
import IconStyles from '../../styles/IconStyles'

import RNFetchBlob from 'react-native-fetch-blob'
import ImagePicker from 'react-native-image-picker';
import validateSignUpInput from '../../Validation/signUpValidation'

import database, { storage } from '../../firebase/firebase'
import { signUpUser,updateUserProfile } from '../../actions/auth'
import { connect } from 'react-redux'
import { showMessage, hideMessage } from "react-native-flash-message";

import LinearGradient from 'react-native-linear-gradient'

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: props.user ? props.user.email : '',
            name: props.user ? props.user.name : '',
            phone: props.user ? props.user.phone : '',
            title: props.user ? props.user.title : '',
            department: props.user ? props.user.department : '',
            userAvatar: props.user ? props.user.userAvatar : '',
            imgSrc: props.user ? props.user.userAvatar : '',
            userAvatarName: props.user ? props.user.userAvatarName : '',
            errors: {},
            isSaving: false,
            loading: false,
            success: true
        }

    }
    onChangeText = (key, val) => {
        this.setState({
            [key]: val
        })
    }

    handleImageUpload = () => {
        const options = {
            title: 'Select your Profile Picture',
        }

        ImagePicker.showImagePicker(options, response => {
            if (response.uri) {
                if (!this.state.loading) {
                    this.setState({ loading: true })
                }

                const Blob = RNFetchBlob.polyfill.Blob;
                const fs = RNFetchBlob.fs;

                window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
                window.Blob = Blob;

                const imagePath = Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.uri;

                let uploadBlob = null;

                let currentImageName = "LQ-App-avatar" + Date.now()

                const imageRef = storage.ref(`profileImages/${currentImageName}`);
                let mime = 'image/jpg';

                fs.readFile(imagePath, 'base64')
                    .then(data => {
                        return Blob.build(data, { type: `${mime};BASE64` })
                    })
                    .then(blob => {
                        uploadBlob = blob;
                        return imageRef.put(blob, { contentType: mime })
                    })
                    .then(() => {
                        uploadBlob.close();
                        storage.ref('profileImages').child(currentImageName).getDownloadURL().then(url => {
                            // if (this.state.userAvatarName.length > 0) {
                            //     storage.ref(`profileImages/${this.state.userAvatarName}`)
                            //         .delete()
                            //         .then(() => console.log('Previous File Got deleted'))
                            // }

                            this.setState(prevState => ({
                                imgSrc: response.uri,
                                userAvatar: url,
                                userAvatarName: currentImageName,
                                loading: false,
                            }))
                        })
                    })
            }
        })
    }
    onRemoveImage = () => {
        storage.ref(`profileImages/${this.state.userAvatarName}`)
            .delete()
            .then(() => {
                this.setState({
                    imgSrc: '',
                    userAvatarName: '',
                    userAvatar: '',
                    success: false,
                    loading: false
                })
            })
    }


    onSave = () => {
        this.setState({
            isSaving: true
        })
        const userData = {
            name: this.state.name,
            phone: this.state.phone,
            department: this.state.department,
            title: this.state.title,
            userAvatar: this.state.userAvatar,
            userAvatarName: this.state.userAvatarName
        }
        const myId = this.props.user.userId
        database
            .ref(`/Users/${myId}/`)
            .update(userData)
            .then((data) => {
                this.setState({
                    isSaving: false
                })
                this.props.updateUserProfile(userData)
                showMessage({
                    message: "Profile Updated",
                    type: "success",
                    position: 'top',
                    icon: 'auto'
                })
                
            })
            .catch(() => {
                this.setState({
                    isSaving: false
                })
                showMessage({
                    message: "Error while updating profile",
                    type: "danger",
                    position: 'top',
                    icon: 'auto'
                });
            })

    }
    render() {
        const { errors } = this.state
        const { signUpLoading } = this.props
        return (
            <View style={{ width: '87%', }}>

                <Button
                    transparent
                    light
                    full
                    style={{
                        ...styles.uploadImageButton,
                        marginTop: 0,
                        marginBottom: 20,
                        borderWidth: this.state.loading ? 1 : 0,
                        width: 130,
                        height: 130,
                        borderRadius: 65
                    }}
                >

                    {!this.state.loading ?
                        <View style={{ widht: 130, height: 130, borderRadius: 65, overflow: 'hidden' }}>
                            <Image
                                source={{ uri: this.state.userAvatar }}
                                style={{ width: 130, height: 130, borderRadius: 65, backgroundColor: 'white' }}
                            />
                            <TouchableOpacity
                                style={styles.changeImageButtonStyle}
                                onPress={() => this.handleImageUpload()}
                            >
                                <Text style={{ fontSize: 10, alignSelf: 'center', color: 'white', marginTop: -10 }}>Change Photo</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
                            <Spinner color="white" />
                        </View>
                    }
                </Button>
                {errors.userAvatar && (
                    <Text style={{ ...styles.errorTextStyle, alignSelf: 'center', marginTop: 5 }}>
                        {errors.userAvatar}
                    </Text>
                )}

                <Item
                    error={errors.name ? true : false}
                    style={{ ...styles.transparentInputContainer, marginTop: 0 }}
                >
                    <Image
                        source={require('../../images/name_icon.png')}
                        style={IconStyles.nameIconStyle}
                    />
                    <Input
                        placeholder='Name'
                        value={this.state.name}
                        autoFocus={true}
                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                        onChangeText={val => this.onChangeText('name', val)}
                        // autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.inputFieldStyle}
                        returnKeyType={"next"}
                        onSubmitEditing={() => this.phoneInputRef._root.focus()}
                    />
                </Item>
                {errors.name && (
                    <Text style={styles.errorTextStyle}>
                        {errors.name}
                    </Text>
                )}


                {/* <Item
                    error={errors.email ? true : false}
                    style={styles.transparentInputContainer}
                >
                    <Image
                        source={require('../../images/email_icon.png')}
                        style={IconStyles.emailIconStyle}
                    />
                    <Input
                        placeholder='Email'
                        value={this.state.email}
                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                        onChangeText={val => this.onChangeText('email', val)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.inputFieldStyle}
                        ref={input => { this.emailInputRef = input }}
                        returnKeyType={"next"}
                        onSubmitEditing={() => this.phoneInputRef._root.focus()}
                    />
                </Item>
                {errors.email && (
                    <Text style={styles.errorTextStyle}>
                        {errors.email}
                    </Text>
                )} */}

                <Item
                    error={errors.phone ? true : false}
                    style={styles.transparentInputContainer}
                >
                    <Image
                        source={require('../../images/phone_icon.png')}
                        style={IconStyles.phoneIconStyle}
                    />
                    <Input
                        placeholder='Phone'
                        value={this.state.phone}
                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                        onChangeText={val => this.onChangeText('phone', val)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType={'numeric'}
                        maxLength={15}
                        style={styles.inputFieldStyle}
                        ref={input => { this.phoneInputRef = input }}
                        returnKeyType={"next"}
                        onSubmitEditing={() => this.titleInputRef._root.focus()}
                    />
                </Item>
                {errors.phone && (
                    <Text style={styles.errorTextStyle}>
                        {errors.phone}
                    </Text>
                )}


                <Item
                    error={errors.title ? true : false}
                    style={styles.transparentInputContainer}
                >
                    <Image
                        source={require('../../images/title_icon.png')}
                        style={IconStyles.titleIconStyle}
                    />
                    <Input
                        placeholder='Title'
                        value={this.state.title}
                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                        onChangeText={val => this.onChangeText('title', val)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.inputFieldStyle}
                        ref={input => { this.titleInputRef = input }}
                        returnKeyType={"next"}
                        onSubmitEditing={() => this.departmentInputRef._root.focus()}
                    />
                </Item>
                {errors.title && (
                    <Text style={styles.errorTextStyle}>
                        {errors.title}
                    </Text>
                )}

                <Item
                    error={errors.department ? true : false}
                    style={styles.transparentInputContainer}
                >
                    <Image
                        source={require('../../images/title_icon.png')}
                        style={IconStyles.titleIconStyle}
                    />
                    <Input
                        placeholder='Organization'
                        value={this.state.department}
                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                        onChangeText={val => this.onChangeText('department', val)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.inputFieldStyle}
                        ref={input => { this.departmentInputRef = input }}
                        returnKeyType={"next"}
                        onSubmitEditing={() => this.passwordInputRef._root.focus()}
                    />
                </Item>
                {errors.department && (
                    <Text style={styles.errorTextStyle}>
                        {errors.department}
                    </Text>
                )}


                <LinearGradient
                    colors={['#0078C7', '#003C64']}
                    style={{
                        ...styles.signInButtonStyle,
                        borderRadius: 7,
                        marginTop: 40,
                    }}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                >
                    <Button
                        full
                        transparent
                        onPress={this.onSave}
                        disabled={this.state.loading}
                    >
                        {
                            this.state.isSaving ?
                                <Spinner color="white" />
                                :
                                <Text style={{ color: 'white', }}>SAVE</Text>
                        }
                    </Button>
                </LinearGradient>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    isRegistered: state.auth.isRegistered,
    signUpError: state.auth.signUpError,
    signUpLoading: state.auth.signUpLoading
})

const mapDispatchToProps = dispatch => ({
    userSignUp: (email, password, userData) => dispatch(signUpUser(email, password, userData)),
    updateUserProfile: (Data) => dispatch(updateUserProfile(Data))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)