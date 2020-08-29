import React from 'react'
import { Modal, Image, Platform, Dimensions, TouchableOpacity } from 'react-native'
import { View, Text, Icon } from 'native-base'

import DialogStyles from '../../styles/DialogStyles'
import renderTimelineLine from './renderTimelineLine'

export default ({
    tickEclipseIcons,
    levelStarted,
    leapPointerVisible,
    onClose
}) => {
    const Height = Dimensions.get('window').height;
    const leap_height = Height * 12 / 100;
    const leap_height_android = Height * 8 / 100;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={leapPointerVisible}
            // style={{backgroundColor: "rgba(0, 0, 0, 1)"}}
            // onClose={() => onClose()}
            // onRequestClose={() => onClose()}
        >
            <TouchableOpacity onPress={() => onClose()} style={{flex: 1, backgroundColor: "rgba(0, 0, 0, 0.7)"}}>

                <View
                    style={{
                        ...tickEclipseIcons,
                        top: Platform.OS === "ios" ? leap_height : leap_height_android
                    }}
                >
                    <ActiveIndicator
                        isSelected={levelStarted === 0}
                        left={40}
                        message={`You are here at Novice (Red)`}
                    />
                    {renderTimelineLine(false, true)}
                    <ActiveIndicator
                        isSelected={levelStarted === 1}
                        left={20}
                        message={`You are here at Competent (Grey)`}
                    />
                    {renderTimelineLine(false, true)}
                    <ActiveIndicator
                        isSelected={levelStarted === 2}
                        left={10}
                        message={`You are here at Proficient (Yellow)`}
                    />
                    {renderTimelineLine(false, true)}
                    <ActiveIndicator
                        isSelected={levelStarted === 3}
                        left={-4}
                        message={`You are here at Expert (Green)`}
                    />
                    {renderTimelineLine(false, true)}
                    <ActiveIndicator
                        isSelected={levelStarted === 4}
                        left={-22}
                        message={`You are here at Master (Blue)`}
                    />
                </View>


                <View style={{
                    ...tickEclipseIcons,
                    ...DialogStyles.dialogueContent,
                    marginTop: Platform.OS === "ios" ? 100 : 60,
                    height: 50,
                    width: '80%',
                    alignSelf: 'center'
                }}>
                    {levelStarted === 0 && <Text style={{ ...DialogStyles.subHeading, textTransform: 'none', marginTop: 0, fontSize: 13 }}>{`You are here at Novice (Red)`}</Text>}
                    {levelStarted === 1 && <Text style={{ ...DialogStyles.subHeading, textTransform: 'none', marginTop: 0, fontSize: 13 }}>{`You are here at Competent (Grey)`}</Text>}
                    {levelStarted === 2 && <Text style={{ ...DialogStyles.subHeading, textTransform: 'none', marginTop: 0, fontSize: 13 }}>{`You are here at Proficient (Yellow)`}</Text>}
                    {levelStarted === 3 && <Text style={{ ...DialogStyles.subHeading, textTransform: 'none', marginTop: 0, fontSize: 13 }}>{`You are here at Expert (Green)`}</Text>}
                    {levelStarted === 4 && <Text style={{ ...DialogStyles.subHeading, textTransform: 'none', marginTop: 0 , fontSize: 13}}>{`You are here at Master (Blue)`}</Text>}
                </View>
            </TouchableOpacity>
        </Modal>
    )
}


const ActiveIndicator = ({ isSelected, left, message }) => (
    <View
        style={{
            position: 'relative',
            alignSelf: 'flex-start',
            textAlign: 'left',
            left: 10,
            opacity: isSelected ? 1 : 0
        }}
    >
        {/* <Icon
            name="ios-send"
            style={{
                color: 'brown',
                // fontSize: 40,
                transform: [{ rotate: '-80deg' }],
                // marginLeft: 10,
                // zIndex: 50000
            }}
        /> */}
        <Image
            source={require('../../images/selection_arrow.png')}
            style={{
                width: 40,
                height: 40,
                left: left
            }}
        />
    </View>
)
