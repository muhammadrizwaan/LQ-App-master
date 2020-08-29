import React from 'react'
import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import { Container, Spinner } from 'native-base'
import { connect } from 'react-redux';

import LeadershipCompleted from '../../components/LeadershipSurvey/LeadershipCompleted'
import Survey from '../surveyScreens/Survey'

class LeadershipSurvey extends React.Component {
    static navigationOptions = {
        header: null
    }
    render() {
        const {
            isLeadershipSurveyDone,
            leaderShipSurveyResults,
            profileLoading
        } = this.props
        return (
            <Container >
            <StatusBar barStyle="dark-content" />
                {
                    profileLoading ?
                        <Spinner 
                            color="black" 
                            style={{
                                marginTop: 40,
                                alignSelf: 'center'
                            }}
                        />
                        :

                        isLeadershipSurveyDone ?
                            <LeadershipCompleted
                                navigation={this.props.navigation}
                                leaderShipSurveyResults={leaderShipSurveyResults}
                            />
                            :
                            <Survey
                                navigation={this.props.navigation}
                                isLeadershipSurvey={true}
                            />

                }
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    isLeadershipSurveyDone: state.auth.user.isLeadershipSurveyDone,
    leaderShipSurveyResults: state.auth.user.leaderShipSurveyResults,
    profileLoading: state.auth.profileLoading,
})

export default connect(mapStateToProps)(LeadershipSurvey)