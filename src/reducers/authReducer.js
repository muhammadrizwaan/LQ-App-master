import AsyncStorage from '@react-native-community/async-storage'

const defaultState = {
    isSignIn: false,
    isAuthenticated: false,
    isRegistered: false,
    signUpLoading: false,
    signUpError: false,
    signInLoading: false,
    signInError: '',
    isSignInError: false,
    profileLoading: true,
    user: {
        chats: 0,
        notifications: 0,
        disbaled: false,
        userId: '12345',
        privateProfile: false,
        name: '',
        email: '',
        phone: '',
        userAvatar: 'https://pngtree.com/freepng/vector-user-young-boy-avatar-icon_4827810.html',
        userAvatarName: 'New sample Image',
        notificationEnabled: true,
        isOnline: true,
        LQ_POINTS: 0,
        lastSeen: '',
        title: '',
        department: '',
        competencies: []
    }
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'STOP_LOADING':
            return { ...state, profileLoading: false }
        case 'START_LOADING':
            return { ...state, profileLoading: true }
        case 'START_SIGNUP_LOADING':
            return { ...state, signUpLoading: true }
        case 'STOP_SIGNUP_LOADING':
            return { ...state, signUpLoading: false }
        case 'USER_REGISTERED':
            return { ...state, isRegistered: true, user: action.user }
        case 'SIGNUP_ERROR':
            return { ...state, signUpError: true }
        case 'SIGNIN_USER':
            return { ...state, isSignIn: true, isSignInError: false, signUpError: false, user: action.userData, signInError: '' }
        case 'SIGNIN_ERROR':
            return { ...state, isSignInError: true, signInError: action.err }
        case 'SIGNIN_LOADING':
            return { ...state, signInLoading: true }
        case 'STOP_SIGNIN_LOADING':
            return { ...state, signInLoading: false }
        case 'UPDATE_PROFILE':
            const updatedUser = {
                ...state.user,
                ...action.updates
            }
            return {
                ...state,
                user: updatedUser
            }
        case 'SET_LEADERSHIP_SURVEY':
            const updUser = {
                ...state.user,
                isLeadershipSurveyDone: true,
                leaderShipSurveyResults: action.leaderShipSurveyResults
            }

            return {
                ...state,
                user: updUser
            }
        case 'CHANGE_INPUT_COMPETENCY_1':
            const updCompetencies = state.user.competencies.map(competency => {
                if (competency.id === 18) {
                    return {
                        ...competency,
                        name: action.name,
                        isDefined: true
                    }
                }
                return competency
            })

            return {
                ...state,
                user: {
                    ...state.user,
                    competencies: updCompetencies
                }
            }

        case 'CHANGE_INPUT_COMPETENCY_2':
            const updCompetencies2 = state.user.competencies.map(competency => {
                if (competency.id === 19) {
                    return {
                        ...competency,
                        name: action.name,
                        isDefined: true
                    }
                }
                return competency
            })

            return {
                ...state,
                user: {
                    ...state.user,
                    competencies: updCompetencies2
                }
            }
        case 'CHANGE_INPUT_COMPETENCY_3':
            const updCompetencies3 = state.user.competencies.map(competency => {
                if (competency.id === 20) {
                    return {
                        ...competency,
                        name: action.name,
                        isDefined: true
                    }
                }
                return competency
            })

            return {
                ...state,
                user: {
                    ...state.user,
                    competencies: updCompetencies3
                }
            }
        case 'CHANGE_INPUT_COMPETENCY_4':
            const updCompetencies4 = state.user.competencies.map(competency => {
                if (competency.id === 21) {
                    return {
                        ...competency,
                        name: action.name,
                        isDefined: true
                    }
                }
                return competency
            })

            return {
                ...state,
                user: {
                    ...state.user,
                    competencies: updCompetencies4
                }
            }
        case 'CHANGE_INPUT_COMPETENCY_5':
            const updCompetencies5 = state.user.competencies.map(competency => {
                if (competency.id === 22) {
                    return {
                        ...competency,
                        name: action.name,
                        isDefined: true
                    }
                }
                return competency
            })

            return {
                ...state,
                user: {
                    ...state.user,
                    competencies: updCompetencies5
                }
            }
        case 'CHANGE_INPUT_COMPETENCY_6':
            const updCompetencies6 = state.user.competencies.map(competency => {
                if (competency.id === 23) {
                    return {
                        ...competency,
                        name: action.name,
                        isDefined: true
                    }
                }
                return competency
            })

            return {
                ...state,
                user: {
                    ...state.user,
                    competencies: updCompetencies6
                }
            }
        case 'CHANGE_INPUT_COMPETENCY_7':
            const updCompetencies7 = state.user.competencies.map(competency => {
                if (competency.id === 24) {
                    return {
                        ...competency,
                        name: action.name,
                        isDefined: true
                    }
                }
                return competency
            })

            return {
                ...state,
                user: {
                    ...state.user,
                    competencies: updCompetencies7
                }
            }
        case 'UPDATE_USER_LQ_POINTS':
            return {
                ...state,
                user: {
                    ...state.user,
                    LQ_POINTS: state.user.LQ_POINTS + (action.lq_points * 5 / 100)
                }
            }
        case 'MINUS_USER_LQ_POINTS':
            // console.log(action.LQ_Point)
            return {
                ...state,
                user: {
                    ...state.user,
                    LQ_POINTS: action.LQ_Point
                }
            }
        case 'LOGOUT_USER':
            return defaultState
        default:
            return state
    }
}