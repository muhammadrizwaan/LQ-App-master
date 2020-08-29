import React from 'react'
import { StyleSheet, Image, TouchableOpacity, Platform, Keyboard } from 'react-native'
import { View, Text, Item, Input, Button, Textarea, Content } from 'native-base'

import IconStyles from '../../styles/IconStyles'

import DateTimePicker from '@react-native-community/datetimepicker'
import DatePickerModal from './DatePickerModal'

import moment from 'moment'

import validateStartFields from '../../Validation/validateStartFields'
import { connect } from 'react-redux'
import { startLeapInProject, setStartDateinLeap, setEndDateinLeap } from '../../actions/projectActions'
import database from "../../firebase/firebase"

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

import Animated, { Easing } from 'react-native-reanimated'

import axios from 'axios'

import OverlaySpinner from 'react-native-loading-spinner-overlay';

import DismissKeyboardComponent from '../GeneralComponents/DismissKeyboardComponent'

class NotStartedLeap extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading:false,
            errors: {},
            comments: '',
            showStartDatePicker: false,
            startDate: props.leapDetails.plan_start_date ? new Date(props.leapDetails.plan_start_date) : new Date(),
            endDate:  props.leapDetails.plan_end_date ? new Date(props.leapDetails.plan_end_date) : new Date(),
            showEndDatePicker: false,
            isStartDateSelected: props.leapDetails.plan_start_date ? true : false,
            isEndDateSelected: props.leapDetails.plan_end_date ? true : false,
            viewMargin: props.leapDetails.plan_end_date ? new Animated.Value(25) : new Animated.Value(0),
            activeTabId: props.leapDetails ? props.leapDetails.activeTabId : 0
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.activeTabId !== this.state.activeTabId) {
           
            this.setState({
                errors: {},
                comments: '',
                showStartDatePicker: false,
                startDate: newProps.leapDetails.plan_start_date ? new Date(newProps.leapDetails.plan_start_date) : new Date(),
                showEndDatePicker: false,
                isStartDateSelected: newProps.leapDetails.plan_start_date ? true : false,
                endDate: newProps.leapDetails.plan_end_date ? new Date(newProps.leapDetails.plan_end_date) : new Date(),
                isEndDateSelected: newProps.leapDetails.plan_end_date ? true : false,
                activeTabId: newProps.activeTabId,
                viewMargin: newProps.leapDetails.plan_end_date ? new Animated.Value(25) : new Animated.Value(0),
            })
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
                    // toValue: this.state.isEndDateSelected ? -40 : -60,
                    toValue: -70,
                    duration: 100,
                    easing: Easing.linear
                }
            ).start()
        }
    }

    handleKeyboardClose = () => {
        if (Platform.OS === 'ios') {
            Animated.timing(
                this.state.viewMargin,
                {
                    toValue: this.state.isEndDateSelected ? 25 : 0,
                    duration: 100,
                    easing: Easing.linear
                }
            ).start()
        }
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }
    setStartDate = (event, date) => {
        if (date) {
            const startDate = date || this.state.startDate;
            if (this.state.isEndDateSelected) {
                if (startDate > this.state.endDate) {
                    this.setState({
                        showStartDatePicker: false,
                        errors: {
                            startDate: "* Start date must be less than end date"
                        }
                    })
                } else {
                    this.setState({
                        showStartDatePicker: Platform.OS === 'ios' ? true : false,
                    })
                    this.setStartDateonDB(startDate)
                }
            } else {
                this.setState({
                    showStartDatePicker: Platform.OS === 'ios' ? true : false,
                })
                this.setStartDateonDB(date)
            }


        } else {
            this.setState({
                showStartDatePicker: Platform.OS === 'ios' ? true : false,
            })
        }

    }
    setEndDate = (event, date) => {
        if (date) {
            const endDate = date || this.state.endDate;
            if (this.state.isStartDateSelected) {
                if (endDate < this.state.startDate) {
                    this.setState({
                        showEndDatePicker: false,
                        errors: {
                            endDate: "* End date must be greater than start date"
                        }
                    })
                } else {
                    this.setState({
                        showEndDatePicker: Platform.OS === 'ios' ? true : false,
                    })
                    this.setEndDateonDB(date)
                }
            } else {
                this.setState({
                    showEndDatePicker: Platform.OS === 'ios' ? true : false,
                    errors: {
                        endDate: "* Please select start date first"
                    }
                })
            }
        } else {
            this.setState({
                showEndDatePicker: Platform.OS === 'ios' ? true : false,
            })
        }
    }
    showStartDate = () => {
        this.setState({ showStartDatePicker: true })
    }
    showEndDate = () => {
        this.setState({ showEndDatePicker: true })
    }
    setStartDateonDB = (date) => {
        // this.setState({
        //     loading: true
        // })
        // Set Start Date on Database
        const { projectId, competencyId, myId, activeLevelNumber } = this.props

        let activeTabName = "Think"

        switch (this.props.activeTabId) {
            case 0:
                activeTabName = "Think"
                break;
            case 1:
                activeTabName = "Read"
                break;
            case 2:
                activeTabName = "Write"
                break;
            case 3:
                activeTabName = "Say"
                break;
            case 4:
                activeTabName = "Do"
                break;
            case 5:
                activeTabName = "Reflect"
                break;
        }

        database
            .ref(`Projects/${myId}/${projectId}/competencies/${competencyId}/Level${activeLevelNumber + 1}/${activeTabName}`)
            .update({
                plan_start_date: date
            })
            .then(() => {
                this.setState({
                    loading: false
                })
                this.setState({
                    showStartDatePicker: false,
                    startDate: date,
                    isStartDateSelected: true,
                    errors: {}
                })
                this.props.setStartDateinLeapAction(
                    activeTabName,
                    competencyId,
                    activeLevelNumber,
                    date
                )
            })
    }
    setEndDateonDB = (date) => {
        // this.setState({
        //     loading: true
        // })
        // Set Start Date on Database
        const { projectId, competencyId, myId, activeLevelNumber } = this.props

        let activeTabName = "Think"

        switch (this.props.activeTabId) {
            case 0:
                activeTabName = "Think"
                break;
            case 1:
                activeTabName = "Read"
                break;
            case 2:
                activeTabName = "Write"
                break;
            case 3:
                activeTabName = "Say"
                break;
            case 4:
                activeTabName = "Do"
                break;
            case 5:
                activeTabName = "Reflect"
                break;
        }

        database
            .ref(`Projects/${myId}/${projectId}/competencies/${competencyId}/Level${activeLevelNumber + 1}/${activeTabName}`)
            .update({
                plan_end_date: date
            })
            .then(() => {
                this.setState({
                    loading: false
                })
                this.setState({
                    showEndDatePicker: false,
                    endDate: date,
                    isEndDateSelected: true,
                    errors: {},
                    viewMargin: new Animated.Value(25),
                })
                this.props.setEndDateInLeapAction(
                    activeTabName,
                    competencyId,
                    activeLevelNumber,
                    date
                )
            })
    }
    onStartDateChange = (date) => {
        if (date) {
            if (this.state.isEndDateSelected) {
                if (date > this.state.endDate) {
                    this.setState({
                        showStartDatePicker: false,
                        errors: {
                            startDate: "* Start date must be less than end date"
                        }
                    })
                } else {
                    this.setState({
                        showStartDatePicker: false,
                    })
                    this.setStartDateonDB(date)
                }
            } else {
                this.setState({
                    showStartDatePicker: false,
                })
                this.setStartDateonDB(date)
            }

        }
    }
    onEndDateChange = (date) => {
        if (date) {
            if (this.state.isStartDateSelected) {
                if (date < this.state.startDate) {
                    this.setState({
                        showEndDatePicker: false,
                        errors: {
                            endDate: "* End date must be greater than start date"
                        }
                    })
                } else {
                    this.setState({
                        showEndDatePicker: false
                    })
                    this.setEndDateonDB(date)
                }
            } else {
                this.setState({
                    showEndDatePicker: false,
                    errors: {
                        endDate: "* Please select start date first"
                    }
                })
            }

        }
        // this.setState({
        //     showEndDatePicker: false,
        //     endDate: date,
        //     isEndDateSelected: true
        // })
    }

    onStart = () => {
        Keyboard.dismiss()

        const { isValid, errors } = validateStartFields(
            this.state.isStartDateSelected,
            this.state.isEndDateSelected,
            this.state.startDate,
            this.state.endDate,
            this.state.comments.trim()
        )

        if (!isValid) {
            this.setState({ errors })
        } else {
            this.setState({ errors: {}, loading: true })
            // console.warn(this.props.leapDetails)
            // console.warn(this.props.activeLevel)

            // console.warn(this.props.activeTab)
            // console.warn(this.props.activeLevelNumber)

            const leapDetails = this.props.leapDetails

            leapDetails.plan_start_date = this.state.startDate
            leapDetails.plan_end_date = this.state.endDate
            leapDetails.planned_activities = this.state.comments.trim()
            leapDetails.actual_start_date = new Date();
            leapDetails.isStarted = true;

            const level = this.props.activeLevel

            switch (this.props.activeTabId) {
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

            // console.warn("level", level)
            // this.props.startLeapInProject(
            //     level,
            //     this.props.activeLevelNumber,
            //     this.props.projectId,
            //     this.props.competencyId
            // )

            axios
                .post(
                    'https://us-central1-the-lq-app-development-project.cloudfunctions.net/start_leap_in_project',
                    {
                        level,
                        activeLevelNumber: this.props.activeLevelNumber,
                        projectId: this.props.projectId,
                        competencyId: this.props.competencyId,
                        myId: this.props.myId
                    }
                )
                .then(res => {
                    this.setState({ loading: false })
                    if (res.data.error) {
                        return alert(res.data.message)
                    }

                    // console.warn(res.data.project)
                    this.props.startLeapInProject(
                        res.data.project
                    )
                })
                .catch(err => {
                    this.setState({ loading: false })
                    alert(err.response.data)
                })
        }
    }

    render() {
        const { leapDetails, projectId, competencyId, activeLevel } = this.props
        const { errors } = this.state

        return (
            <Animated.ScrollView
                style={{
                    marginTop: this.state.viewMargin
                }}
                keyboardShouldPersistTaps={'always'}
            >
                <DismissKeyboardComponent>
                    <View>
                        <OverlaySpinner
                            visible={this.state.loading}
                            textStyle={{ color: 'white' }}
                        />
                        {/* <KeyboardAwareScrollView
                    style={{ backgroundColor: 'transparent' }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    // contentContainerStyle={{backgroundColor: 'transparent'}}
                    scrollEnabled={false}
                > */}
                        <View style={styles.container}>
                            <Text style={styles.actionTitle}>Action/Description</Text>
                            <Text style={styles.leapDescStyle}>
                                {leapDetails.desc}
                            </Text>

                            <Text style={styles.actionTitle}>Progression Points =
                    <Text style={styles.lqPointStyle}> {leapDetails.point_value}</Text>
                            </Text>

                            <Text style={styles.planTitle}>
                                PLAN
                </Text>

                            <Button
                                transparent
                                style={styles.transparentInputContainer}
                                onPress={this.showStartDate}
                            >
                                <Image
                                    source={require('../../images/start_date_icon.png')}
                                    style={IconStyles.startDateIcon}
                                />
                                <Text
                                    style={styles.dateTextStyle}
                                    uppercase={false}
                                >
                                    {
                                        this.state.isStartDateSelected ?
                                            moment(this.state.startDate).format('MM/DD/YYYY')
                                            :
                                            'Start Date'
                                    }
                                </Text>
                            </Button>
                            {errors.startDate && (
                                <Text style={styles.errorTextStyle}>
                                    {errors.startDate}
                                </Text>
                            )}

                            <Button
                                transparent
                                style={styles.transparentInputContainer}
                                onPress={this.showEndDate}
                            >
                                <Image
                                    source={require('../../images/start_date_icon.png')}
                                    style={IconStyles.startDateIcon}
                                />
                                <Text
                                    style={styles.dateTextStyle}
                                    uppercase={false}
                                >
                                    {
                                        this.state.isEndDateSelected ?
                                            moment(this.state.endDate).format('MM/DD/YYYY')
                                            :
                                            'End Date'
                                    }
                                </Text>
                            </Button>
                            {errors.endDate && (
                                <Text style={styles.errorTextStyle}>
                                    {errors.endDate}
                                </Text>
                            )}

                            <Item
                                error={errors.email ? true : false}
                                style={{
                                    ...styles.transparentInputContainer,
                                    paddingTop: 10,
                                    paddingBottom: 10
                                }}
                            >
                                <Image
                                    source={require('../../images/comments_icon.png')}
                                    style={{
                                        ...IconStyles.startDateIcon,
                                        top: -20
                                    }}
                                />
                                <Textarea
                                    placeholder='Comments/Planned Activities'
                                    value={this.state.email}
                                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                                    onChangeText={val => this.onChangeText('comments', val)}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={styles.inputFieldStyle}
                                    // returnKeyType={"go"}
                                    // onSubmitEditing={() => this.passwordInputRefs._root.focus()}
                                    rowSpan={3}
                                />
                            </Item>
                            {errors.comments && (
                                <Text style={styles.errorTextStyle}>
                                    {errors.comments}
                                </Text>
                            )}

                            <Button
                                full
                                transparent
                                style={styles.beginButtonStyle}
                                onPress={this.onStart}
                            >
                                <Text
                                    style={{ textTransform: 'uppercase', color: 'white', fontSize: 14 }}
                                >
                                    Start
                    </Text>
                            </Button>

                            {this.state.showStartDatePicker && Platform.OS !== 'ios' && <View style={styles.dateContainer}>
                                <DateTimePicker
                                    value={this.state.startDate}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={(event, date) => {
                                        this.setState({ showStartDatePicker: false })
                                        this.setStartDate(event, date)
                                    }}
                                    minimumDate={new Date(2020, 0, 1)}
                                />
                            </View>}

                            {this.state.showEndDatePicker && Platform.OS !== 'ios' && <View style={styles.dateContainer}>
                                <DateTimePicker
                                    value={this.state.endDate}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={(event, date) => {
                                        this.setState({ showEndDatePicker: false })
                                        this.setEndDate(event, date)
                                    }}
                                    minimumDate={this.state.startDate}
                                />
                            </View>}

                            {/* Date Picker Modal for IOS (start date) */}
                            {/* {this.state.showStartDatePicker && Platform.OS !== 'ios' && <View style={styles.dateContainer}> */}
                            <DatePickerModal
                                visible={Platform.OS === "ios" ? this.state.showStartDatePicker : false}
                                date={this.state.startDate}
                                onClose={() => this.setState({ showStartDatePicker: false })}
                                setDate={this.setStartDate}
                                onChange={this.onStartDateChange}
                                minimumDate={new Date(2020, 0, 1)}
                            />
                            {/* </View>} */}

                            {/* Date Picker Modal for IOS (end date) */}
                            <DatePickerModal
                                visible={Platform.OS === "ios" ? this.state.showEndDatePicker : false}
                                date={this.state.endDate}
                                onClose={() => this.setState({ showEndDatePicker: false })}
                                setDate={this.setEndDate}
                                onChange={this.onEndDateChange}
                                minimumDate={this.state.startDate}
                            />
                        </View>
                        {/* </KeyboardAwareScrollView> */}
                    </View>
                </DismissKeyboardComponent>
            </Animated.ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    actionTitle: {
        fontSize: 14,
        color: 'white',
        opacity: 0.4
    },
    leapDescStyle: {
        fontSize: 14,
        color: 'white',
        opacity: 0.8,
        marginTop: 10,
        marginBottom: 10
    },
    lqPointStyle: {
        fontSize: 14,
        color: 'white',
        opacity: 0.8,
    },
    planTitle: {
        fontSize: 14,
        opacity: 0.8,
        color: 'white',
        textTransform: 'uppercase',
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    transparentInputContainer: {
        marginLeft: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
        color: 'white',
        fontFamily: "Montserrat-Regular",
    },
    dateTextStyle: {
        fontSize: 14,
        opacity: 0.4,
        color: 'white'
    },
    beginButtonStyle: {
        // width: '100%',
        // alignSelf: "center", 
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: '#0078C7',
        borderRadius: 5,
        marginTop: 20
    },
    errorTextStyle: {
        fontSize: 12,
        color: '#ffffff',
        opacity: 0.5,
        fontFamily: "Montserrat-Regular",
    },
})

const mapDispatchToProps = dispatch => ({
    startLeapInProject: (
        project
    ) => dispatch(startLeapInProject(
        project
    )),
    setStartDateinLeapAction: (
        activeTabName,
        competencyId,
        activeLevelNumber,
        date
    ) => dispatch(setStartDateinLeap(activeTabName,
        competencyId,
        activeLevelNumber,
        date
    )),
    setEndDateInLeapAction: (
        activeTabName,
        competencyId,
        activeLevelNumber,
        date
    ) => dispatch(setEndDateinLeap(activeTabName,
        competencyId,
        activeLevelNumber,
        date
    ))
})

export default connect(null, mapDispatchToProps)(NotStartedLeap)