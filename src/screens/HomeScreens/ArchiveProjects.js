import React from 'react'
import { ImageBackground, SafeAreaView, StatusBar, TouchableHighlight } from 'react-native'
import {
    Container, Content, Button, Text, Icon, Spinner, View
} from 'native-base'
import styles from '../../styles/AuthStyles'

import { connect } from 'react-redux'
import Swipeable from 'react-native-swipeable-row';

import database from '../../firebase/firebase'
import { removeArchiveProject } from '../../actions/archiveProjects'
import { setProject } from '../../actions/projectActions'

import ExistingProjectHeader from '../../components/ProjectDetailComponents/LeapSheetHeader'

import OverlaySpinner from 'react-native-loading-spinner-overlay'

import ArchiveProjectMenuButton from "../../components/HomeComponents/ArchiveProjectMenuButton"

class ExistingProjects extends React.Component {
    static navigationOptions = {
        header: null
    }

    state = {
        loading: false
    }

    onUnArchiveProject = (project) => {
        this.setState({
            loading: true
        })
        const new_project = {
            id: project.id,
            name: project.name,
            createdOn: project.createdOn,
            userId: project.userId,
            isArchived: false
        }

        database
            .ref(`/Projects/${this.props.myId}/${project.id}`)
            .update({
                isArchived: false
            })
            .then(() => {
                this.setState({ loading: false })
                this.props.removeArchiveProject(project.id)
                this.props.setProject(new_project)
            })
            .catch(err => this.setState({ loading: false }))


    }

    render() {
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
                            title="Archive Projects"
                            subTitle=""
                        />
                    </ImageBackground>

                    {this.props.isProjectsLoading ?
                        <Spinner
                            color="black"
                        />
                        :
                        this.props.projects.length > 0 ?
                            <View style={{ marginTop: -40 }}>
                                {this.props.projects.map(project => (
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
                                            // onPress={() => this.props.navigation.navigate('ProjectDetails', {
                                            //     id: project.id
                                            // })}
                                        >
                                            <Text style={{
                                                ...styles.textWhite,
                                                color: '#1E2E50',
                                                textTransform: 'uppercase',
                                                fontWeight: 'bold'
                                            }}>{project.name}</Text>
                                        </Button>



                                        <ArchiveProjectMenuButton
                                            buttonPf={styles.buttonPf}
                                            onUnArchiveProject={this.onUnArchiveProject}
                                            navigation={this.props.navigation}
                                            project={project}
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
                                No Archived Projects.
                            </Text>
                    }


                </Content>
            </Container >
        )
    }
}

const mapStateTopProps = state => ({
    projects: state.archiveProjects,
    isProjectsLoading: state.loader.isProjectLoading,
    myId: state.auth.user.userId
})

const mapDispatchToProps = dispatch => ({
    removeArchiveProject: (id) => dispatch(removeArchiveProject(id)),
    setProject: (project) => dispatch(setProject(project))
})

export default connect(mapStateTopProps, mapDispatchToProps)(ExistingProjects)




// <Swipeable
//                                         key={project.id}
//                                         rightButtons={
//                                             [
//                                                 <Button
//                                                     full
//                                                     transparent
//                                                     style={{
//                                                         width: 54,
//                                                         height: 64,
//                                                         backgroundColor: 'green',
//                                                         borderRadius: 7,
//                                                     }}
//                                                     onPress={() => this.onUnArchiveProject(project)}
//                                                 >
//                                                     <Icon
//                                                         name="ios-save"
//                                                         style={{ color: 'white', fontSize: 24 }}
//                                                     />
//                                                 </Button>
//                                             ]
//                                         }
//                                     >
//                                         <Button
//                                             key={project.id}
//                                             full
//                                             style={{
//                                                 ...styles.buttonPf,
//                                                 height: 64,
//                                                 shadowOffset: {
//                                                     width: 0,
//                                                     height: 2,
//                                                 },
//                                                 shadowOpacity: 0.15,
//                                                 shadowRadius: 3.84,
//                                                 elevation: 5,
//                                                 backgroundColor: 'white'
//                                             }}
//                                             // onPress={() => this.props.navigation.navigate('ProjectDetails', {
//                                             //     id: project.id
//                                             // })}
//                                         >
//                                             <Text style={{
//                                                 ...styles.textWhite,
//                                                 color: '#1E2E50',
//                                                 textTransform: 'uppercase',
//                                                 fontWeight: 'bold'
//                                             }}>{project.name}</Text>
//                                         </Button>
//                                     </Swipeable>