import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import {
    View, Item, Input, Text, Icon, Button, Spinner
} from 'native-base'

import styles from '../../styles/AuthStyles'
import IconStyles from '../../styles/IconStyles'

import signInValidation from '../../Validation/signInValidation'
import LinearGradient from 'react-native-linear-gradient'

import { connect } from 'react-redux'
import { loginUser } from '../../actions/auth'

class LoginForm extends React.Component {
    state = {
        email: '',
        password: '',
        errors: {},
        passwordVisible: false,
        signInLoading: false
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isSignIn) {
            this.setState({
                email: '',
                password: '',
                errors: {},
            });
            this.props.navigation.navigate('Home')
        }
        else if (nextProps.isSignInError) {
            if (nextProps.signInError.code === 'auth/invalid-email') {
                this.setState({
                    errors: {
                        email: 'Please Enter a Valid Email Address'
                    }
                })
            } else if (nextProps.signInError.code === 'auth/user-disabled') {
                this.setState({
                    errors: {
                        email: 'This User is disabled'
                    }
                })
            } else if (nextProps.signInError.code === 'auth/user-not-found') {
                this.setState({
                    errors: {
                        email: "The email address that you've entered doesn't match any account."
                    }
                })
            } else if (nextProps.signInError.code === 'auth/wrong-password') {
                this.setState({
                    errors: {
                        password: "Password is incorrect"
                    }
                })
            }
        }
    }
    onChangeText = (key, val) => {
        this.setState({
            [key]: val
        })
    }
    handlePasswordVisibilityChange = () => {
        this.setState({ passwordVisible: !this.state.passwordVisible })
    }
    handleUserLogin = () => {
        const {
            isValid,
            errors
        } = signInValidation(this.state.email.trim(), this.state.password)

        if (!isValid) {
            this.setState({ errors })
        } else {
            this.setState({ errors: errors })
            this.props.userLogin(this.state.email.trim(), this.state.password)
        }
    }
    render() {
        const { errors } = this.state
        const { signInLoading } = this.props
        return (
            <View style={{ width: '87%', marginTop: 70 }}>
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
                        returnKeyType={"next"}
                        onSubmitEditing={() => this.passwordInputRefs._root.focus()}
                    />
                </Item>
                {errors.email && (
                    <Text style={styles.errorTextStyle}>
                        {errors.email}
                    </Text>
                )}

                <Item
                    style={{ marginTop: 10, marginBottom: 10 }}
                    error={errors.password ? true : false}
                    style={{ ...styles.transparentInputContainer, marginTop: 10, }}
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
                        returnKeyType={"go"}
                        ref={input => { this.passwordInputRefs = input }}
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



                <LinearGradient
                    colors={['#0078C7', '#003C64']}
                    style={styles.signInButtonStyle}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                >
                    <Button
                        full
                        transparent
                        onPress={this.handleUserLogin}
                    >
                        {
                            signInLoading ?
                                <Spinner color="white" />
                                :
                                <Text style={{ color: 'white', }}>LOGIN</Text>
                        }
                    </Button>
                </LinearGradient>

                <Text
                    style={{
                        fontSize: 15, fontWeight: '300',
                        color: 'white',
                        alignSelf: 'center',
                        marginTop: 30
                    }}
                    onPress={() => this.props.navigation.navigate('ResetPasswordScreen')}
                >
                    Forgot Password ?
                </Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    isSignIn: state.auth.isSignIn,
    isSignInError: state.auth.isSignInError,
    signInLoading: state.auth.signInLoading,
    signInError: state.auth.signInError
})

const mapDispatchToProps = dispatch => ({
    userLogin: (email, password) => dispatch(loginUser(email, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)