import React from 'react'

import {
    Platform, PermissionsAndroid,
    View, Text, SafeAreaView, Alert, StyleSheet, ImageBackground, Image, TouchableOpacity, StatusBar
} from 'react-native'

import { Button, Icon, Container, Content, Spinner, Item, Left, Right, Body } from 'native-base'
import styles from '../../styles/AuthStyles'
import IconStyles from '../../styles/IconStyles'
import DialogStyles from '../../styles/DialogStyles'
import { DrawerActions } from "react-navigation-drawer";

import { connect } from 'react-redux'
import { TextInput } from 'react-native-gesture-handler';

import OverlaySpinner from 'react-native-loading-spinner-overlay';

import ActiveButton from './ActiveButton'
import SurveyDesc from '../../components/SurveyComponents/SurveyDesc'
import SurveyData from '../../components/SurveyComponents/surveyData'
import SurveyButtons from '../../components/SurveyComponents/SurveyButtons'

import { setLeadershipSurvey } from '../../actions/auth'

import LinearGradient from 'react-native-linear-gradient'

import database from '../../firebase/firebase'

import RNFetchBlob from 'react-native-fetch-blob'

import axios from 'axios'

import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';

class SuverScreen1 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activeSurvey: 0,
            survey: SurveyData[0],
            defaultAnimationDialog: false,
            activeButton: -1,
            error: true,
            loading: false,
            disable: false,
            surveyResults: []
        }
    }
    static navigationOptions = {
        header: null
    }

    openDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.toggleDrawer())
    }

    handleNextSurvey = () => {

        if (this.state.activeButton === -1) {
            Alert.alert('Select an Answer', 'Please Select an Answer')
        } else {
            const prevSurveyResults = this.state.surveyResults;
            const updSurveyResults = prevSurveyResults.concat({ ...SurveyData[this.state.activeSurvey], options: 0, selectedAnsIndex: 0 })

            this.setState({
                surveyResults: updSurveyResults,
                activeSurvey: this.state.activeSurvey + 1,
                survey: SurveyData[this.state.activeSurvey + 1],
                activeButton: -1,
                disable: false,
            })
        }
    }

    handleFinish = () => {
        if (this.state.activeButton === -1) {
            Alert.alert('Select an Answer', 'Please Select an Answer')
        } else {
            if (this.props.isLeadershipSurvey) {
                // console.log(SurveyData)
                const survey_to_save = SurveyData.map(survey => {
                    return {
                        id: survey.id,
                        title: survey.title,
                        description: survey.description,
                        selectedAns: survey.selectedAns
                    }
                })

                this.setState({ loading: true })

                database
                    .ref(`/Users/${this.props.myId}/`)
                    .update({
                        isLeadershipSurveyDone: true,
                        leaderShipSurveyResults: survey_to_save
                    })
                    .then(() => {
                        this.setState({ loading: false })
                        this.props.setLeadershipSurvey(survey_to_save)
                    })
            }
            else {
                const prevSurveyResults = this.state.surveyResults;
                const updSurveyResults = prevSurveyResults.concat({ ...SurveyData[this.state.activeSurvey], options: 0, selectedAnsIndex: 0 })
                this.setState({
                    surveyResults: updSurveyResults,
                })
                this.setState({ defaultAnimationDialog: true, });
            }
        }
    }

    handleSkip = () => {
        this.setState({ defaultAnimationDialog: false });
        this.props.navigation.goBack()
    }

    handleExport = () => {
        this.setState({
            loading: true
        })

        axios
            .post(`https://us-central1-the-lq-app-development-project.cloudfunctions.net/csvJsonReport`, {
                surveyResults: this.state.surveyResults
            })
            .then((res) => {
                if (Platform.OS === 'ios') {
                    const { fs } = RNFetchBlob
                    const DownloadDir = Platform.OS === "ios" ? `${fs.dirs.MainBundleDir}/data.csv` : `${fs.dirs.DownloadDir}/data.csv`
                    // console.log(DownloadDir);


                    RNFetchBlob.fs
                        .writeFile(DownloadDir, res.data, 'utf8')
                        .then(() => {
                            Alert.alert('File Downloaded')
                        })
                        .catch(error => {
                            Alert.alert('Error while exporting');
                            console.warn(error)
                        });

                    this.setState({ defaultAnimationDialog: false, loading: false });
                    this.props.navigation.goBack()

                } else {
                    this.saveFile(res.data)
                }

            })
            .catch(err => {
                this.setState({ loading: false, defaultAnimationDialog: false, })
                this.props.navigation.goBack()

                console.log(err)
            })
    }

    handleSelectAns = (index, option) => {
        this.setState({
            activeButton: index,
            disable: true
        })

        SurveyData[this.state.activeSurvey].selectedAns = option;


        if (this.state.activeSurvey !== SurveyData.length - 1) {
            setTimeout(() => {
                this.handleNextSurvey()
            }, 1000)
        } else {
            if (this.props.isLeadershipSurvey) {
                // console.log(SurveyData)
                const survey_to_save = SurveyData.map(survey => {
                    return {
                        id: survey.id,
                        title: survey.title,
                        description: survey.description,
                        selectedAns: survey.selectedAns
                    }
                })

                this.setState({ loading: true })

                database
                    .ref(`/Users/${this.props.myId}/`)
                    .update({
                        isLeadershipSurveyDone: true,
                        leaderShipSurveyResults: survey_to_save
                    })
                    .then(() => {
                        this.setState({ loading: false })
                        this.props.setLeadershipSurvey(survey_to_save)
                    })
            } else {
                setTimeout(() => {
                    this.handleFinish()
                }, 1000)
            }
        }
    }

    saveFile = async (data) => {

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                const { fs } = RNFetchBlob
                const DownloadDir = Platform.OS === "ios" ? `${fs.dirs.MainBundleDir}/data.csv` : `${fs.dirs.DownloadDir}/data.csv`

                RNFetchBlob.fs
                    .writeFile(DownloadDir, data, 'utf8')
                    .then((res) => {
                        RNFetchBlob.android.addCompleteDownload({
                            title: 'data.csv',
                            description: 'Download complete',
                            mime: 'text/csv',
                            path: DownloadDir,
                            showNotification: true,
                        })
                    })
                    .catch(error => {
                        Alert.alert('Error while exporting')
                        console.error(error)
                    });

                this.setState({
                    defaultAnimationDialog: false,
                    loading: false
                });

                this.props.navigation.goBack()


            } else {
                this.setState({
                    defaultAnimationDialog: false,
                    loading: false
                });
                this.props.navigation.goBack()
                console.log('Permission denied');
            }
        } catch (err) {
            console.warn(err);
            this.setState({
                defaultAnimationDialog: false,
                loading: false
            });
            this.props.navigation.goBack()
        }

    }

    render() {
        const { survey, activeSurvey } = this.state
        // console.warn(SurveyData[this.state.activeSurvey].selectedAns)
        return (
            <Container style={styles.containerPf} >
                <StatusBar barStyle="dark-content" />
                <OverlaySpinner
                    visible={this.state.loading}
                    textStyle={{ color: 'white' }}
                />
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
                                <Text style={styles.surveyHeading}>Survey</Text>
                            </Body>
                            <Right style={{ flex: 1 }} />

                        </Item>


                        <View style={styles.surveyTextContainer}>
                            <View style={styles.tickEclipseIcons}>

                                {SurveyData.map((val, index) => (
                                    <ActiveButton
                                        key={index}
                                        isActive={activeSurvey === index}
                                        tickEclipseIcon={styles.tickEclipseIcon}
                                    />
                                ))}
                            </View>

                            <SurveyDesc
                                lqHeadingStyle={styles.lqHeading}
                                surveyQuestionStyle={styles.surveyQuestion}
                                title={survey.title}
                                desc={survey.description}
                            />
                        </View>
                    </ImageBackground>

                    {/* <SurveyButtons
                        styles={styles}
                        options={SurveyData[activeSurvey].options}
                        surveyId={SurveyData[activeSurvey].id}
                        initialIndex={-1}
                        activeButton={this.state.activeButton}
                        handleSelectAns={this.handleSelectAns}
                        disable={this.state.disable}
                    /> */}

                    <View style={styles.surveyNextBtnContainer}>
                        {
                            (activeSurvey === SurveyData.length - 1)
                                ?
                                <Button
                                    transparent
                                    onPress={this.handleFinish}
                                    style={styles.surveyNextButton}
                                >
                                    <Text style={styles.surveyNextButtonText}>
                                        FINISH
                                    </Text>
                                </Button>
                                :
                                <Button
                                    transparent
                                    onPress={this.handleNextSurvey}
                                    style={styles.surveyNextButton}
                                >
                                    <Text style={styles.surveyNextButtonText}>
                                        Next >>
                                    </Text>
                                </Button>
                        }
                    </View>



                    <Dialog
                        dialogStyle={DialogStyles.dialogContainer}
                        onDismiss={() => { this.setState({ defaultAnimationDialog: false }); }}
                        width={0.9}
                        visible={this.state.defaultAnimationDialog}
                        square
                        actionsBordered
                        containerStyle={{
                            shadowColor: '#0078C7',
                            shadowOffset: { width: 5, height: 5 },
                            shadowOpacity: 1,
                            shadowRadius: 3,
                            elevation: 5,
                        }}
                    >
                        <DialogContent style={styles.dialogueContent}>
                            <Icon
                                name="md-close"
                                style={{ color: 'white', position: 'absolute', top: 0, right: 0, margin: 5 }}
                                onPress={this.handleSkip}
                            />
                            <View style={{ alignItems: "center", alignContent: "center", }}>
                                <Image
                                    source={require('../../images/survey_popup_icon.png')}
                                    style={{ width: 70, height: 70, marginTop: 30, }}
                                />
                                <Text style={{ marginTop: 5, fontSize: 17, color: "#ffffff", textTransform: "uppercase", alignItems: "center", justifyContent: "center", alignItems: "center", alignSelf: "center", textAlign: "center", fontFamily: "Montserrat-Regular" }}>Congratulations!</Text>
                                <Text style={{ marginTop: 10, textAlign: "center", color: "#ffffff", textTransform: "lowercase", alignItems: "center", justifyContent: "center", alignItems: "center", alignSelf: "center", fontFamily: "Montserrat-Regular" }}>Would you like to export your Survey results to XLS or Google Sheets?</Text>
                            </View>

                            <LinearGradient
                                colors={['#0078C7', '#003C64']}
                                style={{
                                    marginBottom: 20,
                                    marginTop: 30,
                                    backgroundColor: "#0078C7",
                                    width: '100%',
                                    textAlign: "center",
                                    justifyContent: "center",
                                    borderRadius: 7
                                }}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            >
                                <Button
                                    full
                                    transparent
                                    onPress={this.handleExport}
                                >
                                    <Text style={{ color: "#ffffff", fontSize: 14 }}>EXPORT</Text>
                                </Button>
                            </LinearGradient>

                            <TouchableOpacity transparent style={DialogStyles.skipButton} onPress={this.handleSkip} >
                                <Text
                                    style={{ color: "#ffffff", fontSize: 15, fontWeight: "bold" }}
                                >
                                    SKIP
                                    </Text>
                                <Icon
                                    name="ios-arrow-forward"
                                    style={{ color: "#ffffff", fontSize: 16, fontWeight: "bold", marginLeft: 3 }}
                                />
                                <Icon
                                    name="ios-arrow-forward"
                                    style={{ color: "#ffffff", fontSize: 16, fontWeight: "bold" }}
                                />
                            </TouchableOpacity>
                            {/* <Button style={{ backgroundColor: "transparent", width: "60%", textAlign: "center", justifyContent: "center" }} onPress={this.handleSkip} >
                                <Text style={{ color: "#ffffff", fontSize: 15, fontWeight: "bold" }}>Skip >></Text>
                            </Button> */}
                        </DialogContent>
                    </Dialog>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    myId: state.auth.user.userId,
    profileLoading: state.auth.profileLoading
})

const mapDispatchToProps = dispatch => ({
    setLeadershipSurvey: (leaderShipSurveyResults) => dispatch(setLeadershipSurvey(leaderShipSurveyResults))
})

export default connect(mapStateToProps, mapDispatchToProps)(SuverScreen1)