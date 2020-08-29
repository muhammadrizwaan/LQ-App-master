import React from 'react'
import { ImageBackground, SafeAreaView, StatusBar, TouchableHighlight } from 'react-native'
import {
    Container, Content, Button, Text, Icon, Spinner, View
} from 'native-base'
import styles from '../../styles/AuthStyles'
import { connect } from 'react-redux'
import Swipeable from 'react-native-swipeable-row';

import database from '../../firebase/firebase'
import { setArchiveProject } from '../../actions/archiveProjects'
import { removeProject, startEditMode } from '../../actions/projectActions'
import ExistingProjectHeader from '../../components/ProjectDetailComponents/LeapSheetHeader'

import OverlaySpinner from 'react-native-loading-spinner-overlay'
import ExistingProjectMenuButton from "../../components/HomeComponents/ExistingProjectMenuButton"


class ExistingProjects extends React.Component {
    static navigationOptions = {
        header: null
    }

    state = {
        loading: false
    }

    onArchiveProject = (project) => {
        this.setState({
            loading: true
        })
        const new_project = {
            id: project.id,
            name: project.name,
            createdOn: project.createdOn,
            userId: project.userId,
            isArchived: true,
        }

        database
            .ref(`/Projects/${this.props.myId}/${project.id}`)
            .update({
                isArchived: true
            })
            .then(() => {
                this.setState({ loading: false })
                this.props.removeProject(project.id);
                this.props.setArchiveProject(new_project)
            })
            .catch(err => this.setState({ loading: false }))
    }

    render() {
        let { projects = [] } = this.props
        // console.log(projects)
        return (
            <Container>
                <OverlaySpinner
                    visible={this.state.loading}
                    textStyle={{ color: 'white' }}
                />
                <Content>
                    <ImageBackground source={require('../../images/background.png')} style={{ width: null, height: 150 }}>
                        <StatusBar barStyle="light-content" />
                        <SafeAreaView />

                        <ExistingProjectHeader
                            navigation={this.props.navigation}
                            title="Existing Projects"
                            subTitle=""
                        />
                    </ImageBackground>

                    {this.props.isProjectsLoading ?
                        <Spinner
                            color="black"
                        />
                        :
                        projects.length > 0 ?
                            <View style={{ marginTop: -40 }}>
                                {projects.map(project => (
                                    <View
                                        style={{
                                            // width: "100%",
                                            width: "80%",
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            alignSelf: "center"
                                        }}
                                        key={project.id}
                                    >
                                        <Button
                                            style={{
                                                ...styles.buttonPf,
                                                height: 64,
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 2,
                                                },
                                                shadowOpacity: 0.15,
                                                shadowRadius: 3.84,
                                                elevation: 5,
                                                backgroundColor: 'white',
                                                width: "80%"
                                            }}
                                            onPress={() => this.props.navigation.navigate('ProjectDetails', {
                                                id: project.id
                                            })}
                                        >
                                            <Text style={{
                                                ...styles.textWhite,
                                                color: '#1E2E50',
                                                textTransform: 'uppercase',
                                                fontWeight: 'bold'
                                            }}>{project.name}</Text>
                                        </Button>



                                        <ExistingProjectMenuButton 
                                            buttonPf={styles.buttonPf}
                                            navigation={this.props.navigation}
                                            startEditMode={this.props.startEditMode}
                                            project={project}
                                            onArchiveProject={this.onArchiveProject}
                                        />

                                    </View>
                                ))}
                            </View>
                            :
                            <Text
                                style={{
                                    color: 'black',
                                    alignSelf: 'center',
                                    marginTop: 40
                                }}
                            >
                                No Projects.
                            </Text>
                    }

                    {/* <Button style={styles.buttonPf}><Text style={styles.textWhite}>LOOK AT A TEMPLATE PROJECT</Text></Button>
                    <Button style={styles.buttonPf}><Text style={styles.textWhite}>GO TO PROJECT SET-UP INSTRUCTIONS</Text></Button>
                </Content> */}

                </Content>
            </Container >
        )
    }
}

const mapStateTopProps = state => ({
    projects: state.projects,
    isProjectsLoading: state.loader.isProjectLoading,
    myId: state.auth.user.userId
})

const mapDispatchToProps = dispatch => ({
    removeProject: (id) => dispatch(removeProject(id)),
    setArchiveProject: (project) => dispatch(setArchiveProject(project)),
    startEditMode: () => dispatch(startEditMode())
})

export default connect(mapStateTopProps, mapDispatchToProps)(ExistingProjects)



//     < Swipeable
// key = { project.id }
// rightButtons = {
//     [
//         <Button
//             full
//             transparent
//             style={{
//                 width: 54,
//                 height: 64,
//                 backgroundColor: '#3B83AF',
//                 borderRadius: 7,
//             }}
//             onPress={() => {
//                 this.props.startEditMode()
//                 this.props.navigation.navigate('ProjectDetails', {
//                     id: project.id
//                 })
//             }}
//         >
//             <Icon
//                 name="md-create"
//                 style={{ color: 'white', fontSize: 24 }}
//             />
//         </Button> ,
//         <Button
//             full
//             transparent
//             style={{
//                 width: 54,
//                 height: 64,
//                 backgroundColor: '#D50000',
//                 borderRadius: 7,
//                 display: project.isMasterProject ? "none" : "flex"
//             }}
            // onPress={() => {
            //     if (!project.isMasterProject) {
            //         this.onArchiveProject(project)
            //     }
            // }}
//         >
//             <Icon
//                 name="md-trash"
//                 style={{ color: 'white', fontSize: 24 }}
//             />
//         </Button>
//     ]
//                                         }
//     >
//     <Button
//         key={project.id}
//         full
    //     style={{
    //         ...styles.buttonPf,
    //         height: 64,
    //         shadowOffset: {
    //             width: 0,
    //             height: 2,
    //         },
    //         shadowOpacity: 0.15,
    //         shadowRadius: 3.84,
    //         elevation: 5,
    //         backgroundColor: 'white'
    //     }}
    //     onPress={() => this.props.navigation.navigate('ProjectDetails', {
    //         id: project.id
    //     })}
    // >
    //     <Text style={{
    //         ...styles.textWhite,
    //         color: '#1E2E50',
    //         textTransform: 'uppercase',
    //         fontWeight: 'bold'
    //     }}>{project.name}</Text>
    // </Button>
//                                     </Swipeable >