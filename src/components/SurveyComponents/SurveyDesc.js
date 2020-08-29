import React from 'react'
import { View, Text } from 'native-base'

export default SurveyDesc = ({lqHeadingStyle, surveyQuestionStyle, title, desc}) => (
    <View>
        <Text style={lqHeadingStyle}>{title}</Text>
        <Text style={surveyQuestionStyle}>{desc}</Text>
    </View>
)