import React from 'react'
import ProjectDetailHeader from '../../components/ProjectDetailComponents/ProjectDetailHeader'

import {
    ImageBackground, View, Image, TextInput, SafeAreaView
} from 'react-native'
import { DrawerActions } from "react-navigation-drawer";

import {
    Container, Content, Text, Spinner, Button, Icon
} from 'native-base'

import styles from '../../styles/ProjectDetails'
import ProjectStyles from '../../styles/AuthStyles'
import IconStyles from '../../styles/IconStyles'

import { connect } from 'react-redux'

import ProjectCompetencies from '../../components/ProjectDetailComponents/ProjectCompetencies'
import { addProject, startEditMode, stopEditMode } from '../../actions/projectActions'
import database from '../../firebase/firebase'


class ProjectDetails extends React.Component {
    static navigationOptions = {
        header: null
    }
    state = {
        loading: false,
        isDeleteModalVisible: false
    }
    openDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.toggleDrawer())
    }
    componentDidMount() {
        this.setState({
            loading: true
        })
        const projectId = this.props.navigation.getParam('id');

        database
            .ref(`/Projects/${this.props.user.userId}/${projectId}`)
            .once('value')
            .then(snapshot => {
                this.setState({ loading: false })

                let main_competencies = []

                snapshot.forEach(childSnapshot => {
                    if (childSnapshot.key === 'competencies') {
                        childSnapshot.forEach(subChild => {
                            main_competencies.push(subChild.val())
                        })
                    }
                })

                // console.log(main_competencies)
                this.props.addProject({
                    ...snapshot.val(),
                    competencies: main_competencies,
                    id: snapshot.key
                })
            })
    }
    componentWillUnmount() {
        this.props.stopEditMode()
    }
    render() {
        const { project, isEditedMode } = this.props;
        return (
            <Container style={styles.container}>
                <ImageBackground source={require('../../images/background.png')} style={styles.rbackgroundImage}>
                    <SafeAreaView />
                    {
                        this.state.loading ?
                            <View style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                <Spinner color="white" />
                            </View>
                            :
                            project ?
                                <Content>
                                    <ProjectDetailHeader
                                        openDrawer={this.openDrawer}
                                        navigation={this.props.navigation}
                                        myLQScore={this.props.user.LQ_POINTS}
                                    />
                                    <View
                                        style={{
                                            ...ProjectStyles.search,
                                            flexDirection: 'row',
                                            alignSelf: 'center'
                                        }}
                                    >
                                        <Button
                                            transparent
                                            full
                                            style={ProjectStyles.buttonStyle}
                                            onPress={() => {
                                                this.props.navigation.navigate('AddMoreCompetencyScreen', {
                                                    projectId: project.id
                                                })
                                            }}
                                            iconLeft
                                        >
                                            <Icon
                                                name="md-add"
                                                style={{ color: 'white', opacity: 0.5 }}
                                            />
                                            <Text
                                                style={{ color: "white", opacity: 0.5 }}
                                            >
                                                Add
                                            </Text>
                                        </Button>

                                        {isEditedMode ?
                                            <Button
                                                transparent full
                                                style={ProjectStyles.buttonStyle}
                                                onPress={this.props.stopEditMode}
                                                iconLeft
                                            >
                                                <Icon
                                                    name="md-checkmark"
                                                    style={{ color: 'white', opacity: 0.5 }}
                                                />
                                                <Text
                                                    style={{ color: "white", opacity: 0.5 }}
                                                >
                                                    Save
                                                </Text>
                                            </Button>
                                            :
                                            <Button
                                                transparent full
                                                style={ProjectStyles.buttonStyle}
                                                onPress={this.props.startEditMode}
                                                iconLeft
                                            >
                                                <Icon
                                                    name="md-create"
                                                    style={{ color: 'white', opacity: 0.5 }}
                                                />
                                                <Text
                                                    style={{ color: "white", opacity: 0.5 }}
                                                >
                                                    Edit
                                                </Text>
                                            </Button>
                                        }
                                    </View>

                                    <View style={{ padding: 20 }}>
                                        <Text
                                            style={{
                                                ...ProjectStyles.createProjectText1,
                                                textTransform: 'uppercase'
                                            }}
                                        >
                                            {project.name}
                                        </Text>
                                        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                                            <Text style={ProjectStyles.createProjectText2}>
                                                Please select the Leadership Elevation Action Plan (LEAP) Sheet you wish to work on now.
                                    </Text>
                                        </View>
                                    </View>



                                    {
                                        project.competencies.length > 0 ?
                                            <ProjectCompetencies
                                                navigation={this.props.navigation}
                                                competencies={this.props.project.competencies}
                                                projectId={project.id}
                                                isEditedMode={isEditedMode}
                                                myId={this.props.user.userId}
                                                isMasterProject={this.props.project.isMasterProject}
                                                myLQScore={this.props.user.LQ_POINTS}
                                            />
                                            :
                                            <Text style={{ textAlign: 'center', color: 'white' }}>
                                                No Competencies
                                            </Text>
                                    }


                                </Content>
                                :
                                <Text>Project has been deleted</Text>
                    }
                </ImageBackground>
            </Container>
        )
    }
}

const mapStateToProps = (state, props) => {
    return ({
        project: state.single_project,
        user: state.auth.user,
        isEditedMode: state.loader.isEditedMode
    })
}

const mapDispatchToProps = dispatch => ({
    addProject: (project) => dispatch(addProject(project)),
    startEditMode: () => dispatch(startEditMode()),
    stopEditMode: () => dispatch(stopEditMode())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)