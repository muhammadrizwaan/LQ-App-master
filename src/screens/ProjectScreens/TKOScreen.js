import React from 'react'

import {
    View, Text, SafeAreaView, Alert, StyleSheet, ImageBackground, Image,
} from 'react-native'

import { Button, Icon, Container, Content, Spinner, Item, Left, Right, Body } from 'native-base'
import styles from '../../styles/AuthStyles'
import IconStyles from '../../styles/IconStyles'
import { DrawerActions } from "react-navigation-drawer";

import { connect } from 'react-redux'
import { TextInput } from 'react-native-gesture-handler';

import ActiveButton from '../surveyScreens/ActiveButton'
import SurveyDesc from '../../components/SurveyComponents/SurveyDesc'
import SurveyData from '../../components/SurveyComponents/surveyData'
import SurveyButtons from '../../components/SurveyComponents/SurveyButtons'

import TKOData from '../../TKOData/TKOData'
import TKOInput from '../../components/TKOComponents/TKOInput'


import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';

class TKOScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activeTKO: 0,
            TKO: TKOData[0],
            defaultAnimationDialog: false,
            ansInputText: "",
            error: false
        }
    }
    static navigationOptions = {
        header: null
    }



    openDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.toggleDrawer())
    }

    handleNextSurvey = () => {
        if(this.state.ansInputText.length < 1) {
            this.setState({
                error: true,
            })
        } else {
            this.setState({
                activeTKO: this.state.activeTKO + 1,
                TKO: TKOData[this.state.activeTKO + 1],
                ansInputText: "",
                error: false
            })
        }
        
    }

    handleFinishTKO = () => {
        if(this.state.ansInputText.length < 1) {
            this.setState({
                error: true,
            })
        } else {
            this.props.navigation.goBack();
        }
    }

    handleSkip = () => {
        // this.props.navigation.navigate('CreateProjectScreen');
        this.setState({ defaultAnimationDialog: false });
        this.props.navigation.goBack()

    }

    handleExport = () => {
        // this.props.navigation.navigate('CreateProjectScreen');
        this.setState({ defaultAnimationDialog: false });
        this.props.navigation.goBack()
    }

    onChangeText = (key, val) => {
        this.setState({
            [key]: val
        })
    }
    render() {
        const { user } = this.props
        const { TKO, activeTKO } = this.state
        return (
            <Container style={styles.containerPf}>
                <SafeAreaView />
                <Content style={styles.surveyContent}>
                    <ImageBackground source={require('../../images/background.png')} style={styles.rbackgroundImage}>

                        <Item style={{ borderColor: 'transparent' }}>
                            <Left style={{ flex: 1 }}>
                                <Button transparent onPress={() => this.props.navigation.goBack()}>
                                    <Icon name="ios-arrow-back" style={{ color: 'white' }} />
                                </Button>
                            </Left>
                            <Body style={{ flex: 1 }}>
                                <Text style={styles.surveyHeading}>TKO</Text>
                            </Body>
                            <Right style={{ flex: 1 }} />

                        </Item>


                        <View style={styles.surveyTextContainer}>
                            <View style={styles.tickEclipseIcons}>

                                {TKOData.map((val, index) => (
                                    <ActiveButton
                                        key={index}
                                        isActive={activeTKO === index}
                                        tickEclipseIcon={styles.tickEclipseIcon}
                                    />
                                ))}
                            </View>

                            <SurveyDesc
                                lqHeadingStyle={styles.lqHeading}
                                surveyQuestionStyle={styles.surveyQuestion}
                                title={TKO.title}
                                desc={TKO.description}
                            />
                        </View>
                    </ImageBackground>

                    {/* <SurveyButtons
                        
                    /> */}


                    <TKOInput
                        styles={styles}
                        TKOID={TKOData[activeTKO].id}
                        initialIndex={-1}
                        ansInputText={this.state.ansInputText}
                        onChangeText={this.onChangeText}
                        error={this.state.error}
                    />


                    <View style={styles.surveyNextBtnContainer}>
                        {
                            (activeTKO === TKOData.length - 1)
                                ?
                                <Button onPress={this.handleFinishTKO} style={styles.surveyNextButton}><Text style={styles.surveyNextButtonText}>FINISH</Text></Button>
                                :
                                <Button onPress={this.handleNextSurvey} style={styles.surveyNextButton}><Text style={styles.surveyNextButtonText}>Next >></Text></Button>
                        }
                    </View>



                    <Dialog onDismiss={() => { this.setState({ defaultAnimationDialog: false }); }} width={0.9} visible={this.state.defaultAnimationDialog} square actionsBordered>
                        <DialogContent style={styles.dialogueContent}>
                            <View style={{ alignItems: "center", alignContent: "center", }}>
                                <Text style={{ marginTop: 50, fontSize: 17, color: "#ffffff", textTransform: "uppercase", alignItems: "center", justifyContent: "center", alignItems: "center", alignSelf: "center", textAlign: "center", fontFamily: "Montserrat-Regular" }}>Congratulations!</Text>
                                <Text style={{ marginTop: 10, textAlign: "center", color: "#ffffff", textTransform: "lowercase", alignItems: "center", justifyContent: "center", alignItems: "center", alignSelf: "center", fontFamily: "Montserrat-Regular" }}>Would you like to export your Survey results to XLS or Google Sheets?</Text>
                            </View>
                            <Button style={{ marginBottom: 20, marginTop: 30, backgroundColor: "#0078C7", width: "60%", textAlign: "center", justifyContent: "center" }} onPress={this.handleExport}>
                                <Text style={{ color: "#ffffff", fontSize: 14 }}>EXPORT</Text></Button>
                            <Button style={{ backgroundColor: "transparent", width: "60%", textAlign: "center", justifyContent: "center" }} onPress={this.handleSkip} >
                                <Text style={{ color: "#ffffff", fontSize: 15, fontWeight: "bold" }}>Skip >></Text>
                            </Button>
                        </DialogContent>
                    </Dialog>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    profileLoading: state.auth.profileLoading
})

export default connect(mapStateToProps)(TKOScreen)