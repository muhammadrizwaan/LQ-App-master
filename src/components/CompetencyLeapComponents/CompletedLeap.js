import React from 'react'
import { StyleSheet, Image, Platform, Keyboard } from 'react-native'
import { Content, View, Text, Button, Container, Item, Textarea } from 'native-base'



import moment from 'moment'



import axios from 'axios'

import { updateUserLQ, updateCompetencyLQ } from '../../actions/projectActions'
import DismissKeyboardComponent from '../GeneralComponents/DismissKeyboardComponent'



class CompletedLeap extends React.Component {

    render() {
        const { leapDetails } = this.props
        return (

            <Container style={styles.container}>
                <Content
                    contentContainerStyle={{
                        // marginTop: this.state.viewMargin,
                        backgroundColor: 'white',
                        zIndex: -10000,
                        paddingLeft: 20,
                        paddingRight: 20,
                    }}
                    keyboardShouldPersistTaps={'always'}
                >
                    <DismissKeyboardComponent>
                        <View>
                            {/* <Content
                    style={{
                        backgroundColor: 'white',
                        zIndex: -10000,
                        paddingLeft: 20,
                        paddingRight: 20,
                    }}
                > */}
                            <View style={styles.twoColView}>
                                <View style={styles.colView}>
                                    <Text style={styles.labelHeading}>Status</Text>
                                    <Text style={styles.valHeading}>{leapDetails.status}</Text>
                                </View>
                                <View style={styles.colView}>
                                    <Text style={styles.labelHeading}>Progression Points</Text>
                                    <Text style={styles.valHeading}>{leapDetails.point_value}</Text>
                                </View>
                            </View>

                            <View style={{ padding: 20 }}>
                                <Text style={styles.plannedText}>Planned Activites</Text>
                                <Text style={styles.valHeading}>
                                    {leapDetails.planned_activities}
                                </Text>
                            </View>

                            <Text style={styles.plannedHeading}>
                                PLANNED
                    </Text>
                            <View style={{ ...styles.twoColView, marginTop: 0 }}>
                                <View style={{ ...styles.colView, paddingTop: 0 }}>
                                    <Text style={styles.labelHeading}>Start Date</Text>
                                    <Text style={styles.valHeading}>
                                        {moment(leapDetails.plan_start_date).format('MM/DD/YYYY')}
                                    </Text>
                                </View>
                                <View style={{ ...styles.colView, paddingTop: 0 }}>
                                    <Text style={styles.labelHeading}>End Date</Text>
                                    <Text style={styles.valHeading}>
                                        {moment(leapDetails.plan_end_date).format('MM/DD/YYYY')}
                                    </Text>
                                </View>
                            </View>

                            <Text style={{ ...styles.plannedHeading, color: '#00B051' }}>
                                ACTUAL
                    </Text>
                            <View style={{ ...styles.twoColView, marginTop: 0 }}>
                                <View style={{ ...styles.colView, paddingTop: 0 }}>
                                    <Text style={styles.labelHeading}>Start Date</Text>
                                    <Text style={styles.valHeading}>
                                        {moment(leapDetails.actual_start_date).format('MM/DD/YYYY')}
                                    </Text>
                                </View>
                                <View style={{ ...styles.colView, paddingTop: 0 }}>
                                    <Text style={styles.labelHeading}>End Date</Text>
                                    <Text style={styles.valHeading}>
                                        {moment(leapDetails.actual_end_date).format('MM/DD/YYYY')}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ padding: 20 }}>
                                <Text style={styles.plannedText}>Actual Accomplishments</Text>
                                <Text style={styles.valHeading}>
                                    {leapDetails.actual_accomplishments}
                                </Text>
                            </View>

                            {/* {leapDetails.actual_accomplishments.length > 0 && <View style={{ padding: 20, paddingBottom: 180 }}>
                        <Text style={styles.plannedText}>Actual Accomplishments</Text>
                        <Text style={styles.valHeading}>
                            {leapDetails.actual_accomplishments}
                        </Text>
                    </View>} */}
                            {/* </Content> */}
                        </View>
                    </DismissKeyboardComponent>
                </Content>

                

            </Container>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        overflow: 'hidden'
        // marginTop: 30,
        // marginLeft: 20,
        // marginRight: 20
    },
    startDateIcon: {
        width: 15.85,
        height: 15.85
    },
    twoColView: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: 30
    },
    colView: {
        width: '50%',
        padding: 20,
        paddingBottom: 10
    },
    labelHeading: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
        opacity: 0.8
    },
    valHeading: {
        fontSize: 14,
        color: 'black',
        opacity: 0.8,
        marginTop: 5
    },
    plannedText: {
        fontSize: 14,
        opacity: 0.8,
        // padding: 20,
        fontWeight: 'bold'
    },
    plannedHeading: {
        fontSize: 14,
        color: '#0078C7',
        fontWeight: 'bold',
        opacity: 0.8,
        padding: 20,
        paddingBottom: 10,
        paddingTop: 10
    },
    transparentInputContainer: {
        marginLeft: 0,
        backgroundColor: '#E5E5E5',
        borderRadius: 5,
        borderBottomWidth: 0,
        paddingRight: 15,
        paddingLeft: 15,
        marginTop: 20,
        fontFamily: "Montserrat-Regular",
        justifyContent: 'flex-start'
    },
    inputFieldStyle: {
        fontSize: 14,
        color: 'black',
        fontFamily: "Montserrat-Regular",
    },
    errorTextStyle: {
        fontSize: 12,
        color: 'red',
        opacity: 0.9,
        fontFamily: "Montserrat-Regular",
    },
})


export default CompletedLeap;














// import React from 'react'
// import { StyleSheet, TouchableOpacity, Image } from 'react-native'
// import { Content, View, Text } from 'native-base'


// import RNSpeedometer from 'react-native-speedometer'

// class CompletedLeap extends React.Component {
//     render() {
//         const { leapDetails } = this.props
//         return (
//             <Content>
//                 <View style={styles.container}>
//                     <Text style={styles.congHeading}>
//                         CONGRATULATIONS!
//                     </Text>
//                     <Text style={styles.earnedHeading}>
//                         {`You have earned ${leapDetails.lq_value} LQ Points.`}
//                     </Text>



//                     <TouchableOpacity
//                         style={{ marginLeft: 10, marginRight: 10, marginTop: 60, marginBottom: 10 }}
//                     >
//                         <Image
//                             style={{ width: 183.2, height: 100 }}
//                             source={require('../../images/logo_bg.png')}
//                         />
//                         <View style={{ position: 'absolute', top: 10, left: 5 }}>
//                             <RNSpeedometer
//                                 value={this.props.competencyLQPoints}
//                                 minValue={0}
//                                 maxValue={200}
//                                 size={170}
//                                 labelNoteStyle={{
//                                     display: 'none'
//                                 }}
//                                 labelStyle={{
//                                     display: 'none'
//                                 }}
//                                 innerCircleStyle={{
//                                     display: 'none',
//                                     backgroundColor: 'transparent'
//                                 }}
//                                 outerCircleStyle={{
//                                     backgroundColor: 'transparent'
//                                 }}
//                                 halfCircleStyle={{
//                                     display: 'none',
//                                     backgroundColor: 'transparent'
//                                 }}
//                             />
//                         </View>
//                         <View style={{ position: 'absolute', top: 60, alignSelf: 'center' }}>
//                             <Text style={{ color: '#FFFFFF', textAlign: 'center', fontSize: 12 }}>
//                                 {/* {competency.name} */}
//                             </Text>
//                         </View>
//                         <Text style={{ opacity: 0 }}></Text>
//                     </TouchableOpacity>
//                 </View>
//             </Content>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         marginTop: 60,
//         flex: 1,
//         alignContent: 'center',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     congHeading: {
//         fontSize: 18,
//         color: 'white'
//     },
//     earnedHeading: {
//         fontSize: 14,
//         color: 'white',
//         marginTop: 10
//     }
// })

// export default CompletedLeap