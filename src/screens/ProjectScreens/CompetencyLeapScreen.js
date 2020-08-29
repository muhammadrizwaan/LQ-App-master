import React from 'react'
import { ImageBackground, SafeAreaView, Keyboard } from 'react-native'
import { Container, Content, View, Button, Text } from 'native-base'
import CompetencyLeapHeader from '../../components/CompetencyLeapComponents/CompetencyLeapHeader'
import CompetencyTimeline from '../../components/CompetencyLeapComponents/CompetencyTimeline'
import ActiveCompetencyTab from '../../components/CompetencyLeapComponents/ActiveCompetencyTab'
import RenderLeapDetails from '../../components/CompetencyLeapComponents/RenderLeapDetails'

import ProjectStyles from '../../styles/ProjectDetails'
import AuthStyles from '../../styles/AuthStyles'

import SelectLQProgressionDialog from '../../components/CompetencyLeapComponents/SelectLQProgressionDialog'
import TheKiplingOptimizerDialog from '../../components/CompetencyLeapComponents/TheKiplingOptimizerDialog'

import ActiveLevelIndicator from '../../components/CompetencyLeapComponents/ActiveLevelIndicator'

import { connect } from 'react-redux'
import axios from 'axios'
import OverlaySpinner from 'react-native-loading-spinner-overlay';

import { setProgressionLevel } from '../../actions/projectActions'

class CompetencyLeapScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props)

        this.state = {
            activeTabId: 0,
            isSelectDialogVisible: false,
            activeLevel: {},
            tabDetails: {},
            activeLevelNumber: 0,
            isTheKiplingDialogVisible: false,
            loading: false,
            leapPointerVisible: false
        }
    }
    setCurrentLevel = (level) => {
        if (level.Think.isCompleted) {
            if (level.Read.isCompleted) {
                if (level.Write.isCompleted) {
                    if (level.Say.isCompleted) {
                        if (level.Do.isCompleted) {
                            return {
                                tabDetails: level.Reflect,
                                activeTabId: 5
                            }
                        } else {
                            return {
                                tabDetails: level.Do,
                                activeTabId: 4
                            }
                        }
                    } else {
                        return {
                            tabDetails: level.Say,
                            activeTabId: 3
                        }
                    }
                } else {
                    return {
                        tabDetails: level.Write,
                        activeTabId: 2
                    }
                }
            } else {
                return {
                    tabDetails: level.Read,
                    activeTabId: 1
                }
            }
        } else {
            return {
                tabDetails: level.Think,
                activeTabId: 0
            }
        }
    }
    
    componentDidMount() {
        if (this.props.competency.current_level === -1) {

            this.setState({ loading: true });

            axios
                .post(
                    'https://us-central1-the-lq-app-development-project.cloudfunctions.net/set_progression_level',
                    {
                        projectId: this.props.project.id,
                        competencyId: this.props.competency.id,
                        myId: this.props.myId
                    }
                )
                .then(res => {
                    this.setState({ loading: false })
                    if (res.data.error) {
                        return alert(res.data.message)
                    }

                    this.openTKODialog()

                    // const project = this.props.project;
                    // console.log("Before change", project)
                    // project.competencies.map(competency => {
                    //     if(competency.id === this.props.competency.id) {
                    //         return {
                    //             ...competency,
                    //             current_level: 0
                    //         }
                    //     }
                    //     return competency
                    // })
                    // console.log("After change", project)

                    this.props.setProgressionLevel(res.data.project)

                })
                .catch(err => {
                    console.warn("err", err)
                    this.setState({ loading: false })
                    alert(err.response.data)
                })


        } else {
            switch (this.props.competency.current_level) {
                case 0:
                    const tab0 = this.setCurrentLevel(this.props.competency.Level1)
                    this.setState({
                        activeLevel: this.props.competency.Level1,
                        tabDetails: tab0.tabDetails,
                        activeLevelNumber: 0,
                        activeTabId: tab0.activeTabId
                    })
                    break;
                case 1:
                    const tab1 = this.setCurrentLevel(this.props.competency.Level2)
                    this.setState({
                        activeLevel: this.props.competency.Level2,
                        tabDetails: tab1.tabDetails,
                        activeLevelNumber: 1,
                        activeTabId: tab1.activeTabId
                    })
                    break;
                case 2:
                    let tab2 = this.setCurrentLevel(this.props.competency.Level3)
                    this.setState({
                        activeLevel: this.props.competency.Level3,
                        tabDetails: tab2.tabDetails,
                        activeLevelNumber: 2,
                        activeTabId: tab2.activeTabId
                    })
                    break;
                case 3:
                    let tab3 = this.setCurrentLevel(this.props.competency.Level4)
                    this.setState({
                        activeLevel: this.props.competency.Level4,
                        tabDetails: tab3.tabDetails,
                        activeLevelNumber: 3,
                        activeTabId: tab3.activeTabId
                    })
                    break;
                case 4:
                    let tab4 = this.setCurrentLevel(this.props.competency.Level5)
                    this.setState({
                        activeLevel: this.props.competency.Level5,
                        tabDetails: tab4.tabDetails,
                        activeLevelNumber: 4,
                        activeTabId: tab4.activeTabId
                    })
                    break;
                default:
                    let tab5 = this.setCurrentLevel(this.props.competency.Level1)
                    this.setState({
                        activeLevel: this.props.competency.Level1,
                        tabDetails: tab5.tabDetails,
                        activeLevelNumber: 0,
                        activeTabId: tab5.activeTabId
                    })
            }
        }
    }
    setTabDetails = (activeLevel, activeLevelNumber) => {

        switch (this.state.activeTabId) {
            case 0:
                this.setState({
                    tabDetails: activeLevel.Think,
                    activeLevel,
                    activeLevelNumber
                })
                break;
            case 1:
                this.setState({
                    tabDetails: activeLevel.Read,
                    activeLevel,
                    activeLevelNumber
                })
                break;
            case 2:
                this.setState({
                    tabDetails: activeLevel.Write,
                    activeLevel,
                    activeLevelNumber
                })
                break;
            case 3:
                this.setState({
                    tabDetails: activeLevel.Say,
                    activeLevel,
                    activeLevelNumber
                })
                break;
            case 4:
                this.setState({
                    tabDetails: activeLevel.Do,
                    activeLevel,
                    activeLevelNumber
                })
                break;
            case 5:
                this.setState({
                    tabDetails: activeLevel.Reflect,
                    activeLevel,
                    activeLevelNumber
                })
                break;
            default:
                this.setState({
                    tabDetails: activeLevel.Think,
                    activeLevel,
                    activeLevelNumber
                })
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps.competency.current_level !== -1) {
            let activeLevelNumber = 0;
            let activeLevel = newProps.competency.Level1;


            switch (newProps.competency.current_level) {
                case 0:
                    activeLevel = newProps.competency.Level1,
                    activeLevelNumber = 0
                    break;
                case 1:
                    activeLevel = newProps.competency.Level2,
                        activeLevelNumber = 1
                    break;
                case 2:
                    activeLevel = newProps.competency.Level3,
                        activeLevelNumber = 2
                    break;
                case 3:
                    activeLevel = newProps.competency.Level4,
                        activeLevelNumber = 3
                    break;
                case 4:
                    activeLevel = newProps.competency.Level5,
                        activeLevelNumber = 4
                    break;
                default:
                    activeLevel = newProps.competency.Level1,
                        activeLevelNumber = 0
            }

            if (activeLevelNumber !== this.state.activeLevelNumber) {
                this.setState({
                    activeTabId: 0,
                    tabDetails: {}
                })

                this.showLeapPointer()
            }
            this.setTabDetails(
                activeLevel,
                activeLevelNumber
            )
        }
    }
    showLeapPointer = () => {
        this.setState({
            leapPointerVisible: true
        })
    }
    onTabChange = (id) => {
        Keyboard.dismiss()
        this.setState({
            activeTabId: id
        })

        let tabDetails = this.state.tabDetails

        switch (id) {
            case 0:
                tabDetails = this.state.activeLevel.Think
                break;
            case 1:
                tabDetails = this.state.activeLevel.Read
                break;
            case 2:
                tabDetails = this.state.activeLevel.Write
                break;
            case 3:
                tabDetails = this.state.activeLevel.Say
                break;
            case 4:
                tabDetails = this.state.activeLevel.Do
                break;
            case 5:
                tabDetails = this.state.activeLevel.Reflect
                break;
            default:
                tabDetails = this.state.activeLevel.Think
        }
        this.setState({ tabDetails: tabDetails })
    }
    onDialogClose = () => {
        this.setState({ isSelectDialogVisible: false })
    }
    onKiplingDialogClose = (isNavigated, name) => {
        this.setState({ isTheKiplingDialogVisible: false })
        if(!isNavigated) {
            this.showLeapPointer()
        }
    }
   
    openTKODialog = () => {
        this.setState({
            isTheKiplingDialogVisible: true
        })
    }
    render() {
        const { competency, project } = this.props
        // console.log(competency)
        return (
            <Container style={ProjectStyles.container}>
                <OverlaySpinner
                    visible={this.state.loading}
                    textStyle={{ color: 'white' }}
                />
                <ImageBackground source={require('../../images/background.png')} style={ProjectStyles.rbackgroundImage}>

                    <SafeAreaView />
                    <CompetencyLeapHeader
                        navigation={this.props.navigation}
                        competencyName={competency.name}
                        myLQScore={this.props.myLQScore}
                    />

                    <View style={{ ...AuthStyles.surveyTextContainer, paddingBottom: 0 }}>
                        <CompetencyTimeline
                            currentLevel={competency.current_level}
                            isLevel1Completed={competency.Level1.Reflect.isCompleted}
                            isLevel2Completed={competency.Level2.Reflect.isCompleted}
                            isLevel3Completed={competency.Level3.Reflect.isCompleted}
                            isLevel4Completed={competency.Level4.Reflect.isCompleted}
                            isLevel5Completed={competency.Level5.Reflect.isCompleted}
                            tickEclipseIcons={AuthStyles.tickEclipseIcons}
                        />
                    </View>



                    {this.state.activeLevel.Think && <ActiveCompetencyTab
                        activeTabId={this.state.activeTabId}
                        isThinkCompleted={this.state.activeLevel.Think.isCompleted}
                        isReadCompleted={this.state.activeLevel.Read.isCompleted}
                        isWriteCompleted={this.state.activeLevel.Write.isCompleted}
                        isSayCompleted={this.state.activeLevel.Say.isCompleted}
                        isDoCompleted={this.state.activeLevel.Do.isCompleted}
                        isReflectCompleted={this.state.activeLevel.Reflect.isCompleted}
                        onTabChange={this.onTabChange}
                        currentLevel={competency.current_level}
                    />}


                    <ActiveLevelIndicator
                        levelStarted={this.state.activeLevelNumber}
                        tickEclipseIcons={AuthStyles.tickEclipseIcons}
                        leapPointerVisible={this.state.leapPointerVisible}
                        onClose={() => {
                            this.setState({
                                leapPointerVisible: false
                            })
                        }}
                    />





                    {/* <View style={{backgroundColor: 'white', height: '1000%'}}>

                        </View> */}

                    {/* <Content style={{backgroundColor: 'white'}}> */}
                    {this.state.tabDetails.status &&
                        <RenderLeapDetails
                            projectId={project.id}
                            competencyId={competency.id}
                            tabDetails={this.state.tabDetails}
                            // activeLevel={this.props.competency.current_level}
                            activeLevel={this.state.activeLevel}
                            activeTabId={this.state.activeTabId}
                            activeLevelNumber={this.state.activeLevelNumber}
                            myId={this.props.myId}
                            isMasterProject={project.isMasterProject}
                            competencyLQPoints={competency.LQ_Point}
                        />

                    }

                </ImageBackground>
                <SelectLQProgressionDialog
                    isSelectDialogVisible={this.state.isSelectDialogVisible}
                    onDialogClose={this.onDialogClose}
                    navigation={this.props.navigation}
                    projectId={project.id}
                    competencyId={competency.id}
                    openTKODialog={this.openTKODialog}
                    myId={this.props.myId}
                    competencyName={competency.name}
                />

                <TheKiplingOptimizerDialog
                    isSelectDialogVisible={this.state.isTheKiplingDialogVisible}
                    onDialogClose={this.onKiplingDialogClose}
                    navigation={this.props.navigation}
                    projectId={project.id}
                    competencyId={competency.id}
                    myId={this.props.myId}
                />
            </Container>
        )
    }
}

const mapStateToProps = (state, props) => {
    const project = state.single_project
    let competency = {}
    if (project) {
        competency = project.competencies.filter(competency => competency.id === props.navigation.getParam('competencyId'))[0]
    }

    return {
        project: project,
        competency: competency,
        myId: state.auth.user.userId,
        myLQScore: state.auth.user.LQ_POINTS
    }
}

const mapDispatchToProps = (dispatch) => ({
    setProgressionLevel: (project) => dispatch(setProgressionLevel(project))
})

export default connect(mapStateToProps, mapDispatchToProps)(CompetencyLeapScreen)