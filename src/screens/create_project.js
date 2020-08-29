import React from 'react'

import {
    View, FlatList, KeyboardAvoidingView, Dimensions, Keyboard,
    Text, SafeAreaView, Alert, StyleSheet, ImageBackground, Image, Item, Modal, TouchableHighlight, ScrollView,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { Button, Icon, Container, Content, Spinner } from 'native-base'
import styles from '../styles/AuthStyles'
import IconStyles from '../styles/IconStyles'
import DialogStyles from '../styles/DialogStyles'
import { DrawerActions } from "react-navigation-drawer";
import moment from 'moment'
import { connect } from 'react-redux'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Dialog, {
    DialogContent,
} from 'react-native-popup-dialog';

import ProjectDetailHeader from '../components/ProjectDetailComponents/ProjectDetailHeader'

import { startAddProject } from '../actions/createProject'
import { addProject, setProject, changeInputCompetency1, changeInputCompetency2, changeInputCompetency3, changeInputCompetency4, changeInputCompetency5, changeInputCompetency6, changeInputCompetency7, } from '../actions/projectActions'
import { setNameFilter, clearNameFilter } from '../actions/competencyFilter'
import competencySelector from '../selectors/competency-selector'
import data from '../Validation/competencies_buttons'
import uuid from 'uuid'

import axios from 'axios'

import OverlaySpinner from 'react-native-loading-spinner-overlay';

import LinearGradient from 'react-native-linear-gradient'

import DismissKeyboardComponent from '../components/GeneralComponents/DismissKeyboardComponent'
import MasterProjectDialog from '../components/CreateProjectComponents/MasterProjectDialog'
import InputCompetencyModal from '../components/CreateProjectComponents/InputCompetencyModal'
import TotalLQModal from '../components/CreateProjectComponents/TotalLQModal'

import database from '../firebase/firebase'



class CreateProjectScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pressStatusLQ: true,
            pressStatus0: false,
            pressStatus1: false,
            pressStatus2: false,
            pressStatus3: false,
            pressStatus4: false,
            pressStatus5: false,
            pressStatus6: false,
            pressStatus7: false,
            pressStatus8: false,
            pressStatus9: false,
            pressStatus10: false,
            pressStatus11: false,
            pressStatus12: false,
            pressStatus13: false,
            pressStatus14: false,
            pressStatus15: false,
            pressStatus16: false,
            pressStatus17: false,
            pressStatus18: false,
            pressStatus19: false,
            pressStatus20: false,
            defaultAnimationDialog: false,
            defaultAnimationDialog1: false,
            userDefined1Open: false,
            userDefined2Open: false,
            userDefined3Open: false,
            userDefined4Open: false,
            userDefined5Open: false,
            userDefined6Open: false,
            userDefined7Open: false,
            userDefined1: '',
            userDefined2: '',
            userDefined3: '',
            userDefined4: '',
            userDefined5: '',
            userDefined6: '',
            userDefined7: '',
            projectName: '',
            isSaved: false,
            projectSaved: false,
            selectedCompetencies: [],
            error: "",
            projectNameError: false,
            create_project_loading: false,
            userDefined1Error: false,
            userDefined2Error: false,
            userDefined3Error: false,
            userDefined4Error: false,
            userDefined5Error: false,
            userDefined6Error: false,
            userDefined7Error: false,
            masterProjectDialogOpen: false,
            totalLQModalOpen: false,
            inputItemName1: "",
            inputItemName2: "",
            inputItemName3: "",
            inputItemName4: "",
            inputItemName5: "",
            inputItemName6: "",
            inputItemName7: "",
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                defaultAnimationDialog: true,
            })
        }, 100)
    }


    handleOnButtonSelect = (id, name) => {
        if (id !== 'LQ') {
            const buttonName = 'pressStatus' + id

            if (this.state[buttonName]) {
                const new_competencies = this.state.selectedCompetencies.filter(comp => comp.id !== id)
                this.setState({
                    selectedCompetencies: new_competencies
                })
            } else {
                this.setState({
                    selectedCompetencies: [{ id, name }, ...this.state.selectedCompetencies]
                })
            }
            this.setState({
                [buttonName]: !this.state[buttonName]
            })

            Keyboard.dismiss()
        } else {
            this.setState({
                totalLQModalOpen: true
            })
        }
    }

    handleClick = () => {
        this.props.navigation.navigate('Survey');
        this.setState({ defaultAnimationDialog: false });
    }

    static navigationOptions = {
        header: null
    }
    openDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.toggleDrawer())
    }

    handleOnSave = () => {
        Keyboard.dismiss()
        if (this.state.projectName.length < 1) {
            this.setState({ projectNameError: true })
        } else {
            this.setState({ projectNameError: false, })
            this.createProject(true)
        }
    }

    handleNavigateBack = () => {
        this.setState({
            defaultAnimationDialog: false,
        })
        this.props.navigation.goBack()
    }

    createProject = (saved) => {
        if (this.state.selectedCompetencies.length < 1) {
            this.setState({ error: 'Select at least 1 Competency', defaultAnimationDialog1: false, masterProjectDialogOpen: false })
        } else {

            this.setState({ error: '', defaultAnimationDialog1: false, create_project_loading: true })

            let projectName = ''

            if (saved) {
                projectName = this.state.projectName
            } else {
                projectName = `My ${moment.localeData().ordinal(this.props.projects.length + 1)} LQ Elevation Project`
            }

            const projectDetails = {
                name: this.props.projects.length < 1 ? 'My Master LQ Project' : projectName,
                userId: this.props.user.userId,
                id: uuid(),
                isMasterProject: this.props.projects.length < 1 ? true : false
            }


            axios
                .post(
                    'https://us-central1-the-lq-app-development-project.cloudfunctions.net/create_project',
                    {
                        projectDetails,
                        competencies: this.state.selectedCompetencies,
                        myId: this.props.user.userId
                    }
                )
                .then(res => {
                    // console.warn(res);

                    // const project = startAddProject({...projectDetails, id: res.data.project.id}, this.state.selectedCompetencies)

                    const project = res.data.project

                    const new_project = {
                        id: project.id,
                        name: project.name,
                        createdOn: project.createdOn,
                        userId: project.userId,
                        isArchived: false,
                        isMasterProject: projectDetails.isMasterProject
                    }
                    this.props.setProject(new_project)
                    // this.props.addProject(project)
                    this.setState({
                        create_project_loading: false
                    })

                    this.setState({
                        pressStatusLQ: true,
                        pressStatus0: false,
                        pressStatus1: false,
                        pressStatus2: false,
                        pressStatus3: false,
                        pressStatus4: false,
                        pressStatus5: false,
                        pressStatus6: false,
                        pressStatus7: false,
                        pressStatus8: false,
                        pressStatus9: false,
                        pressStatus11: false,
                        pressStatus12: false,
                        pressStatus13: false,
                        pressStatus14: false,
                        pressStatus15: false,
                        pressStatus16: false,
                        pressStatus17: false,
                        pressStatus18: false,
                        pressStatus19: false,
                        pressStatus20: false,
                        defaultAnimationDialog: false,
                        defaultAnimationDialog1: false,
                        projectName: '',
                        isSaved: false,
                        projectSaved: false,
                        selectedCompetencies: [],
                        error: "",
                        projectNameError: false,
                        create_project_loading: false,
                        userDefined1Open: false,
                        userDefined2Open: false,
                        userDefined3Open: false,
                        userDefined4Open: false,
                        userDefined5Open: false,
                        userDefined6Open: false,
                        userDefined7Open: false,
                        userDefined1: '',
                        userDefined2: '',
                        userDefined3: '',
                        userDefined4: '',
                        userDefined5: '',
                        userDefined6: '',
                        userDefined7: '',
                        userDefined1Error: false,
                        userDefined2Error: false,
                        userDefined3Error: false,
                        userDefined4Error: false,
                        userDefined5Error: false,
                        userDefined6Error: false,
                        userDefined7Error: false,
                        masterProjectDialogOpen: false,
                        inputItemName1: "",
                        inputItemName2: "",
                        inputItemName3: "",
                        inputItemName4: "",
                        inputItemName5: "",
                        inputItemName6: "",
                        inputItemName7: "",
                    })

                    this.props.clearNameFilter()

                    this.props.navigation.navigate('ProjectDetails', {
                        id: project.id
                    })
                })




        }
    }

    componentWillUnmount() {
        this.props.clearNameFilter()
    }

    onSearch = (val) => {
        this.props.setNameFilter(val.trim())
    }

    handleUserDefinedModal = (id, inputItemName) => {
        if (id === 18) {
            this.setState({
                userDefined1Open: true,
                userDefined1: inputItemName
            })
        }
        else if (id === 19) {
            this.setState({
                userDefined2Open: true,
                userDefined2: inputItemName
            })
        }
        else if (id === 20) {
            this.setState({
                userDefined3Open: true,
                userDefined3: inputItemName
            })
        }
        else if (id === 21) {
            this.setState({
                userDefined4Open: true,
                userDefined4: inputItemName
            })
        }
        else if (id === 22) {
            this.setState({
                userDefined5Open: true,
                userDefined5: inputItemName
            })
        }
        else if (id === 23) {
            this.setState({
                userDefined6Open: true,
                userDefined6: inputItemName
            })
        }
        else if (id === 24) {
            this.setState({
                userDefined7Open: true,
                userDefined7: inputItemName
            })
        }
    }

    onClose = () => {
        this.setState({
            userDefined1Open: false,
            userDefined2Open: false,
            userDefined3Open: false,
            userDefined4Open: false,
            userDefined5Open: false,
            userDefined6Open: false,
            userDefined7Open: false,
            userDefined1: '',
            userDefined2: '',
            userDefined3: '',
            userDefined4: '',
            userDefined5: '',
            userDefined6: '',
            userDefined7: '',
        })
    }

    handleInputChange = (key, val) => {
        this.setState({
            [key]: val
        })
    }

    handleInput1Save = () => {
        Keyboard.dismiss()
        if (this.state.userDefined1.trim().length < 1) {
            this.setState({
                userDefined1Error: true
            })
        } else {
            this.setState({
                userDefined1Error: false,
                create_project_loading: true
            })
            database
                .ref(`Users/${this.props.user.userId}/competencies/19`)
                .update({
                    isDefined: true,
                    name: this.state.userDefined1.trim()
                })
                .then(() => {

                    this.props.changeInputCompetency1(this.state.userDefined1.trim())
                    this.setState({
                        create_project_loading: false,
                        userDefined1Open: false,
                        userDefined1: "",
                    })

                })
        }
    }


    handleInput2Save = () => {
        Keyboard.dismiss()
        if (this.state.userDefined2.trim().length < 1) {
            this.setState({
                userDefined2Error: true
            })
        } else {
            this.setState({
                userDefined2Error: false,
                create_project_loading: true
            })
            database
                .ref(`Users/${this.props.user.userId}/competencies/20`)
                .update({
                    isDefined: true,
                    name: this.state.userDefined2.trim()
                })
                .then(() => {
                    this.props.changeInputCompetency2(this.state.userDefined2.trim())
                    this.setState({
                        create_project_loading: false,
                        userDefined2Open: false,
                        userDefined2: "",
                    })
                })
        }
    }

    handleInput3Save = () => {
        Keyboard.dismiss()
        if (this.state.userDefined3.trim().length < 1) {
            this.setState({
                userDefined3Error: true
            })
        } else {
            this.setState({
                userDefined3Error: false,
                create_project_loading: true
            })
            database
                .ref(`Users/${this.props.user.userId}/competencies/21`)
                .update({
                    isDefined: true,
                    name: this.state.userDefined3.trim()
                })
                .then(() => {
                    this.props.changeInputCompetency3(this.state.userDefined3.trim())
                    this.setState({
                        create_project_loading: false,
                        userDefined3Open: false,
                        userDefined3: "",
                    })
                })
        }
    }

    handleInput4Save = () => {
        Keyboard.dismiss()
        if (this.state.userDefined4.trim().length < 1) {
            this.setState({
                userDefined4Error: true
            })
        } else {
            this.setState({
                userDefined4Error: false,
                create_project_loading: true
            })
            database
                .ref(`Users/${this.props.user.userId}/competencies/22`)
                .update({
                    isDefined: true,
                    name: this.state.userDefined4.trim()
                })
                .then(() => {
                    this.props.changeInputCompetency4(this.state.userDefined4.trim())
                    this.setState({
                        create_project_loading: false,
                        userDefined4Open: false,
                        userDefined4: "",
                    })
                })
        }
    }

    handleInput5Save = () => {
        Keyboard.dismiss()
        if (this.state.userDefined5.trim().length < 1) {
            this.setState({
                userDefined5Error: true
            })
        } else {
            this.setState({
                userDefined5Error: false,
                create_project_loading: true
            })
            database
                .ref(`Users/${this.props.user.userId}/competencies/23`)
                .update({
                    isDefined: true,
                    name: this.state.userDefined5.trim()
                })
                .then(() => {
                    this.props.changeInputCompetency5(this.state.userDefined5.trim())
                    this.setState({
                        create_project_loading: false,
                        userDefined5Open: false,
                        userDefined5: "",
                    })
                })
        }
    }

    handleInput6Save = () => {
        Keyboard.dismiss()
        if (this.state.userDefined6.trim().length < 1) {
            this.setState({
                userDefined6Error: true
            })
        } else {
            this.setState({
                userDefined6Error: false,
                create_project_loading: true
            })
            database
                .ref(`Users/${this.props.user.userId}/competencies/24`)
                .update({
                    isDefined: true,
                    name: this.state.userDefined6.trim()
                })
                .then(() => {
                    this.props.changeInputCompetency6(this.state.userDefined6.trim())
                    this.setState({
                        create_project_loading: false,
                        userDefined6Open: false,
                        userDefined6: "",
                    })
                })
        }
    }

    handleInput7Save = () => {
        Keyboard.dismiss()
        if (this.state.userDefined7.trim().length < 1) {
            this.setState({
                userDefined7Error: true
            })
        } else {
            this.setState({
                userDefined7Error: false,
                create_project_loading: true
            })
            database
                .ref(`Users/${this.props.user.userId}/competencies/25`)
                .update({
                    isDefined: true,
                    name: this.state.userDefined7.trim()
                })
                .then(() => {
                    this.props.changeInputCompetency7(this.state.userDefined7.trim())
                    this.setState({
                        create_project_loading: false,
                        userDefined7Open: false,
                        userDefined7: "",
                    })
                })
        }
    }


    render() {
        const { user, competencies = [], isProjectLoading } = this.props
        const { error, projectNameError } = this.state
        return (
            <Container style={styles.containerPf}>
                <ImageBackground source={require('../images/background.png')} style={styles.rbackgroundImage}>
                    <OverlaySpinner
                        visible={this.state.create_project_loading}
                        textStyle={{ color: 'white' }}
                    />
                    <SafeAreaView>
                        <ProjectDetailHeader
                            openDrawer={() => { }}
                            navigation={this.props.navigation}
                            myLQScore={this.props.user.LQ_POINTS}
                        />
                        {/* <Button
                            style={{ marginLeft: "4%", width: 50 }}
                            transparent
                            onPress={this.handleNavigateBack}
                        >
                            <Icon name="ios-arrow-back" style={{ color: 'white' }} />
                        </Button> */}
                        {/* <Image style={{ alignSelf: "flex-end", marginRight: 20, marginTop: -30 }} source={require('../images/notification_bell_icon.png')} /> */}
                    </SafeAreaView>
                    <Content
                    >
                        {isProjectLoading ?
                            <Spinner color="white" />
                            :
                            <View>
                                <View style={styles.search}>
                                    <Image
                                        source={require('../images/search_icon_hd.png')}
                                        style={IconStyles.searchIconStyle}
                                    />
                                    <TextInput
                                        placeholder="Search"
                                        placeholderTextColor="#ffffff"
                                        style={{ ...styles.searchInput }}
                                        onChangeText={val => this.onSearch(val)}
                                        value={this.props.text}
                                    />
                                </View>
                                <View style={styles.createProjectText}>
                                    <Text style={styles.createProjectText1}>THE LQ LEADER BOARD</Text>
                                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                        <Text style={styles.createProjectText2}>21</Text>
                                        <Text style={styles.superScriptText}>st</Text>
                                        <Text style={styles.createProjectText2}> Centurt Leadership Competencies</Text>
                                    </View>
                                    <Text style={styles.createProjectText3}>Building Blocks of your Leadership Quotient(LQ)</Text>
                                </View>

                                <View style={styles.createProjectText}>
                                    <Text
                                        style={{
                                            ...styles.createProjectText3,
                                            marginLeft: 20,
                                            marginRight: 20
                                        }}
                                    >
                                        Select all the Competencies or the ones you wish to work on now</Text>
                                </View>

                                {error.length > 0 &&
                                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        <Text style={{ ...styles.createProjectText2, color: '#FF0000' }}>{error}</Text>
                                    </View>
                                }
                                <View style={{ flex: 1, padding: 10, }}>
                                    <FlatList
                                        keyboardShouldPersistTaps={'always'}
                                        data={competencies}
                                        keyExtractor={item => item.id}
                                        renderItem={({ item }) => (
                                            <Button
                                                style={this.state['pressStatus' + item.id] ? styles.activeButton : styles.inactiveButton}
                                                onPress={() => {
                                                    if (item.isDefined === false) {
                                                        this.handleUserDefinedModal(item.id, "")
                                                    }
                                                    else {
                                                        this.handleOnButtonSelect(item.id, item.name)
                                                    }
                                                }}
                                                onLongPress={() => {
                                                    this.handleUserDefinedModal(item.id, item.name)
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        ...styles.textLq,
                                                        // fontSize: item.name.split(' ')[0].length > 12 ? 8 : 11,
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    {item.name}
                                                </Text>
                                                {this.state['pressStatus' + item.id] && item.id !== "LQ" &&
                                                    <Image
                                                        style={styles.imageTextTick}
                                                        source={require('../images/selected.png')}
                                                    />
                                                }
                                            </Button>
                                        )}
                                        numColumns={3}
                                        ListFooterComponent={() => (
                                            <View style={{ marginBottom: 10, marginTop: 10 }}>
                                                <LinearGradient
                                                    colors={['#024483', '#0078C7']}
                                                    style={{
                                                        width: "80%", alignSelf: "center", alignContent: "center", justifyContent: "center", backgroundColor: '#0078C7', borderRadius: 5
                                                    }}
                                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                                >
                                                    <Button
                                                        transparent
                                                        full
                                                        onPress={() => {
                                                            Keyboard.dismiss()
                                                            if (this.props.projects.length > 0) {
                                                                this.setState({
                                                                    defaultAnimationDialog1: true,
                                                                    defaultAnimationDialog: false
                                                                });
                                                            } else {
                                                                this.setState({
                                                                    masterProjectDialogOpen: true
                                                                })
                                                            }

                                                        }}
                                                    ><Text style={{ color: "#ffffff", textAlign: "center", fontSize: 14, fontWeight: "bold", fontFamily: "Montserrat-Regular" }}>NEXT</Text></Button>
                                                </LinearGradient>
                                            </View>
                                        )}
                                        ListEmptyComponent={() => (
                                            <View>
                                                {
                                                    this.props.profileLoading &&
                                                    <Spinner color="white" />
                                                }
                                            </View>
                                        )}
                                    />
                                </View>
                            </View>
                        }

                    </Content>
                </ImageBackground>
                <Dialog
                    onDismiss={() => { this.setState({ defaultAnimationDialog: false }); }}
                    width={0.9}
                    visible={this.state.defaultAnimationDialog}
                    dialogStyle={DialogStyles.dialogContainer}
                    containerStyle={{
                        shadowColor: '#0078C7',
                        shadowOffset: { width: 5, height: 5 },
                        shadowOpacity: 1,
                        shadowRadius: 3,
                        elevation: 5,
                    }}
                    onTouchOutside={() => { this.setState({ defaultAnimationDialog: false }); }}
                    onHardwareBackPress={() => { this.setState({ defaultAnimationDialog: false }); }}
                >
                    <DialogContent style={styles.dialogueContent}>
                        <Icon
                            name="md-close"
                            style={{ color: 'white', position: 'absolute', top: 0, right: 0, margin: 5, opacity: 0.7 }}
                            onPress={() => { this.setState({ defaultAnimationDialog: false }); }}
                        />
                        <View style={DialogStyles.viewStyle}>
                            <Image
                                source={require('../images/survey_popup_icon.png')}
                                style={{ width: 70, height: 70, marginTop: 30, }}
                            />
                            <Text style={DialogStyles.heading}>Would you like to take A Quick Leadership survey?</Text>
                            <Text style={DialogStyles.subHeading}>It's 20 questions and should take about 10 minutes. You'll get some good insights about yourself.</Text>
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
                                onPress={this.handleClick}
                            >
                                <Text style={{ color: "#ffffff", fontSize: 14 }}>START</Text>
                            </Button>
                        </LinearGradient>

                        <TouchableOpacity transparent style={DialogStyles.skipButton} onPress={() => { this.setState({ defaultAnimationDialog: false }); }} >
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
                    </DialogContent>
                </Dialog>

                <Dialog
                    dialogStyle={DialogStyles.dialogContainer}
                    onDismiss={() => { this.setState({ defaultAnimationDialog1: false }); }}
                    width={0.9}
                    square
                    actionsBordered
                    visible={this.state.defaultAnimationDialog1}
                    onTouchOutside={() => { this.setState({ defaultAnimationDialog1: false }); }}
                    onHardwareBackPress={() => { this.setState({ defaultAnimationDialog1: false }); }}
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
                            style={{ color: 'white', position: 'absolute', top: 0, right: 0, margin: 5, opacity: 0.7 }}
                            onPress={() => { this.setState({ defaultAnimationDialog1: false }); }}
                        />
                        <KeyboardAwareScrollView
                            style={{ backgroundColor: 'transparent' }}
                            resetScrollToCoords={{ x: 0, y: 0 }}
                            scrollEnabled={false}
                            keyboardShouldPersistTaps={'always'}
                        >
                            <DismissKeyboardComponent>
                                <View>
                                    <Text style={styles.projectName}>Project Name</Text>
                                    <Text style={styles.projectNameDesc}>Please name the project or skip to the default name.</Text>
                                    <View style={styles.search1}>
                                        <TextInput
                                            placeholder="Project Name"
                                            placeholderTextColor="#ffffff"
                                            style={{
                                                ...styles.searchInput1,
                                                borderColor: projectNameError ? 'red' : 'transparent',
                                                borderWidth: projectNameError ? 1 : 0
                                            }}
                                            value={this.state.projectName}
                                            onChangeText={(val) => this.setState({
                                                projectName: val
                                            })}
                                        />
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
                                            transparent
                                            full
                                            // style={styles.buttonSave}
                                            onPress={() => {
                                                this.handleOnSave()
                                            }}
                                        >
                                            <Text style={{ color: "#ffffff", fontSize: 14 }}>SAVE</Text>
                                        </Button>
                                    </LinearGradient>
                                    <TouchableOpacity
                                        transparent
                                        style={DialogStyles.skipButton}
                                        onPress={() => { this.createProject(false) }}
                                    >
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
                                </View>
                            </DismissKeyboardComponent>
                        </KeyboardAwareScrollView>
                    </DialogContent>
                </Dialog>


                <InputCompetencyModal
                    dialogContainerStyle={DialogStyles.dialogContainer}
                    dialogContentStyle={DialogStyles.DialogContent}
                    skipButtonStyle={DialogStyles.skipButton}
                    isVisible={this.state.userDefined1Open}
                    onClose={this.onClose}
                    styles={styles}
                    value={this.state.userDefined1}
                    error={this.state.userDefined1Error}
                    onChange={this.handleInputChange}
                    keyName="userDefined1"
                    handleOnSave={this.handleInput1Save}
                    inputItemName={this.state.inputItemName1}
                />


                <InputCompetencyModal
                    dialogContainerStyle={DialogStyles.dialogContainer}
                    dialogContentStyle={DialogStyles.DialogContent}
                    skipButtonStyle={DialogStyles.skipButton}
                    isVisible={this.state.userDefined2Open}
                    onClose={this.onClose}
                    styles={styles}
                    value={this.state.userDefined2}
                    error={this.state.userDefined2Error}
                    onChange={this.handleInputChange}
                    keyName={'userDefined2'}
                    handleOnSave={this.handleInput2Save}
                    inputItemName={this.state.inputItemName2}
                />

                <InputCompetencyModal
                    dialogContainerStyle={DialogStyles.dialogContainer}
                    dialogContentStyle={DialogStyles.DialogContent}
                    skipButtonStyle={DialogStyles.skipButton}
                    isVisible={this.state.userDefined3Open}
                    onClose={this.onClose}
                    styles={styles}
                    value={this.state.userDefined3}
                    error={this.state.userDefined3Error}
                    onChange={this.handleInputChange}
                    keyName={'userDefined3'}
                    handleOnSave={this.handleInput3Save}
                    inputItemName={this.state.inputItemName3}
                />

                <InputCompetencyModal
                    dialogContainerStyle={DialogStyles.dialogContainer}
                    dialogContentStyle={DialogStyles.DialogContent}
                    skipButtonStyle={DialogStyles.skipButton}
                    isVisible={this.state.userDefined4Open}
                    onClose={this.onClose}
                    styles={styles}
                    value={this.state.userDefined4}
                    error={this.state.userDefined4Error}
                    onChange={this.handleInputChange}
                    keyName={'userDefined4'}
                    handleOnSave={this.handleInput4Save}
                    inputItemName={this.state.inputItemName4}
                />

                <InputCompetencyModal
                    dialogContainerStyle={DialogStyles.dialogContainer}
                    dialogContentStyle={DialogStyles.DialogContent}
                    skipButtonStyle={DialogStyles.skipButton}
                    isVisible={this.state.userDefined5Open}
                    onClose={this.onClose}
                    styles={styles}
                    value={this.state.userDefined5}
                    error={this.state.userDefined2Error}
                    onChange={this.handleInputChange}
                    keyName={'userDefined5'}
                    handleOnSave={this.handleInput5Save}
                    inputItemName={this.state.inputItemName5}
                />

                <InputCompetencyModal
                    dialogContainerStyle={DialogStyles.dialogContainer}
                    dialogContentStyle={DialogStyles.DialogContent}
                    skipButtonStyle={DialogStyles.skipButton}
                    isVisible={this.state.userDefined6Open}
                    onClose={this.onClose}
                    styles={styles}
                    value={this.state.userDefined6}
                    error={this.state.userDefined6Error}
                    onChange={this.handleInputChange}
                    keyName={'userDefined6'}
                    handleOnSave={this.handleInput6Save}
                    inputItemName={this.state.inputItemName6}
                />

                <InputCompetencyModal
                    dialogContainerStyle={DialogStyles.dialogContainer}
                    dialogContentStyle={DialogStyles.DialogContent}
                    skipButtonStyle={DialogStyles.skipButton}
                    isVisible={this.state.userDefined7Open}
                    onClose={this.onClose}
                    styles={styles}
                    value={this.state.userDefined7}
                    error={this.state.userDefined7Error}
                    onChange={this.handleInputChange}
                    keyName={'userDefined7'}
                    handleOnSave={this.handleInput7Save}
                    inputItemName={this.state.inputItemName7}
                />

                <MasterProjectDialog
                    DialogStyles={DialogStyles}
                    styles={styles}
                    isVisible={this.state.masterProjectDialogOpen}
                    onClose={() => {
                        this.setState({ masterProjectDialogOpen: false })
                    }}
                    handleOnSave={this.createProject}
                />

                <TotalLQModal
                    DialogStyles={DialogStyles}
                    styles={styles}
                    isVisible={this.state.totalLQModalOpen}
                    onClose={() => {
                        this.setState({ totalLQModalOpen: false })
                    }}
                    myLQScore={this.props.user.LQ_POINTS}
                // handleOnSave={this.createProject}
                />
            </Container>
        )
    }
}

const mapStateToProps = (state, props) => ({
    user: state.auth.user,
    profileLoading: state.auth.profileLoading,
    isProjectLoading: state.loader.isProjectLoading,
    projects: state.projects,
    competencies: competencySelector(state.auth.user.competencies, state.competencyFilter),
    text: state.competencyFilter.text
})


const mapDispatchToProps = dispatch => ({
    addProject: (project) => dispatch(addProject(project)),
    setProject: (project) => dispatch(setProject(project)),
    setNameFilter: (text) => dispatch(setNameFilter(text)),
    clearNameFilter: () => dispatch(clearNameFilter()),
    changeInputCompetency1: (name) => dispatch(changeInputCompetency1(name)),
    changeInputCompetency2: (name) => dispatch(changeInputCompetency2(name)),
    changeInputCompetency3: (name) => dispatch(changeInputCompetency3(name)),
    changeInputCompetency4: (name) => dispatch(changeInputCompetency4(name)),
    changeInputCompetency5: (name) => dispatch(changeInputCompetency5(name)),
    changeInputCompetency6: (name) => dispatch(changeInputCompetency6(name)),
    changeInputCompetency7: (name) => dispatch(changeInputCompetency7(name)),
    // startAddProject: (projectDetails, competencies) => dispatch(startAddProject(projectDetails, competencies))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectScreen)