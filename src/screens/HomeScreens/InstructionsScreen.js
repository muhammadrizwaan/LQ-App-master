import React from 'react'
import { 
    Image, ImageBackground, 
    StyleSheet, SafeAreaView, 
    StatusBar, TouchableOpacity
} from 'react-native'
import {
    Container, Content,
    Text, View, Button
} from 'native-base'

import ProjectStyles from '../../styles/ProjectDetails'
import LeapSheetHeader from '../../components/ProjectDetailComponents/LeapSheetHeader'

class InstructionsScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <Container style={ProjectStyles.container}>
                <ImageBackground source={require('../../images/background.png')} style={ProjectStyles.rbackgroundImage}>
                    <StatusBar barStyle="light-content" />
                    <SafeAreaView />
                    <Content>
                        <LeapSheetHeader
                            navigation={this.props.navigation}
                            title={"INSTRUCTIONS"}
                            subTitle={"Pre-Project - Getting Started Overview"}
                        />


                        <View style={styles.checkMarkContainer}>
                            <Text style={{ ...styles.numBulletStyle, marginLeft: 0 }}>
                                1.
                            </Text>
                            <Text style={styles.textStyle}>
                                Consider your existing knowledge
                                <Text
                                    style={styles.descText}
                                >{" of Leadership (specifically, Leadership Competencies that are essential to your career and life goals)"}</Text>
                            </Text>
                        </View>


                        <View style={{ ...styles.checkMarkContainer, marginTop: 2 }}>
                            <Text style={{ ...styles.numBulletStyle, marginLeft: 0 }}>
                                2.
                            </Text>
                            <Text style={{ marginLeft: 5, marginRight: 20, }}>
                                <Text style={styles.descText}>
                                    Take the 20 question Survey and then
                                </Text>
                                <Text
                                    style={styles.textStyle}
                                >{" analyze “where you are now”"}</Text>
                                <Text style={styles.descText}>{" in your Leadership Development (strengths and weaknesses)"}</Text>
                            </Text>
                        </View>

                        <View style={{ ...styles.checkMarkContainer, marginTop: 2 }}>
                            <Text style={{ ...styles.numBulletStyle, marginLeft: 0 }}>
                                3.
                            </Text>
                            <Text style={{ marginLeft: 5, marginRight: 20, }}>
                                <Text style={styles.descText}>
                                    Determine your immediate Purpose as it relates to your Leadership goal(s).
                                </Text>
                                <Text
                                    style={styles.textStyle}
                                >{"  Consider using the TKO template"}</Text>
                                <Text style={styles.descText}>{" provided to help provide vision and clarity."}</Text>
                            </Text>
                        </View>

                        <View style={{ ...styles.checkMarkContainer, marginTop: 2, width: '80%' }}>
                            <Image source={require('../../images/yellow_box.png')} style={{ opacity: 0 }} />
                            <Text style={styles.numBulletStyle}>{`\u2022 `}</Text>
                            <Text style={{ marginLeft: 5, marginRight: 20, }}>
                                <Text style={styles.descText}>
                                    The TKO – The Kipling Optimizer
                                </Text>
                                <Text
                                    style={{
                                        ...styles.textStyle,
                                        opacity: 1
                                    }}
                                >{"  helps you “align Performance”"}</Text>
                                <Text style={styles.descText}>{" (what you are concentrating on) to Purpose (your immediate goal)."}</Text>
                            </Text>
                        </View>

                        <View style={{ ...styles.checkMarkContainer, marginTop: 2, width: '80%' }}>
                            <Image source={require('../../images/yellow_box.png')} style={{ opacity: 0 }} />
                            <Text style={styles.numBulletStyle}>{`\u2022 `}</Text>
                            <Text style={{ marginLeft: 5, marginRight: 20, }}>
                                <Text style={styles.descText}>
                                    Use the LFI – Leadership Focus Indicator– to
                                </Text>
                                <Text
                                    style={styles.textStyle}
                                >{"  help you select the Competencies”"}</Text>
                                <Text style={styles.descText}>{" you want/need to focus on immediately and provide insights into the specific Actions you may wish to take. (Optional)"}</Text>
                            </Text>
                        </View>


                        <View style={styles.checkMarkContainer}>
                            <Text style={{ ...styles.numBulletStyle, marginLeft: 0 }}>
                                4.
                            </Text>
                            <Text style={styles.textStyle}>
                                Start your first LEAP
                                <Text
                                    style={styles.descText}
                                >{" (Leadership Elevation Action Planning) Sheet."}</Text>
                            </Text>
                        </View>

                        <TouchableOpacity
                            transparent
                            style={{
                                margin: 20,
                            }}
                            onPress={() => this.props.navigation.navigate("LeapSheetsPlanInfo")} 
                        >
                            <Text
                                style={{
                                    fontSize: 13,
                                    color: '#00B0F0',
                                    fontFamily: 'Montserrat',
                                    textDecorationLine: 'underline',
                                }}
                            >
                                There are separate instructions for this.
                            </Text>
                        </TouchableOpacity>

                    </Content>
                </ImageBackground>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    headingText: {
        fontSize: 16,
        color: 'white',
        textTransform: 'uppercase',
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,
        // marginBottom: 5,
        fontWeight: 'bold'
    },
    subHeadingText: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: 'white',
        marginLeft: 20,
        marginRight: 20,
    },
    checkMarkContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: 20,
        // alignItems: 'center',
        // alignContent: 'center'
    },
    checkMarkText: {
        fontSize: 14,
        color: 'white',
        // marginLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        opacity: 0.8,
        fontFamily: "Montserrat"
    },
    descText: {
        fontSize: 14,
        color: 'white',
        marginLeft: 5,
        marginRight: 20,
        opacity: 0.7,
        fontFamily: "Montserrat"
    },
    textStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5,
        marginRight: 20,
        opacity: 1,
        color: 'white'
    },
    numBulletStyle: {
        color: 'white',
        opacity: 1,
        marginLeft: 10,
        fontSize: 14
    },
    beginButtonStyle: {
        // width: '100%',
        // alignSelf: "center", 
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: '#0078C7',
        borderRadius: 5,
        margin: 20
    }
})

export default InstructionsScreen