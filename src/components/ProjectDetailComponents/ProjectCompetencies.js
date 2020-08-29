import React from 'react'
import { FlatList, TouchableOpacity, View, Text, Platform } from 'react-native'

import CompetencyMeter from './ComeptencyMeter'
import DeleteCompetencyModal from '../ProjectDetailComponents/DeleteCompentencyModal'

import axios from 'axios'

import { deleteCompetency, stopEditMode, startEditMode } from '../../actions/projectActions'

import { connect } from 'react-redux'

import { showMessage, hideMessage } from "react-native-flash-message";
import OverlaySpinner from 'react-native-loading-spinner-overlay'

import { minusUserLQ } from '../../actions/projectActions'


class ProjectCompetencies extends React.Component {
    state = {
        isDeleteModalVisible: false,
        competencyId: -1,
        loading: false
    }
    openDeleteModal = (id) => {
        this.setState({
            isDeleteModalVisible: true,
            competencyId: id
        })
    }

    closeDeleteModal = () => {
        this.setState({
            isDeleteModalVisible: false,
            competencyId: -1
        })
    }
    handleOnDelete = () => {
        const projectId = this.props.projectId;
        const competencyId = this.state.competencyId
        const myId = this.props.myId

        this.setState({
            loading: true
        })
        axios
            .post(`https://us-central1-the-lq-app-development-project.cloudfunctions.net/delete_competency`, {
                projectId: projectId,
                competencyId: competencyId,
                myId: myId,
                isMasterProject: this.props.isMasterProject,
                myLQScore: this.props.myLQScore
            })
            .then((res) => {
                this.setState({
                    loading: false,
                    isDeleteModalVisible: false,
                    competencyId: -1,
                })
                if (!res.data.error) {
                this.props.deleteCompetency(projectId, competencyId)
                    showMessage({
                        message: "Competency Sucessfully Deleted",
                        type: "success",
                        position: 'top',
                        icon: 'auto',
                    });
                }   
                console.warn(res.data.new_point)
                if(this.props.isMasterProject) {
                    this.props.minusUserLQ(res.data.new_point);
                }

                this.props.stopEditMode()
                this.props.startEditMode()
            })
            .catch((err) => {
                this.setState({
                    loading: false,
                    isDeleteModalVisible: false,
                    competencyId: -1,
                })
                showMessage({
                    message: "Unable to Delete Competency",
                    type: "danger",
                    position: 'top',
                    icon: 'auto',
                });
            })

    }
    render() {
        const { competencies, isEditedMode } = this.props
        return (
            <View>
                <OverlaySpinner
                    visible={this.state.loading}
                    textStyle={{ color: 'white' }}
                />
                <View style={{ justifyContent: 'center', alignContent: 'space-around', flex: 1, padding: 10, paddingBottom: 40, marginLeft: Platform.OS === 'ios' ? '3%' : '1.7%' }}>
                    <FlatList
                        data={competencies}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <CompetencyMeter
                                competency={item}
                                navigation={this.props.navigation}
                                projectId={this.props.projectId}
                                isEditedMode={isEditedMode}
                                openDeleteModal={this.openDeleteModal}
                            />
                        )}
                        numColumns={3}
                    />
                </View>
                {/* <CompetencyMeter /> */}

                {/* <View style={{ justifyContent: 'space-around', alignContent: 'space-around', alignItems: 'space-around', flex: 1, padding: 10 }}>
                    <FlatList
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Button
                                style={this.state['pressStatus' + item.id] ? styles.activeButton : styles.inactiveButton}
                                onPress={() => this.handleOnButtonSelect(item.id, item.name)}
                            >
                                <Text style={styles.textLq}>
                                    {item.name}
                                </Text>
                                {this.state['pressStatus' + item.id] && item.id !== "LQ" &&
                                    <Text style={styles.imageTextTick}>
                                        <Image
                                            style={styles.imageTick}
                                            source={require('../images/tick_good.png')}
                                        />
                                    </Text>
                                }
                            </Button>
                        )}
                        numColumns={3}
                    />
                </View> */}

                <DeleteCompetencyModal
                    isVisible={this.state.isDeleteModalVisible}
                    onClose={this.closeDeleteModal}
                    handleOnDelete={this.handleOnDelete}
                />
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    deleteCompetency: (projectId, competencyId) => dispatch(deleteCompetency(projectId, competencyId)),
    startEditMode: () => dispatch(startEditMode()),
    stopEditMode: () => dispatch(stopEditMode()),
    minusUserLQ:(LQ_Point) => dispatch(minusUserLQ(LQ_Point))
})

export default connect(null, mapDispatchToProps)(ProjectCompetencies)