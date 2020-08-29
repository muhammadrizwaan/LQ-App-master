import React from 'react'
import { Image, ImageBackground, StyleSheet, SafeAreaView } from 'react-native'
import {
    Container, Content,
    Text, View, Button
} from 'native-base'

import ProjectStyles from '../../styles/ProjectDetails'
import LeapSheetHeader from '../../components/ProjectDetailComponents/LeapSheetHeader'


class LeapSheatsPlanInfo extends React.Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <Container style={ProjectStyles.container}>
                <ImageBackground source={require('../../images/background.png')} style={ProjectStyles.rbackgroundImage}>
                    <SafeAreaView />
                    <Content>
                        <LeapSheetHeader 
                            navigation={this.props.navigation} 
                            title={"The Leap Sheets"}
                            subTitle={"(Leadership Elevation Action Plans)"}
                        />
                        <Text style={styles.headingText}>Somethings to Know</Text>

                        <View style={styles.checkMarkContainer}>
                            <Image source={require('../../images/check_mark_icon.png')} />
                            <Text style={styles.checkMarkText}>
                                The check-mark automatically sets Actual Work Start and Finish equal to the Plan Start and Finish.
                            </Text>
                        </View>

                        <Text style={styles.subHeadingText}>The Quick Look Scale</Text>

                        <View style={styles.checkMarkContainer}>
                            <Image source={require('../../images/red_box.png')} />
                            <Text style={styles.numBulletStyle}>1:</Text> 
                            <Text style={styles.descText}>
                                No-to-very low competence – no experience in the skill area
                            </Text>
                        </View>


                        <View style={{ ...styles.checkMarkContainer, marginTop: 2 }}>
                            <Image source={require('../../images/grey_box.png')} />
                            <Text style={styles.numBulletStyle}>2:</Text> 
                            <Text style={styles.descText}>
                                Low-to-average of competence – little experience in the skill area
                            </Text>
                        </View>

                        <View style={{ ...styles.checkMarkContainer, marginTop: 2 }}>
                            <Image source={require('../../images/yellow_box.png')} />
                            <Text style={styles.numBulletStyle}>3:</Text> 
                            <Text style={styles.descText}>
                                Average-to-moderate level of competence – some experience
                            </Text>
                        </View>

                        <View style={{ ...styles.checkMarkContainer, marginTop: 2 }}>
                            <Image source={require('../../images/green_box.png')} />
                            <Text style={styles.numBulletStyle}>4:</Text> 
                            <Text style={styles.descText}>
                                Moderately high competence - good experience
                            </Text>
                        </View>

                        <View style={{ ...styles.checkMarkContainer, marginTop: 2 }}>
                            <Image source={require('../../images/blue_box.png')} />
                            <Text style={styles.numBulletStyle}>5:</Text> 
                            <Text style={styles.descText}>
                                High level of competence - extensive experience
                            </Text>
                        </View>

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
        opacity: 0.8
    },
    descText: {
        fontSize: 14,
        color: 'white',
        marginLeft: 5,
        marginRight: 20,
        opacity: 0.7
    },
    numBulletStyle: {
        color: 'white', opacity: 1, marginLeft: 10, fontSize: 14
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

export default LeapSheatsPlanInfo