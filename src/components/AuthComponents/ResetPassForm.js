import React from 'react'
import { Image, TouchableOpacity, Alert } from 'react-native'
import {
    View, Item, Input, Text, Icon, Button, Spinner
} from 'native-base'

import styles from '../../styles/AuthStyles'
import IconStyles from '../../styles/IconStyles'

import { firebase } from '../../firebase/firebase'

import resetPassValidation from '../../Validation/resetPassValidation' 
import LinearGradient from 'react-native-linear-gradient'


class ResetPassForm extends React.Component {
    state = {
        email: '',
        errors: {},
        loading: false
    }
    onChangeText = (key, val) => {
        this.setState({
            [key]: val
        })
    }
    handleResetEmail = () => {
        const { errors, isValid } = resetPassValidation(this.state.email.trim())

        if (isValid) {
            this.setState({ loading: true })
            firebase
                .auth()
                .sendPasswordResetEmail(this.state.email.trim())
                .then(data => {
                    this.setState({ loading: false })
                    Alert.alert(
                        'Email Sent',
                        'Please check your E-mail to reset your password'
                    )
                    this.setState({ email: '' })
                    this.props.navigation.goBack()
                })
                .catch(err => {
                    this.setState({ loading: false })
                    Alert.alert(
                        'Email Incorrect',
                        'User Not Found'
                    )
                    this.setState({ errors: { email: 'User Not Found' } })
                })
        } else {
            this.setState({ errors: errors })
        }
    }
    render() {
        const { errors = {}, loading = false } = this.state
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
                    // returnKeyType={""}
                    // onSubmitEditing={() => this.passwordInputRefs._root.focus()}
                    />
                </Item>
                {errors.email && (
                    <Text style={styles.errorTextStyle}>
                        {errors.email}
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
                    onPress={this.handleResetEmail}
                >
                    {
                        loading ?
                            <Spinner color="white" />
                            :
                            <Text style={{ color: 'white', }}>SUBMIT</Text>
                    }
                </Button>
                </LinearGradient>

            </View>
        )
    }
}

export default ResetPassForm