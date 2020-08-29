import React from 'react'
import { Image } from 'react-native'
import { View, Text } from 'native-base'

import renderTimelineCircle from  './renderTimelineCircle'
import renderTimelineLine from './renderTimelineLine'


export default CompetencyTimeline = ({
    tickEclipseIcons,
    currentLevel,
    isLevel1Completed,
    isLevel2Completed,
    isLevel3Completed,
    isLevel4Completed,
    isLevel5Completed
}) => (
    <View style={tickEclipseIcons}>
        {renderTimelineCircle(isLevel1Completed, currentLevel === 0, 'red')}
        {renderTimelineLine(isLevel1Completed)}
        {renderTimelineCircle(isLevel2Completed, currentLevel === 1, 'white')}
        {renderTimelineLine(isLevel2Completed)}
        {renderTimelineCircle(isLevel3Completed, currentLevel === 2, 'yellow')}
        {renderTimelineLine(isLevel3Completed)}
        {renderTimelineCircle(isLevel4Completed, currentLevel === 3, 'green')}
        {renderTimelineLine(isLevel4Completed)}
        {renderTimelineCircle(isLevel5Completed, currentLevel === 4, 'blue')}
    </View>
)