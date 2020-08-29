import React from 'react'

import { View, Image } from 'react-native'

const eclipse_image = '../../images/eclipse_slice.png'
const tick_image = '../../images/tick_icon.png'

export default ({tickEclipseIcon, isActive}) => (
        <Image style={tickEclipseIcon} source={isActive ? require(tick_image): require(eclipse_image)} />
)