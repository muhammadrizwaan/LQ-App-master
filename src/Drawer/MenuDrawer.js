import React from 'react'
import {
    View, Text, SafeAreaView, TouchableOpacity,
    StyleSheet, Image, ScrollView
} from 'react-native'
import { NavigationActions } from 'react-navigation'

import { Button } from 'native-base'

import {
    Item
} from 'native-base'

import { connect } from 'react-redux'
import { onLogout } from '../actions/auth'

import AsyncStorage from '@react-native-community/async-storage'

class MenuDrawer extends React.Component {
    handleLogout = async () => {
        await AsyncStorage.removeItem('userID')
        this.props.logoutUser()
        this.props.navigation.navigate('Auth')
    }
    render() {
        const { user } = this.props
        return (
            <View style={styles.menuDrawer}>
                <View style={styles.container}>
                    <ScrollView>
                        <View >
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                height: 20,
                                alignContent: 'center',
                                alignItems: 'center',
                                marginTop: 20,
                                paddingLeft: 10
                            }}>
                                <Image 
                                    source={{uri: user.userAvatar}}
                                    style={{width: 50, height: 50, borderRadius: 25}}
                                    // <Image source={require('../images/profile_icon.png')}></Image>
                                />
                                <View>
                                    <Text style={styles.lq_points_heading}>{user.name}</Text>
                                    <Text style={styles.lq_points}>
                                        {`Total LQ: ${this.props.user.LQ_POINTS.toFixed(1)}`}
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.user_icon}></Text>

                            {/* <Item style={styles.drawerButtonStyle}>
                                <Text style={styles.colorWhite}>Leadership Library</Text>
                            </Item> */}

                            {/* <Item 
                                style={styles.drawerButtonStyle}
                                onPress={() => this.props.navigation.navigate('ProjectsPortfolio')}
                            >
                                <Text style={styles.colorWhite}>Home</Text>
                            </Item> */}

                            <Item 
                                style={styles.drawerButtonStyle}
                                onPress={() => this.props.navigation.navigate('CreateProjectScreen')}
                            >
                                <Text style={styles.colorWhite}>New Project</Text>
                            </Item>

                            <Item 
                                style={styles.drawerButtonStyle}
                                onPress={() => this.props.navigation.navigate('ExistingProjects')}
                            >
                                <Text style={styles.colorWhite}>Existing Projects</Text>
                            </Item>

                            <Item 
                                style={styles.drawerButtonStyle}
                                onPress={() => this.props.navigation.navigate('ArchiveProjects')}
                            >
                                <Text style={styles.colorWhite}>Archived Projects</Text>
                            </Item>

                            {/* <Item style={styles.drawerButtonStyle}>
                                <Text style={styles.colorWhite}>Template Projects</Text>
                            </Item> */}

                            <Item 
                                style={styles.drawerButtonStyle}
                                onPress={() => this.props.navigation.navigate('LeadershipSurvey')}
                            >
                                <Text style={styles.colorWhite}>Leadership Survey</Text>
                            </Item>

                            {/* <Item style={styles.drawerButtonStyle}>
                                <Text style={styles.colorWhite}>Chat</Text>
                            </Item> */}

                            {/* <Item style={styles.drawerButtonStyle}>
                                <Text style={styles.colorWhite}>Documents</Text>
                            </Item> */}

                            <Item 
                                style={styles.drawerButtonStyle}
                                onPress={() => this.props.navigation.navigate('InstructionsScreen')}
                            >
                                <Text style={styles.colorWhite}>Instructions</Text>
                            </Item>

                            <Item 
                                style={styles.drawerButtonStyle}
                                onPress={() => this.props.navigation.navigate('ProfileScreen')}
                            >
                                {/* <TouchableOpacity style={{ flex: 1 }}> */}
                                    <Text style={styles.colorWhite}>Profile</Text>
                                {/* </TouchableOpacity> */}
                            </Item>

                            <Item style={styles.drawerButtonStyle} onPress={this.handleLogout}>
                                {/* <TouchableOpacity style={{ flex: 1 }} onPress={this.handleLogout}> */}
                                    <Text style={styles.colorWhite}>Logout</Text>
                                {/* </TouchableOpacity> */}
                            </Item>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    menuDrawer: {
        backgroundColor: '#020D33',
        flex: 1,
        paddingTop: 40
    },
    colorWhite: {
        color: '#E9EDF4',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        textAlign: 'left',
        opacity: 0.9,
        fontFamily: 'Montserrat'
    },
    user_icon: {
        color: '#ffffff',
        fontSize: 20,
        marginLeft: 10,
        marginTop: 15
    },
    lq_points_heading: {
        color: '#ffffff',
        marginLeft: 10,
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Montserrat'
    },
    lq_points: {
        color: '#ffffff',
        marginLeft: 10,
        color: 'yellow',
        fontSize: 13,
        fontFamily: 'Montserrat'
    },
    drawerButtonStyle: {
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
        borderColor:"rgba(221, 221, 221, 0.3)",
        borderBottomWidth:0.4,
    }
});

const mapStateToProps = state => ({
    user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(onLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuDrawer)