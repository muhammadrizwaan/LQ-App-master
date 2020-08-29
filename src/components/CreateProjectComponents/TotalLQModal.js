import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Icon, Button, View, Text } from 'native-base'
import Dialog, {
    DialogContent,
} from 'react-native-popup-dialog';

import RNSpeedometer from 'react-native-speedometer'


import LinearGradient from 'react-native-linear-gradient';
import DismissKeyboardComponent from '../GeneralComponents/DismissKeyboardComponent';



export default ({
    DialogStyles,
    styles,
    onClose,
    isVisible,
    handleOnSave,
    myLQScore
}) => (
        <Dialog
            dialogStyle={DialogStyles.dialogContainer}
            onDismiss={() => onClose()}
            width={0.9}
            square
            actionsBordered
            visible={isVisible}
            onTouchOutside={() => onClose()}
            onHardwareBackPress={() => onClose()}
            containerStyle={{
                shadowColor: '#0078C7',
                shadowOffset: { width: 5, height: 5 },
                shadowOpacity: 1,
                shadowRadius: 3,
                elevation: 5,
            }}
        >

            <DialogContent style={styles.dialogueContent}>
                <Icon
                    name="md-close"
                    style={{ color: 'white', position: 'absolute', top: 0, right: 0, margin: 5, opacity: 0.7 }}
                    onPress={() => onClose()}
                />
                <DismissKeyboardComponent>
                    <View>
                        <Text style={styles.projectName}>MY TOTAL LQ</Text>
                        {/* <Text style={styles.projectNameDesc}>This is the Master Project that will drive your total LQ Points.</Text> */}


                        <TouchableOpacity
                            style={{ marginLeft: 10, marginRight: 10, marginTop: 30, marginBottom: 10 }}
                        >
                            <Image
                                style={{ width: 183.2, height: 100 }}
                                source={require('../../images/logo_bg.png')}
                            />
                            <View style={{ position: 'absolute', top: 10, left: 5 }}>
                                <RNSpeedometer
                                    value={myLQScore}
                                    minValue={0}
                                    maxValue={200}
                                    size={170}
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
                                        backgroundColor: 'transparent'
                                    }}
                                    halfCircleStyle={{
                                        display: 'none',
                                        backgroundColor: 'transparent'
                                    }}
                                />
                            </View>
                            <Text style={{ color: '#E6C44E', fontWeight: 'bold', textAlign: 'center' }}>
                                {`Total LQ: ${myLQScore.toFixed(1)}`}
                            </Text>
                            <View style={{ position: 'absolute', top: 60, alignSelf: 'center' }}>
                                <Text style={{ color: '#FFFFFF', textAlign: 'center', fontSize: 12 }}>
                                    {/* {competency.name} */}
                                </Text>
                            </View>
                            <Text style={{ opacity: 0 }}></Text>
                        </TouchableOpacity>

                        <View></View>
                        {/* <LinearGradient
                            colors={['#0078C7', '#003C64']}
                            style={{
                                marginBottom: 20,
                                marginTop: 30,
                                backgroundColor: "#0078C7",
                                // width: '100%',
                                textAlign: "center",
                                justifyContent: "center",
                                borderRadius: 7
                            }}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        >
                            <Button
                                transparent
                                full
                                // style={styles.buttonSave}
                                onPress={() => {
                                    handleOnSave()
                                }}
                            >
                                <Text style={{ color: "#ffffff", fontSize: 14 }}>START</Text>
                            </Button>
                        </LinearGradient> */}

                    </View>
                </DismissKeyboardComponent>
            </DialogContent>
        </Dialog>
    )