import React from 'react'

import { ImageBackground, Image, StyleSheet, SafeAreaView } from 'react-native'

import {
    Container, View, Content, Text, Icon, Button, Body,
    Item, Right, Left, 
} from 'native-base'

import EditProfileForm from '../../components/EditProfileComponents/EditProfileForm'
import DismissKeyboardComponent from '../../components/GeneralComponents/DismissKeyboardComponent'

import styles from '../../styles/AuthStyles'

import { connect } from 'react-redux'


class EditProfileScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <Container>
            <DismissKeyboardComponent>
                <View style={styles.rcontainer}>
                    <ImageBackground source={require('../../images/background.png')} style={styles.rbackgroundImage}>
                    <SafeAreaView>
							<Item
                                style={{
                                    borderColor: 'transparent'
                                }}
                            >
                                <Left style={{flex: 1}}>
                                <Button
								transparent
								onPress={() => this.props.navigation.goBack()}
							>
								<Icon
									name="ios-arrow-back"
									style={{
										fontSize: 30,
										color: 'white',
										// marginTop: 20,
										marginLeft: 20
									}}
								/>
							</Button>
                                </Left>
                                <Body style={{flex: 1}}>
                                    <Text style={{color: 'white'}}>Edit Profile</Text>
                                </Body>
                                <Right style={{flex: 1}} />
                            </Item>
						</SafeAreaView>
                    <Content >
                        <View style={styles.rboxcont}>
                            <DismissKeyboardComponent>
                                <>
                                    <EditProfileForm
                                        navigation={this.props.navigation}
                                        user={this.props.user}
                                    />
                                </>
                            </DismissKeyboardComponent>
                        </View>
                    </Content>
                    </ImageBackground>
                </View >
            </DismissKeyboardComponent>
        </Container>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
})

export default connect(mapStateToProps)(EditProfileScreen)