import React from 'react'
import { Image } from 'react-native'

export default (isCompleted, isIndicator) => {
    if(isCompleted) {
        return <Image style={{width: '13%', height: 1, opacity: isIndicator ? 0 : 1}} source={require('../../images/competencyAssets/progress_line_filled.png')}/>
    } else {
        return <Image style={{width: '13%', height: 1, opacity: isIndicator ? 0 : 1}} source={require('../../images/competencyAssets/progress_line.png')}/>
    }
}