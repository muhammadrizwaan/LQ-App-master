import React from 'react'

import {
    View, Text, SafeAreaView, Alert, StyleSheet, ImageBackground, Image, StatusBar
} from 'react-native'

import { Button, Icon, Container, Content, Spinner } from 'native-base'
import styles from '../../styles/AuthStyles'
import { DrawerActions } from "react-navigation-drawer";

import { connect } from 'react-redux'

import { createStackNavigator } from 'react-navigation-stack'

import HomeHeader from '../../components/HomeComponents/HomeHeader'


class ProjectsPortfolio extends React.Component {
    static navigationOptions = {
        header: null
    }
    openDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.toggleDrawer())
    }
    render() {
        const { user, isProjectLoading } = this.props
        return (
            <Container style={styles.containerPf}>
                <ImageBackground source={require('../../images/background.png')} style={styles.rbackgroundImage}>
                    <StatusBar barStyle="light-content" />
                    <SafeAreaView>
                        <HomeHeader
                            openDrawer={this.openDrawer}
                            user_lq_points={user.LQ_POINTS}
                        />
                        {/* <Button style={{marginLeft:"4%"}}
                            transparent
                            onPress={this.openDrawer}
                        >
                            <Icon name="menu" style={{color: 'white'}}/>
                        </Button>

                        <Image style={{alignSelf:"flex-end",marginRight:20,marginTop:-30}}source={require('../../images/notification_bell_icon.png')}/> */}

                    </SafeAreaView>
                    {/* {
                        this.props.profileLoading ?
                            <Spinner color="white" />
                            : */}
                            <Content>
                                <Text style={styles.whiteColor}>{`Hello ${user.name},`}</Text>
                                <Text style={styles.whiteColor1}>What do you want to do today?</Text>
                                <Button 
                                    onPress={() => this.props.navigation.navigate('CreateProjectScreen')} 
                                    style={styles.buttonPf1}
                                >
                                    {this.props.lastProject ?
                                        <Text style={styles.textWhite}>CREATE A NEW PROJECT</Text>
                                        :
                                        <Text style={styles.textWhite}>CREATE MY MASTER LQ PROJECT</Text>                                        
                                    }
                                </Button>
                               
                                {/* <Button style={styles.buttonPf}><Text style={styles.textWhite}>LOOK AT A TEMPLATE PROJECT</Text></Button> */}

                                <Button
                                    style={styles.buttonPf}
                                    onPress={() => this.props.navigation.navigate('InstructionsScreen')}
                                >
                                    <Text style={styles.textWhite}>
                                        GO TO PROJECT SET-UP INSTRUCTIONS
                                    </Text>
                                </Button>

                                <Button
                                    style={styles.buttonPf}
                                    onPress={() => this.props.navigation.navigate('ExistingProjects')}
                                >
                                    <Text style={styles.textWhite}>UPDATE AN EXISTING PROJECT</Text>
                                </Button>
                                <Text style={styles.orText}>-OR-</Text>
                                {
                                    this.props.lastProject ?
                                        <View>
                                            <Button
                                                transparent
                                                style={styles.buttonContinue}
                                            >
                                                <Text
                                                    uppercase={false}
                                                    style={{ ...styles.textWhite, fontSize: 17, textTransform: 'none', opacity: 0.9 }}
                                                >
                                                    Continue Your Latest Project
                                                </Text>
                                            </Button>
                                            <Button
                                                style={styles.buttonMyProject}
                                                onPress={() => this.props.navigation.navigate('ProjectDetails', {
                                                    id: this.props.lastProject.id
                                                })}
                                            >
                                                <Text style={styles.textWhite}>
                                                    {this.props.lastProject.name}
                                                </Text>
                                            </Button>
                                        </View>
                                        :
                                        <Button
                                            onPress={() => this.props.navigation.navigate('CreateProjectScreen')}
                                            style={styles.buttonPf1}
                                            disabled={isProjectLoading}
                                        >
                                            {isProjectLoading ?
                                                <Spinner color="white" />
                                                :
                                                <Text style={styles.textWhite}>
                                                    CREATE ADDITIONAL PROJECT(S)
                                                </Text>
                                            }
                                        </Button>
                                }
                            </Content>
                    {/* } */}
                </ImageBackground>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    profileLoading: state.auth.profileLoading,
    lastProject: state.projects[0],
    isProjectLoading: state.loader.isProjectLoading
})


export default connect(mapStateToProps)(ProjectsPortfolio)