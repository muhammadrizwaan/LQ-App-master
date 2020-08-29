import { Alert } from 'react-native'
import database, { firebase } from '../firebase/firebase'
import AsyncStorage from '@react-native-community/async-storage'

import { startFetchAllProjects, clearProjects, clearSingleProject } from './projectActions'
import { clearArchiveProjects } from './archiveProjects'

import competencies from '../Validation/competencies_buttons'

// SignIn User
export const signInUser = (user) => ({
    type: 'SIGNIN_USER',
    userData: user
})

// on Sign Up - Register User
export const setRegisterUser = (userData) => ({
    type: 'USER_REGISTERED',
    user: userData
})

// on Logout clear user
export const logoutUser = () => ({
    type: 'LOGOUT_USER'
})

// Update User Profile
export const updateUserProfile = (updates) => ({
    type: 'UPDATE_PROFILE',
    updates
})

export const saveUserData = async (userData) => {
    AsyncStorage.setItem('user', JSON.stringify(userData))
}

// Clear All Post Data
export const clearAllPosts = () => ({
    type: 'CLEAR_ALL_POSTS'
})
// Set profile loading
export const setProfileLoading = () => ({
    type: 'START_LOADING'
})

export const setLeadershipSurvey = (leaderShipSurveyResults) => ({
    type: 'SET_LEADERSHIP_SURVEY',
    leaderShipSurveyResults
})

// Login User With Id
export const loginUserWithId = (userID) => {
    return (dispatch) => {
        dispatch(setProfileLoading())

        database
            .ref(`/Users/${userID}`)
            .once("value")
            .then(snapshot => {
                const { disabled } = snapshot.val()


                dispatch({
                    type: 'STOP_LOADING'
                })

                if (disabled) {
                    Alert.alert(
                        'Account Disbaled',
                        'Your Account is being Blocked by Entrepreneur'
                    )
                } else {
                    dispatch(signInUser({...snapshot.val(), Projects: 0}))
                    dispatch(startFetchAllProjects())
                }
            })
    }
}

// User Login
export const loginUser = (email, password) => {
    return (dispatch) => {
        dispatch({
            type: 'SIGNIN_LOADING'
        })

        firebase.auth().signInWithEmailAndPassword(
            email,
            password
        )
            .then((data) => {
                const userID = data.user.uid
                // dispatch(stopSignInLoading())

                database
                    .ref(`/Users/${userID}`)
                    .once("value")
                    .then(snapshot => {
                        const { disabled } = snapshot.val()

                        dispatch({
                            type: 'STOP_SIGNIN_LOADING'
                        })

                        if (disabled) {
                            Alert.alert(
                                'Account Disbaled',
                                'Your Account is being Blocked by Entrepreneur'
                            )
                        } else {

                            AsyncStorage.setItem('userID', JSON.stringify(userID))
                            dispatch(signInUser({...snapshot.val(), Projects: 0}))
                            dispatch(startFetchAllProjects())
                        }
                    })
            })
            .catch(err => {
                dispatch({
                    type: 'STOP_SIGNIN_LOADING'
                })
                dispatch({
                    type: 'SIGNIN_ERROR',
                    err
                })
            })
    }
}

// User Sign Up
export const signUpUser = (email, password, userData) => {
    // console.log(email, password, userData)
    return (dispatch) => {
        // Start SignUp Loading
        dispatch({
            type: 'START_SIGNUP_LOADING'
        })

        // Sign Up User with firebase
        firebase
            .auth()
            .createUserWithEmailAndPassword(
                email,
                password
            )
            .then(() => {
                // console.warn("user created", firebase.auth().currentUser)

                const user = firebase.auth().currentUser

                const userSampleData = {
                    chats: 0,
                    notifications: 0,
                    disabled: false,
                    userId: user.uid,
                    privateProfile: false,
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone,
                    userAvatar: userData.userAvatar,
                    userAvatarName: userData.userAvatarName,
                    notificationEnabled: true,
                    isOnline: false,
                    LQ_POINTS: 0,
                    lastSeen: '',
                    title: userData.title,
                    department: userData.department,
                    Projects: 0,
                    isLeadershipSurveyDone: false,
                    leaderShipSurveyResults: 0,
                    competencies: competencies
                }


                AsyncStorage.setItem('userID', JSON.stringify(user.uid))

                // Save User Data in User Node
                database.ref(`/Users/${user.uid}`)
                    .set(userSampleData)
                    .then((data) => {
                        // Stop signUp Loading
                        dispatch({
                            type: 'STOP_SIGNUP_LOADING'
                        })
                        dispatch(setRegisterUser(userSampleData))
                        dispatch(startFetchAllProjects())
                    })
            })
            .catch(err => {
                // Alert -> Show the error
                console.log('from signup', err)
                alert(err)
                // Stop SignUpn Loading
                dispatch({
                    type: 'STOP_SIGNUP_LOADING'
                })
                // Set Signup Error to true
                dispatch({
                    type: 'SIGNUP_ERROR'
                })
            })
    }
}

// Logout User

export const onLogout = () => {
    return (dispatch, getState) => {
        dispatch(logoutUser())
        dispatch(clearProjects())
        dispatch(clearSingleProject())
        dispatch(clearArchiveProjects())
    }
}