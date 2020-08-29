import React from 'react'
import { Image } from 'react-native'
import { View, Text, Button, Icon } from 'native-base'
import Dialog, {
    DialogTitle,
    DialogContent,
} from 'react-native-popup-dialog';

import styles from '../../styles/DialogStyles'
import AuthStyles from '../../styles/AuthStyles'

import { connect } from 'react-redux'
import axios from 'axios'

import { setProgressionLevel } from '../../actions/projectActions'
import OverlaySpinner from 'react-native-loading-spinner-overlay';

import LinearGradient from 'react-native-linear-gradient'


class SelectLQProgressionDialog extends React.Component {
    state = {
        selectedLevelIndex: 0,
        loading: false
    }
    onSelectedLevelChange = (index) => {
        this.setState({
            selectedLevelIndex: index
        })
    }
    startSetProgressionLevel = () => {
        this.setState({ loading: true })
        console.warn(this.props.competencyId);
        console.warn(this.props.projectId)
        
        axios
            .post(
                'http://localhost:5000/the-lq-app-development-project/us-central1/set_progression_level',
                {
                    projectId: this.props.projectId,
                    competencyId: this.props.competencyId,
                    level: this.state.selectedLevelIndex,
                    myId: this.props.myId
                }
            )
            .then(res => {
                this.setState({ loading: false })
                if (res.data.error) {
                    return alert(res.data.message)
                }

                this.props.onDialogClose()
                this.props.openTKODialog()

                this.props.setProgressionLevel(
                    res.data.project
                )
            })
            .catch(err => {
                this.setState({ loading: false })
                alert(err.response.data)
            })

    }
    render() {
        const { 
            isSelectDialogVisible, competencyName,
            onDialogClose, projectId, competencyId 
        } = this.props
        return (
            <Dialog onDismiss={() => onDialogClose()} width={0.9} visible={isSelectDialogVisible} square actionsBordered>
                <DialogContent style={styles.dialogueContent}>
                    <OverlaySpinner
                        visible={this.state.loading}
                        textStyle={{ color: 'white' }}
                    />
                    {/* Close Icon */}
                    <Icon
                        name="md-close"
                        style={{ color: 'white', position: 'absolute', top: 0, right: 0, margin: 5, opacity: 0.7 }}
                        onPress={() => {
                            onDialogClose()
                            this.props.navigation.goBack()
                        }}
                    />

                    <View style={{...styles.textContainer, marginTop: 30}}>
                        <Text style={styles.titleStyle}>My Current LQ Progression Level is:</Text>
                        <Text style={styles.descStyle}>
                            {`Please select your Competency Level for The ${competencyName} Competency.`}
                        </Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
                        <Button
                            transparent
                            style={this.state.selectedLevelIndex === 0 ? styles.activeButton : styles.inactiveButton}
                            onPress={() => this.onSelectedLevelChange(0)}
                        >
                            <Image source={require('../../images/red_box.png')} style={{ borderRadius: 2 }} />
                            <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                                <Text style={styles.levelText}>
                                    level 1
                                </Text>
                                <Text style={styles.levelTextName}>NOVICE</Text>
                            </View>
                        </Button>

                        <Button
                            transparent
                            style={this.state.selectedLevelIndex === 1 ? styles.activeButton : styles.inactiveButton}
                            onPress={() => this.onSelectedLevelChange(1)}
                        >
                            <Image source={require('../../images/grey_box.png')} style={{ borderRadius: 2 }} />
                            <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                                <Text style={styles.levelText}>
                                    level 2
                                </Text>
                                <Text style={styles.levelTextName}>COMPETENT</Text>
                            </View>
                        </Button>
                    </View>


                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
                        <Button
                            transparent
                            style={this.state.selectedLevelIndex === 2 ? styles.activeButton : styles.inactiveButton}
                            onPress={() => this.onSelectedLevelChange(2)}
                        >
                            <Image source={require('../../images/yellow_box.png')} style={{ borderRadius: 2 }} />
                            <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                                <Text style={styles.levelText}>
                                    level 3
                                </Text>
                                <Text style={styles.levelTextName}>PROFICIENT</Text>
                            </View>
                        </Button>

                        <Button
                            transparent
                            style={this.state.selectedLevelIndex === 3 ? styles.activeButton : styles.inactiveButton}
                            onPress={() => this.onSelectedLevelChange(3)}
                        >
                            <Image source={require('../../images/green_box.png')} style={{ borderRadius: 2 }} />
                            <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                                <Text style={styles.levelText}>
                                    level 4
                                </Text>
                                <Text style={styles.levelTextName}>EXPERT</Text>
                            </View>
                        </Button>
                    </View>

                    <View style={{ alignContent: 'center', alignItems: 'center' }}>
                        <Button
                            transparent
                            style={this.state.selectedLevelIndex === 4 ?
                                styles.activeButton
                                :
                                styles.inactiveButton
                            }
                            onPress={() => this.onSelectedLevelChange(4)}
                        >
                            <Image source={require('../../images/blue_box.png')} style={{ borderRadius: 2 }} />
                            <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                                <Text style={styles.levelText}>
                                    level 5
                                </Text>
                                <Text style={styles.levelTextName}>MASTER</Text>
                            </View>
                        </Button>
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
                            style={{
                                // alignContent: "center",
                                // justifyContent: "center",
                                // backgroundColor: '#0078C7',
                                // borderRadius: 5,
                                // margin: 20
                            }}
                            onPress={this.startSetProgressionLevel}
                        >
                            <Text
                                style={{ textTransform: 'uppercase', color: 'white', fontSize: 14 }}
                            >
                                Let's Begin
                            </Text>
                        </Button>
                    </LinearGradient>
                </DialogContent>
            </Dialog>
                )
            }
        }
        
const mapDispatchToProps = dispatch => ({
                    setProgressionLevel: (project) => dispatch(setProgressionLevel(project))
            })
            
export default connect(null, mapDispatchToProps)(SelectLQProgressionDialog)