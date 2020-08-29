import React from 'react'

import {
    View, FlatList, KeyboardAvoidingView, Dimensions, Keyboard,
    Text, SafeAreaView, Alert, StyleSheet, ImageBackground, Image, Item, Modal, TouchableHighlight, ScrollView,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { Button, Icon, Container, Content, Spinner } from 'native-base'
import styles from '../../styles/AuthStyles'
import IconStyles from '../../styles/IconStyles'
import DialogStyles from '../../styles/DialogStyles'
import { DrawerActions } from "react-navigation-drawer";
import moment from 'moment'
import { connect } from 'react-redux'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Dialog, {
    DialogContent,
} from 'react-native-popup-dialog';

import { addNewCompetencies, changeInputCompetency1, changeInputCompetency2 } from '../../actions/projectActions'
import { setNameFilter, clearNameFilter } from '../../actions/competencyFilter'
import competencySelector from '../../selectors/competency-selector'
import data from '../../Validation/competencies_buttons'
import uuid from 'uuid'

import axios from 'axios'

import OverlaySpinner from 'react-native-loading-spinner-overlay';

import LinearGradient from 'react-native-linear-gradient'

import DismissKeyboardComponent from '../../components/GeneralComponents/DismissKeyboardComponent'
import MasterProjectDialog from '../../components/CreateProjectComponents/MasterProjectDialog'
import InputCompetencyModal from '../../components/CreateProjectComponents/InputCompetencyModal'
import database from '../../firebase/firebase'


const checkCompetencyExistence = (competencies, id) => {
    const check = competencies.filter(competency => competency.id === id)[0]
    if (check) {
        return true
    } else {
        return false
    }
}


class AddMoreCompetencyScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pressStatusLQ: true,
            pressStatus0: props.project ? checkCompetencyExistence(props.project.competencies, 0) : false,
            isAlreadyPressed0: props.project ? checkCompetencyExistence(props.project.competencies, 0) : false,

            pressStatus1: props.project ? checkCompetencyExistence(props.project.competencies, 1) : false,
            isAlreadyPressed1: props.project ? checkCompetencyExistence(props.project.competencies, 1) : false,

            pressStatus2: props.project ? checkCompetencyExistence(props.project.competencies, 2) : false,
            isAlreadyPressed2: props.project ? checkCompetencyExistence(props.project.competencies, 2) : false,

            pressStatus3: props.project ? checkCompetencyExistence(props.project.competencies, 3) : false,
            isAlreadyPressed3: props.project ? checkCompetencyExistence(props.project.competencies, 3) : false,

            pressStatus4: props.project ? checkCompetencyExistence(props.project.competencies, 4) : false,
            isAlreadyPressed4: props.project ? checkCompetencyExistence(props.project.competencies, 4) : false,

            pressStatus5: props.project ? checkCompetencyExistence(props.project.competencies, 5) : false,
            isAlreadyPressed5: props.project ? checkCompetencyExistence(props.project.competencies, 5) : false,

            pressStatus6: props.project ? checkCompetencyExistence(props.project.competencies, 6) : false,
            isAlreadyPressed6: props.project ? checkCompetencyExistence(props.project.competencies, 6) : false,

            pressStatus7: props.project ? checkCompetencyExistence(props.project.competencies, 7) : false,
            isAlreadyPressed7: props.project ? checkCompetencyExistence(props.project.competencies, 7) : false,

            pressStatus8: props.project ? checkCompetencyExistence(props.project.competencies, 8) : false,
            isAlreadyPressed8: props.project ? checkCompetencyExistence(props.project.competencies, 8) : false,

            pressStatus9: props.project ? checkCompetencyExistence(props.project.competencies, 9) : false,
            isAlreadyPressed9: props.project ? checkCompetencyExistence(props.project.competencies, 9) : false,

            pressStatus10: props.project ? checkCompetencyExistence(props.project.competencies, 10) : false,
            isAlreadyPressed10: props.project ? checkCompetencyExistence(props.project.competencies, 10) : false,

            pressStatus11: props.project ? checkCompetencyExistence(props.project.competencies, 11) : false,
            isAlreadyPressed11: props.project ? checkCompetencyExistence(props.project.competencies, 11) : false,

            pressStatus12: props.project ? checkCompetencyExistence(props.project.competencies, 12) : false,
            isAlreadyPressed12: props.project ? checkCompetencyExistence(props.project.competencies, 12) : false,

            pressStatus13: props.project ? checkCompetencyExistence(props.project.competencies, 13) : false,
            isAlreadyPressed13: props.project ? checkCompetencyExistence(props.project.competencies, 13) : false,

            pressStatus14: props.project ? checkCompetencyExistence(props.project.competencies, 14) : false,
            isAlreadyPressed14: props.project ? checkCompetencyExistence(props.project.competencies, 14) : false,

            pressStatus15: props.project ? checkCompetencyExistence(props.project.competencies, 15) : false,
            isAlreadyPressed15: props.project ? checkCompetencyExistence(props.project.competencies, 15) : false,

            pressStatus16: props.project ? checkCompetencyExistence(props.project.competencies, 16) : false,
            isAlreadyPressed16: props.project ? checkCompetencyExistence(props.project.competencies, 16) : false,

            pressStatus17: props.project ? checkCompetencyExistence(props.project.competencies, 17) : false,
            isAlreadyPressed17: props.project ? checkCompetencyExistence(props.project.competencies, 17) : false,

            pressStatus18: props.project ? checkCompetencyExistence(props.project.competencies, 18) : false,
            isAlreadyPressed18: props.project ? checkCompetencyExistence(props.project.competencies, 18) : false,

            pressStatus19: props.project ? checkCompetencyExistence(props.project.competencies, 19) : false,
            isAlreadyPressed19: props.project ? checkCompetencyExistence(props.project.competencies, 19) : false,

            pressStatus20: props.project ? checkCompetencyExistence(props.project.competencies, 20) : false,
            isAlreadyPressed20: props.project ? checkCompetencyExistence(props.project.competencies, 20) : false,

            defaultAnimationDialog1: false,
            userDefined1Open: false,
            userDefined2Open: false,
            userDefined1: '',
            userDefined2: '',
            projectName: '',
            isSaved: false,
            projectSaved: false,
            selectedCompetencies: [],
            error: "",
            projectNameError: false,
            create_project_loading: false,
            userDefined1Error: false,
            userDefined2Error: false,
        }
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
        }
    }


    static navigationOptions = {
        header: null
    }

    handleNavigateBack = () => {
        this.props.navigation.navigate('ProjectDetails', {
            projectId: this.props.project.id
        })
    }

    onSaveCompetency = () => {
        if (this.state.selectedCompetencies.length < 1) {
            this.setState({
                error: 'Select One or More Competencies to save'
            })
        } else {
            this.setState({
                create_project_loading: true,
                error: ''
            })

            const results_competencies = [];

            this.state.selectedCompetencies.forEach(async (competency, index) => {
                this.setState({ create_project_loading: true })

                let res = await axios
                    .post(`https://us-central1-the-lq-app-development-project.cloudfunctions.net/addMoreCompetency`, {
                        competency: competency,
                        myId: this.props.user.userId,
                        projectId: this.props.project.id
                    })
                // .then(res => {

                if (res.data.error) {
                    this.setState({
                        error: res.data.message
                    })
                } else {
                    // console.log(res.data.competency)
                    results_competencies.push(res.data.competency)

                    if ((index + 1) === this.state.selectedCompetencies.length) {
                        setTimeout(() => {
                            this.setState({ create_project_loading: false })
                            // console.warn("index ended", index)
                            // console.log("results competencies", results_competencies);
                            this.props.addNewCompetencies(
                                this.props.project.id,
                                results_competencies
                            )

                            this.props.navigation.navigate('ProjectDetails', {
                                projectId: this.props.project.id
                            })
                        }, 2000)
                    }
                }
                // })
                // .catch(err => {
                // this.setState({ create_project_loading: false })
                // console.warn(err)
                // })
            })



            // axios
            //     .post(`https://us-central1-the-lq-app-development-project.cloudfunctions.net/addMoreCompetency`, {
            //         competencies: this.state.selectedCompetencies,
            //         myId: this.props.user.userId,
            //         projectId: this.props.project.id
            //     })
            //     .then(res => {
            //         this.setState({ create_project_loading: false })
            //         // console.warn(res)
            //         if (!res.data.error) {
            //             this.props.addNewCompetencies(
            //                 this.props.project.id,
            //                 res.data.new_compentencies
            //             )

            //             this.props.navigation.navigate('ProjectDetails', {
            //                 projectId: this.props.project.id
            //             })
            //         } else {
            //             this.setState({
            //                 error: res.data.message
            //             })
            //         }
            //     })
            //     .catch(err => {
            //         this.setState({ create_project_loading: false })
            //         console.warn(err)
            //     })
        }


    }

    componentWillUnmount() {
        this.props.clearNameFilter()
    }

    onSearch = (val) => {
        this.props.setNameFilter(val.trim())
    }

    handleUserDefinedModal = (id) => {
        if (id === 18) {
            this.setState({
                userDefined1Open: true
            })
        } else if (id === 19) {
            this.setState({
                userDefined2Open: true
            })
        }
    }

    onClose = () => {
        this.setState({
            userDefined1Open: false,
            userDefined2Open: false
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


    render() {
        const { user, competencies = [] } = this.props
        const { error, projectNameError } = this.state
        return (
            <Container style={styles.containerPf}>
                <ImageBackground source={require('../../images/background.png')} style={styles.rbackgroundImage}>
                    <OverlaySpinner
                        visible={this.state.create_project_loading}
                        textStyle={{ color: 'white' }}
                    />
                    <SafeAreaView>
                        <Button
                            style={{ marginLeft: "4%", width: 50 }}
                            transparent
                            onPress={this.handleNavigateBack}
                        >
                            <Icon name="ios-arrow-back" style={{ color: 'white' }} />
                        </Button>
                        {/* <Image style={{ alignSelf: "flex-end", marginRight: 20, marginTop: -30 }} source={require('../../images/notification_bell_icon.png')} /> */}
                    </SafeAreaView>
                    <Content
                    >

                        <View style={styles.search}>
                            <Image
                                source={require('../../images/search_icon_hd.png')}
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
                            <Text style={styles.createProjectText1}>{this.props.project.name}</Text>
                            <Text style={styles.createProjectText2}>Select the Competencies you want to add</Text>
                            {/* <Text style={styles.createProjectText3}>Building Blocks of your Leadership Quotient(LQ)</Text> */}
                        </View>


                        {error.length > 0 &&
                            <View style={{ marginTop: 10, marginBottom: 10 }}>
                                <Text style={{ ...styles.createProjectText2, color: 'red' }}>{error}</Text>
                            </View>
                        }
                        <View style={{ flex: 1, padding: 10, marginLeft: '2%' }}>
                            <FlatList
                                keyboardShouldPersistTaps={'always'}
                                data={competencies}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                    <Button
                                        style={
                                            this.state['isAlreadyPressed' + item.id] ?
                                                { ...styles.activeButton, opacity: 0.4 }
                                                :
                                                this.state['pressStatus' + item.id] ? styles.activeButton : styles.inactiveButton
                                        }
                                        onPress={() => {
                                            if (item.isDefined === false) {
                                                this.handleUserDefinedModal(item.id)
                                            }
                                            else {
                                                this.handleOnButtonSelect(item.id, item.name)
                                            }
                                        }}
                                        disabled={this.state['isAlreadyPressed' + item.id]}
                                    >
                                        <Text
                                            style={{
                                                ...styles.textLq,
                                                fontSize: item.name.split(' ')[0].length > 13 ? 8 : 11,
                                                textAlign: 'center'
                                            }}
                                        >
                                            {item.name}
                                        </Text>
                                        {this.state['pressStatus' + item.id] && item.id !== "LQ" &&
                                            <Image
                                                style={styles.imageTextTick}
                                                source={require('../../images/selected.png')}
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
                                                    this.onSaveCompetency()
                                                }}
                                            ><Text style={{ color: "#ffffff", textAlign: "center", fontSize: 14, fontWeight: "bold", fontFamily: "Montserrat-Regular" }}>SAVE</Text></Button>
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
                    </Content>
                </ImageBackground>

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
                />

            </Container>
        )
    }
}

const mapStateToProps = (state, props) => ({
    user: state.auth.user,
    profileLoading: state.auth.profileLoading,
    competencies: competencySelector(state.auth.user.competencies, state.competencyFilter),
    text: state.competencyFilter.text,
    project: state.single_project
})


const mapDispatchToProps = dispatch => ({
    addNewCompetencies: (projectId, competencies) => dispatch(addNewCompetencies(projectId, competencies)),
    setNameFilter: (text) => dispatch(setNameFilter(text)),
    clearNameFilter: () => dispatch(clearNameFilter()),
    changeInputCompetency1: (name) => dispatch(changeInputCompetency1(name)),
    changeInputCompetency2: (name) => dispatch(changeInputCompetency2(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddMoreCompetencyScreen)