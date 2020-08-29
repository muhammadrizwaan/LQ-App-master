import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { View, Text, Button, Icon } from 'native-base'
import Dialog, {
    DialogTitle,
    DialogContent,
} from 'react-native-popup-dialog';

import styles from '../../styles/DialogStyles'
import AuthStyles from '../../styles/AuthStyles'
import DialogStyles from '../../styles/DialogStyles'

import LinearGradient from 'react-native-linear-gradient'

class TheKiplingOptimizerDialog extends React.Component {
    state = {
        selectedLevelIndex: 0
    }
    render() {
        const { isSelectDialogVisible, onDialogClose, projectId, competencyId } = this.props
        return (
            <Dialog
                // onDismiss={() => onDialogClose(false, "from dismiss")}
                width={0.9}
                visible={isSelectDialogVisible}
                onTouchOutside={() => onDialogClose(false, "from touch outside")}
                onHardwareBackPress={() => onDialogClose(false, "from hardware backpress")}
                containerStyle={{
                    shadowColor: '#0078C7',
                    shadowOffset: { width: 5, height: 5 },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                    elevation: 5,
                }}
                dialogStyle={DialogStyles.dialogContainer}
            >
                <DialogContent style={styles.dialogueContent}>
                    {/* Close Icon */}
                    <Icon
                        name="md-close"
                        style={{ color: 'white', position: 'absolute', top: 0, right: 0, margin: 5 }}
                        onPress={() => {
                            onDialogClose(false, "from icon close")
                            // this.props.navigation.goBack()
                        }}
                    />

                    <View style={styles.textContainer}>
                        <Image
                            source={require('../../images/survey_popup_icon.png')}
                            style={{ width: 70, height: 70, marginTop: 30, }}
                        />
                        <Text style={styles.titleStyle}>TKO:</Text>
                        <Text style={styles.descStyle}>
                            (THE KIPLING OPTIMIZER)
                        </Text>
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.descStyle}>
                            Optionally, use the TKO to help define the Purpose of your Project. Answer six questions that help clarify the Purpose and provide focus and direction.
                        </Text>
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
                            full
                            transparent
                            onPress={() => {
                                this.props.navigation.navigate('TKOScreen')
                                onDialogClose(true, "from Navigation")
                            }}
                        >
                            <Text
                                style={{ textTransform: 'uppercase', color: 'white', fontSize: 14 }}
                            >
                                Let's Begin
                            </Text>
                        </Button>
                    </LinearGradient>


                    <TouchableOpacity
                        transparent
                        style={DialogStyles.skipButton}
                        onPress={() => {
                            onDialogClose(false)
                        }}
                    >
                        <Text
                            style={{ color: "#ffffff", fontSize: 15, fontWeight: "bold" }}
                        >
                            SKIP
                                                </Text>
                        <Icon
                            name="ios-arrow-forward"
                            style={{ color: "#ffffff", fontSize: 16, fontWeight: "bold", marginLeft: 3 }}
                        />
                        <Icon
                            name="ios-arrow-forward"
                            style={{ color: "#ffffff", fontSize: 16, fontWeight: "bold" }}
                        />
                    </TouchableOpacity>

                    {/* <Button
                        transparent
                        style={{
                            backgroundColor: "transparent",
                            width: "100%",
                            textAlign: "center",
                            justifyContent: "center",
                        }}
                        onPress={() => {
                            onDialogClose(false)
                        }}
                    >
                        <Text style={{ color: "#ffffff", fontSize: 15, fontWeight: "bold" }}>Skip >></Text>
                    </Button> */}
                </DialogContent>
            </Dialog>
        )
    }
}


export default TheKiplingOptimizerDialog