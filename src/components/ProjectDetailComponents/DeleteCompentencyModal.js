import React from 'react';
import { Icon, Button, View, Text } from 'native-base'
import Dialog, {
    DialogContent,
} from 'react-native-popup-dialog';

import LinearGradient from 'react-native-linear-gradient';
import DismissKeyboardComponent from '../GeneralComponents/DismissKeyboardComponent';

import DialogStyles from '../../styles/DialogStyles'
import styles from '../../styles/AuthStyles'

export default ({
    onClose,
    isVisible,
    handleOnDelete
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
                        <Text style={styles.projectName}>ARE YOU SURE?</Text>
                        <Text style={{ ...styles.projectNameDesc, fontSize: 13 }}>
                            Deleting progress on a Competency sets the Progression Points and associated LQ Points to “0”. There is no Undo function.
                        </Text>

                        <View></View>


                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%'
                            }}
                        >
                            <Button
                                full
                                transparent
                                style={{ 
                                    width: '48%',
                                    marginBottom: 20,
                                    marginTop: 30,
                                    borderColor: '#0078C7',
                                    borderWidth: 1,
                                    borderRadius: 7
                                }}
                                onPress={onClose}
                            >
                                <Text
                                    style={{
                                        color: "#ffffff", fontSize: 14 
                                    }}
                                >
                                    NO
                                </Text>
                            </Button>
                            <LinearGradient
                                colors={['#0078C7', '#003C64']}
                                style={{
                                    marginBottom: 20,
                                    marginTop: 30,
                                    backgroundColor: "#0078C7",
                                    textAlign: "center",
                                    justifyContent: "center",
                                    borderRadius: 7,
                                    width: '48%',
                                    marginLeft: 10
                                }}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            >
                                <Button
                                    transparent
                                    full
                                    onPress={() => {
                                        handleOnDelete()
                                    }}
                                >
                                    <Text style={{ color: "#ffffff", fontSize: 14 }}>YES</Text>
                                </Button>
                            </LinearGradient>
                        </View>

                    </View>
                </DismissKeyboardComponent>
            </DialogContent>
        </Dialog>
    )