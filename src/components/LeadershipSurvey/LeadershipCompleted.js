import React from 'react'
import { Image, ImageBackground, SafeAreaView } from 'react-native'
import { Icon, View, Text, Content, Container } from 'native-base'

import SelectedAnsContainer from './SelectedAnsContainer'

import CompletedLeadershipHeader from '../ProjectDetailComponents/LeapSheetHeader'

export default ({ navigation, leaderShipSurveyResults }) => (
    <Container>
        <Content>
            <ImageBackground source={require('../../images/background.png')} style={{ width: null, height: 120 }}>
                <SafeAreaView />
                <CompletedLeadershipHeader
                    navigation={navigation}
                    title="LEADERSHIP SURVEY"
                    subTitle=""
                />

            </ImageBackground>

            <View style={{marginTop: -50, marginBottom: 20}}>
                {leaderShipSurveyResults.map(ans => (
                    <SelectedAnsContainer 
                        key={ans.id}
                        ans={ans}
                    />
                ))}
            </View>
        </Content>
    </Container>
)