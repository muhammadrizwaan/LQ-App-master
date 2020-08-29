import React from 'react'
import { StyleSheet, Image, Platform, Keyboard } from 'react-native'
import { Content, View, Text, Button, Container, Item, Textarea } from 'native-base'

import LinearGradient from 'react-native-linear-gradient'

import moment from 'moment'

import Animated, { Easing } from 'react-native-reanimated'

import { connect } from 'react-redux'
import { endLeapInProject } from '../../actions/projectActions'
import OverlaySpinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

import axios from 'axios'

import { updateUserLQ, updateCompetencyLQ } from '../../actions/projectActions'
import DismissKeyboardComponent from '../GeneralComponents/DismissKeyboardComponent'



class StartedLeap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            actual_accomplishments: props.leapDetails ? props.leapDetails.actual_accomplishments : "",
            errors: {},
            viewMargin: new Animated.Value(25),
            showButton: true
        }
    }
    componentDidMount() {
        this.keyboardWillShow = Keyboard.addListener('keyboardDidShow', this.handleKeyboardOpen)
        this.keyboardWillHide = Keyboard.addListener('keyboardDidHide', this.handleKeyboardClose)
    }
    componentWillUnmount() {
        this.keyboardWillShow.remove()
        this.keyboardWillHide.remove()
    }

    handleKeyboardOpen = () => {
        if (Platform.OS === 'ios') {
            Animated.timing(
                this.state.viewMargin,
                {
                    // toValue: -80,
                    toValue: -150,
                    duration: 100,
                    easing: Easing.linear
                }
            ).start()
        }
        this.setState({
            // showButton: false
            showButton: true
        })
    }

    handleKeyboardClose = () => {
        if (Platform.OS === 'ios') {
            Animated.timing(
                this.state.viewMargin,
                {
                    toValue: 0,
                    duration: 100,
                    easing: Easing.linear
                }
            ).start()
        }
        this.setState({
            showButton: true
        })
    }
    onChangeText = (name, val) => {
        this.setState({
            [name]: val
        })
    }
    onCompleted = () => {
        if (this.state.actual_accomplishments.trim().length< 1) {
            this.setState({
                errors: {
                    actual_accomplishments: "* Please add Actual Accomplishments"
                }
            })
        } else {
            this.setState({ loading: true })
            const leapDetails = this.props.leapDetails
            leapDetails.actual_end_date = new Date()
            leapDetails.LQ_Points = leapDetails.lq_value
            leapDetails.actual_accomplishments = this.state.actual_accomplishments.trim()
            leapDetails.isCompleted = true
            leapDetails.status = "Completed"

            const level = this.props.activeLevel

            switch (this.props.activeTab) {
                case 0:
                    level.Think = leapDetails
                    break;
                case 1:
                    level.Read = leapDetails
                    break;
                case 2:
                    level.Write = leapDetails
                    break;
                case 3:
                    level.Say = leapDetails
                    break;
                case 4:
                    level.Do = leapDetails
                    break;
                case 5:
                    level.Reflect = leapDetails
                    break;
            }


            axios
                .post(
                    'https://us-central1-the-lq-app-development-project.cloudfunctions.net/end_leap_in_project',
                    {
                        level,
                        activeLevelNumber: this.props.activeLevelNumber,
                        projectId: this.props.projectId,
                        competencyId: this.props.competencyId,
                        myId: this.props.myId,
                        activeTab: this.props.activeTabId,
                        isMasterProject: this.props.isMasterProject,
                        lq_value: leapDetails.LQ_Points * 4,
                        competencyLQPoints: this.props.competencyLQPoints
                    }
                )
                .then(res => {
                    this.setState({ loading: false })
                    if (res.data.error) {
                        return alert(res.data.message)
                    }
                    if (this.props.isMasterProject) {
                        this.props.updateUserLQ(leapDetails.LQ_Points * 4);
                    }

                    this.props.updateCompetencyLQ(this.props.competencyId, leapDetails.LQ_Points * 4)

                    // console.warn(res.data.project)
                    this.props.endLeapInProject(
                        res.data.project
                    )
                    this.props.openProgressDialog()
                })
                .catch(err => {
                    this.setState({ loading: false })
                    alert(err.response.data)
                })

            // this.props.endLeapInProject(
            //     level,
            //     this.props.activeLevelNumber,
            //     this.props.projectId,
            //     this.props.competencyId,
            //     this.props.activeTabId
            // )
        }
    }
    render() {
        const { leapDetails } = this.props
        const { errors, showButton } = this.state
        return (

            <Container style={styles.container}>
                <OverlaySpinner
                    visible={this.state.loading}
                    textStyle={{ color: 'white' }}
                />
                <Animated.ScrollView
                    style={{
                        marginTop: this.state.viewMargin,
                        // backgroundColor: 'white',
                        // zIndex: -10000,
                        // paddingLeft: 20,
                        // paddingRight: 20,
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
                                    <Text style={styles.valHeading}>--</Text>
                                </View>
                            </View>

                            <View style={{ padding: 20 }}>
                                <Item
                                    error={errors.actual_accomplishments ? true : false}
                                    style={{
                                        ...styles.transparentInputContainer,
                                        paddingTop: 10,
                                        paddingBottom: 10
                                    }}
                                >
                                    <Image
                                        source={require('../../images/comments_icon_dark.png')}
                                        style={{
                                            ...styles.startDateIcon,
                                            top: -20
                                        }}
                                    />
                                    <Textarea
                                        placeholder='Actual Accomplishments'
                                        value={this.state.actual_accomplishments}
                                        placeholderTextColor="rgba(0, 0, 0, 0.4)"
                                        onChangeText={val => this.onChangeText('actual_accomplishments', val)}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        style={styles.inputFieldStyle}
                                        // returnKeyType={"go"}
                                        // onSubmitEditing={() => this.passwordInputRefs._root.focus()}
                                        rowSpan={3}
                                    />
                                </Item>
                                {errors.actual_accomplishments && (
                                    <Text style={styles.errorTextStyle}>
                                        {errors.actual_accomplishments}
                                    </Text>
                                )}
                            </View>

                            {/* {leapDetails.actual_accomplishments.length > 0 && <View style={{ padding: 20, paddingBottom: 180 }}>
                        <Text style={styles.plannedText}>Actual Accomplishments</Text>
                        <Text style={styles.valHeading}>
                            {leapDetails.actual_accomplishments}
                        </Text>
                    </View>} */}
                            {/* </Content> */}
                        {/* </View>
                    </DismissKeyboardComponent> */}

                    {showButton && <LinearGradient
                    colors={['#024483', '#0078C7']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                        // position: 'absolute',
                        // bottom: 50,
                        flex: 1,
                        width: '90%',
                        alignSelf: 'center',
                        borderRadius: 10
                    }}
                >
                    <Button
                        transparent
                        full
                        onPress={this.onCompleted}
                    >
                        <Text style={{ color: 'white' }}>COMPLETED</Text>
                    </Button>
                </LinearGradient>}
                </View>
                    </DismissKeyboardComponent>
                </Animated.ScrollView>

                

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


const mapDispatchToProps = dispatch => ({
    endLeapInProject: (
        project
    ) => dispatch(endLeapInProject(
        project
    )),
    updateUserLQ: (lq_points) => dispatch(updateUserLQ(lq_points)),
    updateCompetencyLQ: (competencyId, lq_points) => dispatch(updateCompetencyLQ(competencyId, lq_points))
})

export default connect(null, mapDispatchToProps)(StartedLeap);