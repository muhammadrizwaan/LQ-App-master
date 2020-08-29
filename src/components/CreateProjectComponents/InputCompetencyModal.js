import React from 'react'
import { TextInput } from 'react-native'
import { Button, Icon, Container, Content, Spinner, View, Text } from 'native-base'
import Dialog, {
    DialogContent,
} from 'react-native-popup-dialog';
import LinearGradient from 'react-native-linear-gradient'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

import DismissKeyboardComponent from '../GeneralComponents/DismissKeyboardComponent'

export default ({
    dialogContainerStyle,
    dialogContentStyle,
    skipButtonStyle,
    isVisible,
    onClose,
    styles,
    value,
    error,
    onChange,
    keyName,
    handleOnSave
}) => (
        <Dialog
            dialogStyle={dialogContainerStyle}
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

            <DialogContent style={dialogContentStyle}>
                <Icon
                    name="md-close"
                    style={{ color: 'white', position: 'absolute', top: 0, right: 0, margin: 5, opacity: 0.7 }}
                    onPress={() => onClose()}
                />
                <KeyboardAwareScrollView
                    style={{ backgroundColor: 'transparent' }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={false}
                    keyboardShouldPersistTaps={'always'}
                >
                    <DismissKeyboardComponent>
                        <View>
                            <Text style={{
                                ...styles.projectNameDesc,
                                marginTop: 50,
                                textTransform: 'uppercase'
                            }}>TYPE YOUR COMPETENCY NAME</Text>
                            <View style={styles.search1}>
                                <TextInput
                                    placeholder="Type Here...."
                                    placeholderTextColor="#ffffff"
                                    style={{
                                        ...styles.searchInput1,
                                        borderColor: error ? 'red' : 'transparent',
                                        borderWidth: error ? 1 : 0
                                    }}
                                    value={value}
                                    onChangeText={(val) => onChange(keyName, val)}
                                />
                            </View>

                            <LinearGradient
                                colors={['#0078C7', '#003C64']}
                                style={{
                                    marginBottom: 20,
                                    marginTop: 30,
                                    backgroundColor: "#0078C7",
                                    width: '100%',
                                    textAlign: "center",
                                    justifyContent: "center",
                                    borderRadius: 7
                                }}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            >
                                <Button
                                    transparent
                                    full
                                    onPress={() => {
                                        handleOnSave()
                                    }}
                                >
                                    <Text style={{ color: "#ffffff", fontSize: 14 }}>DONE</Text>
                                </Button>
                            </LinearGradient>
                        </View>
                    </DismissKeyboardComponent>
                </KeyboardAwareScrollView>
            </DialogContent>
        </Dialog>
    )
