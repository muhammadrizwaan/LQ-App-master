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

import { storage } from '../../firebase/firebase'
import { signUpUser } from '../../actions/auth'
import { connect } from 'react-redux'

import { firebase } from '../../firebase/firebase'

import LinearGradient from 'react-native-linear-gradient'

class SignUpForm extends React.Component {
    state = {
        email: '',
        password: '',
        name: '',
        phone: '',
        title: '',
        department: '',
        confirmPassword: '',
        userAvatar: '',
        imgSrc: '',
        userAvatarName: '',
        confirmPasswordVisible: false,
        errors: {},
        passwordVisible: false,
        signUpLoading: false,
        loading: false,
        success: false
    }
    onChangeText = (key, val) => {
        this.setState({
            [key]: val
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isRegistered) {
            this.setState({
                email: '',
                password: '',
                name: '',
                phone: '',
                title: '',
                department: '',
                confirmPassword: '',
                userAvatar: '',
                imgSrc: '',
                userAvatarName: '',
                confirmPasswordVisible: false,
                errors: {},
                passwordVisible: false,
                signUpLoading: false,
                loading: false,
                success: false
            });
            this.props.navigation.navigate('Home')
        }
    }
    handlePasswordVisibilityChange = () => {
        this.setState({ passwordVisible: !this.state.passwordVisible })
    }
    handleConfirmPasswordVisibilityChange = () => {
        this.setState({ confirmPasswordVisible: !this.state.confirmPasswordVisible })
    }
    handleImageUpload = () => {
        const options = {
            title: 'Select your Profile Picture',
        }

        ImagePicker.showImagePicker(options, response => {
            if (response.uri) {
                if (!this.state.loading) {
                    this.setState({ success: false, loading: true })
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
                            if (this.state.userAvatarName.length > 0) {
                                storage.ref(`profileImages/${this.state.userAvatarName}`)
                                    .delete()
                                    .then(() => console.log('Previous File Got deleted'))
                            }

                            this.setState(prevState => ({
                                imgSrc: response.uri,
                                userAvatar: url,
                                userAvatarName: currentImageName,
                                success: true,
                                loading: false,
                            }))
                        })
                    })
            }
        })
    }
    onRemoveImage = () => {
        // storage.ref(`profileImages/${this.state.userAvatarName}`)
        //     .delete()
        //     .then(() => {
        this.setState({
            imgSrc: '',
            userAvatarName: '',
            userAvatar: '',
            success: false,
            loading: false
        })
        // })
    }
    onSignUp = () => {

        const userData = {
            name: this.state.name.trim(),
            email: this.state.email.trim(),
            phone: this.state.phone,
            userAvatar: this.state.userAvatar.length > 0 ? this.state.userAvatar : "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png",
            userAvatarName: this.state.userAvatarName,
            title: this.state.title,
            department: this.state.department
        }

        const {
            isValid,
            errors
        } = validateSignUpInput(userData, this.state.password, this.state.confirmPassword)

        if (!isValid) {
            this.setState({
                errors: errors
            })
        } else {
            this.setState({
                signUpLoading: true,
                errors: {}
            })

            this.props.userSignUp(this.state.email.trim(), this.state.password, userData)
        }
    }
    render() {
        const { errors } = this.state
        const { signUpLoading } = this.props
        return (
            <View style={{ width: '87%', }}>

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
                        onSubmitEditing={() => this.emailInputRef._root.focus()}
                    />
                </Item>
                {errors.name && (
                    <Text style={styles.errorTextStyle}>
                        {errors.name}
                    </Text>
                )}


                <Item
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
                )}

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

                <Item
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={errors.password ? true : false}
                    style={{ ...styles.transparentInputContainer }}
                >
                    <Image
                        source={require('../../images/password_icon.png')}
                        style={IconStyles.passwordIconStyle}
                    />
                    <Input
                        secureTextEntry={!this.state.passwordVisible}
                        autoCapitalize="none"
                        placeholder="Password"
                        value={this.state.password}
                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                        onChangeText={val => this.onChangeText("password", val)}
                        style={styles.inputFieldStyle}
                        ref={input => { this.passwordInputRef = input }}
                        returnKeyType={"next"}
                        onSubmitEditing={() => this.confirmPasswordInputRef._root.focus()}
                    />
                    {this.state.passwordVisible ?
                        <TouchableOpacity
                            onPress={this.handlePasswordVisibilityChange}
                        >
                            <Image
                                source={require('../../images/hide_password_icon.png')}
                                style={IconStyles.eyeIconStyle}
                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={this.handlePasswordVisibilityChange}
                        >
                            <Image
                                source={require('../../images/view_password_eye_icon.png')}
                                style={IconStyles.eyeIconStyle}
                            />
                        </TouchableOpacity>
                    }
                </Item>
                {errors.password && (
                    <Text style={styles.errorTextStyle}>
                        {errors.password}
                    </Text>
                )}

                <Item
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={errors.confirmPassword ? true : false}
                    style={{ ...styles.transparentInputContainer }}
                >
                    <Image
                        source={require('../../images/password_icon.png')}
                        style={IconStyles.passwordIconStyle}
                    />
                    <Input
                        secureTextEntry={!this.state.confirmPasswordVisible}
                        autoCapitalize="none"
                        placeholder="Confirm Password"
                        value={this.state.confirmPassword}
                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                        onChangeText={val => this.onChangeText("confirmPassword", val)}
                        style={styles.inputFieldStyle}
                        ref={input => { this.confirmPasswordInputRef = input }}
                    />
                    {this.state.confirmPasswordVisible ?
                        <TouchableOpacity
                            onPress={this.handleConfirmPasswordVisibilityChange}
                        >
                            <Image
                                source={require('../../images/hide_password_icon.png')}
                                style={IconStyles.eyeIconStyle}
                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={this.handleConfirmPasswordVisibilityChange}
                        >
                            <Image
                                source={require('../../images/view_password_eye_icon.png')}
                                style={IconStyles.eyeIconStyle}
                            />
                        </TouchableOpacity>
                    }
                </Item>
                {errors.confirmPassword && (
                    <Text style={styles.errorTextStyle}>
                        {errors.confirmPassword}
                    </Text>
                )}

                <Button
                    transparent
                    light
                    full
                    style={styles.uploadImageButton}
                    onPress={() => this.handleImageUpload()}
                >

                    {this.state.success ?
                        <View >
                            <Image
                                source={{ uri: this.state.imgSrc }}
                                style={{ width: 100, height: 100, borderRadius: 50 }}
                            />
                            <Button
                                transparent style={styles.removeImageButtonStyle}
                                onPress={this.onRemoveImage}
                            >
                                <Icon name="close" style={{ marginLeft: 0, marginRight: 0, color: 'white' }} />
                            </Button>
                        </View>
                        :
                        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
                            {this.state.loading ?
                                <Spinner color="white" />
                                :
                                <Icon name="attach" style={{ color: 'white', transform: [{ rotate: '40deg' }], opacity: 0.5 }} />
                            }
                            {!this.state.loading && <Text style={{ color: 'white', fontSize: 10, opacity: 0.5 }}>Attach Photo</Text>}
                        </View>
                    }
                </Button>
                {errors.userAvatar && (
                    <Text style={{ ...styles.errorTextStyle, alignSelf: 'center', marginTop: 5 }}>
                        {errors.userAvatar}
                    </Text>
                )}


                <LinearGradient
                    colors={['#0078C7', '#003C64']}
                    style={styles.signInButtonStyle}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                >
                    <Button
                        full
                        transparent
                        onPress={this.onSignUp}
                    >
                        {
                            signUpLoading ?
                                <Spinner color="white" />
                                :
                                <Text style={{ color: 'white', }}>LET'S BEGIN</Text>
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
    userSignUp: (email, password, userData) => dispatch(signUpUser(email, password, userData))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)