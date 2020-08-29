import React from 'react'
import { ImageBackground, SafeAreaView, Dimensions } from 'react-native'
import { Container, Item, Right, Body, Left, Button, Icon, Text } from 'native-base'
import ProfileHeader from '../../components/ProjectDetailComponents/LeapSheetHeader'

import ProfileCard from '../../components/ProfileComponents/ProfileCard'

import { connect } from 'react-redux'


class ProfileScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    render() {
        const Height = Dimensions.get('window').height;
        const { user } = this.props
        return (
            <Container>
                <ImageBackground source={require('../../images/background.png')} style={{ width: null, height: (Height * 30 /100) }}>
                    <SafeAreaView />
                    <Item style={{borderColor: 'transparent'}}>
                        <Left style={{ flex: 1 }}>
                            <Button
                                transparent
                                onPress={() => this.props.navigation.goBack()}
                            >
                                <Icon name="ios-arrow-back" style={{ color: 'white' }} />
                            </Button>
                        </Left>
                        <Body style={{ flex: 1 }}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Profile</Text>
                        </Body>
                        <Right style={{ flex: 1 }}>
                            <Button
                                transparent
                                onPress={() => this.props.navigation.navigate('EditProfileScreen')}
                            >
                                <Icon name="ios-create" style={{ color: 'white', fontSize: 13 }} />
                                <Text style={{color: 'white', fontSize: 13, marginLeft: -30}}>Edit</Text>
                            </Button>
                        </Right>
                    </Item>

                    <ProfileCard 
                        Height={Height}
                        user={user}
                    />
                </ImageBackground>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(ProfileScreen)