import React from 'react'
import { Container, Content, Text, View } from 'native-base'

import NotStartedLeap from './NotStartedLeap'
import StartedLeap from './StartedLeap'
import CompletedLeap from './CompletedLeap'

import styles from '../../styles/AuthStyles'
import DialogStyles from '../../styles/DialogStyles'

import ProgressDialogMeter from "./ProgressDialogMeter"

class RenderLeapDetails extends React.Component {   
    state = {
        isProgressDialogOpen: false
    }
    handleOpenDialog = () => {
        this.setState({
            isProgressDialogOpen: true
        })
    }
    renderLeap = (
        isStarted, 
        isCompleted, 
        leapDetails, 
        projectId, 
        competencyId, 
        activeLevel,
        activeTabId,
        activeLevelNumber,
        isMasterProject,
        competencyLQPoints,
        openProgressDialog
    ) => {
        if(isStarted && isCompleted) {
            return (
                <CompletedLeap 
                    leapDetails={leapDetails}
                    myId={this.props.myId}
                    competencyLQPoints={competencyLQPoints}
                />
            )
        } else if(isStarted) {
            return (
                <StartedLeap 
                    leapDetails={leapDetails}
                    projectId={projectId}
                    competencyId={competencyId}
                    activeLevel={activeLevel}
                    activeTabId={activeTabId}
                    activeLevelNumber={activeLevelNumber}
                    myId={this.props.myId}
                    isMasterProject={isMasterProject}
                    competencyLQPoints={competencyLQPoints}
                    openProgressDialog={openProgressDialog}
                />
            )
        } else {
            return (
                <NotStartedLeap 
                    leapDetails={leapDetails}
                    projectId={projectId}
                    competencyId={competencyId}
                    activeLevel={activeLevel}
                    activeTabId={activeTabId}
                    activeLevelNumber={activeLevelNumber}
                    myId={this.props.myId}
                />
            )
        }
    }
    render() {
        const { tabDetails, activeTabId } = this.props 
        // console.log("isStarted",tabDetails.plan_end_date.toString().length > 0)
        // console.log('isCompleted', tabDetails.isCompleted)
        return (
            // <Content
            //     style={{
            //         backgroundColor: tabDetails.plan_end_date.toString().length > 0 ? 'white' : 'transparent',
            //         marginTop: tabDetails.plan_end_date.toString().length > 0 ? -30 : 0,
            //         // marginTop: -20,
            //         zIndex: -10000,
            //     }}
            // >
            <Container
                style={{
                    marginTop: tabDetails.plan_end_date.toString().length > 0 ? -30 : 0,
                    backgroundColor: 'transparent'
                }}
            >
                {this.renderLeap(
                    tabDetails.isStarted, 
                    tabDetails.isCompleted, 
                    tabDetails,
                    this.props.projectId,
                    this.props.competencyId,
                    this.props.activeLevel,
                    this.props.activeTabId,
                    this.props.activeLevelNumber,
                    this.props.isMasterProject,
                    this.props.competencyLQPoints,
                    this.handleOpenDialog
                )}

                <ProgressDialogMeter 
                    DialogStyles={DialogStyles}
                    styles={styles}
                    onClose={() => this.setState({ isProgressDialogOpen: false })}
                    isVisible={this.state.isProgressDialogOpen}
                    leapDetails={tabDetails}
                    competencyLQPoints={this.props.competencyLQPoints}
                />
            </Container>
            // </Content>
        )
    }
}

export default RenderLeapDetails