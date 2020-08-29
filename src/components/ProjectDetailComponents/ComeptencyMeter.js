import React from 'react'
import { TouchableOpacity, Image, View, Text, Dimensions } from 'react-native'

import RNSpeedometer from 'react-native-speedometer'
import {  Icon } from 'native-base';

import AuthStyles from '../../styles/AuthStyles'

class CompetencyMeter extends React.Component {
    render() {
        const { competency, projectId, isEditedMode, openDeleteModal } = this.props
        let Width = Dimensions.get('window').width
        // console.warn(Width * 13.5 / 100);
        const image_width = Width * 24.5 / 100
        const image_height = Width * 13.5 / 100
        return (
            <TouchableOpacity
                style={{ marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 10 }}
                onPress={() => {
                    if(!isEditedMode) {
                        if (competency.current_level === - 1) {
                            this.props.navigation.navigate('LeapSheetsPlan', {
                                competencyId: competency.id,
                                projectId: projectId
                            })
                        } else {
                            this.props.navigation.navigate('CompetencyLeapScreen', {
                                competencyId: competency.id,
                                projectId: projectId
                            })
                        }
                    }
                }}
                disabled={isEditedMode}
            >

                <Image
                    style={{ 
                        width: image_width, 
                        height: image_height,  
                        opacity: isEditedMode ? 0.5 : 1
                    }}
                    source={require('../../images/logo_bg.png')}
                />
                {isEditedMode && <TouchableOpacity
                    transparent 
                    style={{
                        ...AuthStyles.removeImageButtonStyle,
                        width: 25,
                        height: 25,
                        paddingTop: 0
                    }}
                    onPress={() => openDeleteModal(competency.id)}
                >
                    <Icon name="close" style={{ marginLeft: 0, marginRight: 0, color: 'white', fontSize: 27, alignSelf: 'center', paddingTop: 0 }} />
                </TouchableOpacity>}
                <View style={{ position: 'absolute', top: 5, left: 5, opacity: isEditedMode ? 0.5 : 1 }}>
                    <RNSpeedometer
                        value={competency.LQ_Point}
                        minValue={0}
                        maxValue={200}
                        size={image_width - 10}
                        labelNoteStyle={{
                            display: 'none'
                        }}
                        labelStyle={{
                            display: 'none'
                        }}
                        innerCircleStyle={{
                            display: 'none',
                            backgroundColor: 'transparent'
                        }}
                        outerCircleStyle={{
                            // marginTop: -50,
                            backgroundColor: 'transparent'
                        }}
                        halfCircleStyle={{
                            display: 'none',
                            backgroundColor: 'transparent'
                        }}
                    />
                </View>
                <View style={{ position: 'absolute', top: 60, alignSelf: 'center', opacity: isEditedMode ? 0.5 : 1 }}>
                    <Text
                        style={{ 
                            color: '#FFFFFF', 
                            textAlign: 'center', 
                            // fontSize: 12,
                            fontSize: competency.name.split(' ')[0].length > 11 ? 11 : 12
                        }}
                        numberOfLines={2}
                        adjustsFontSizeToFit
                    >
                        {competency.name}
                    </Text>
                </View>
                <Text style={{ opacity: 0 }}></Text>
                <Text style={{ opacity: 0 }}></Text>
                <Text style={{ opacity: 0 }}></Text>
            </TouchableOpacity>
        )
    }
}

export default CompetencyMeter;