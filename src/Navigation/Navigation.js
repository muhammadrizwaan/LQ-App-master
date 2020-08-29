import React from 'react'
import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation'

import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'

import SplashScreen from '../screens/SplashScreen'

import LoginScreen from '../screens/AuthScreens/LoginScreen'
import SignUpScreen from '../screens/AuthScreens/SignUpScreen'
import ResetPasswordScreen from '../screens/AuthScreens/ResetPaswordScreen'

import ExistingProjects from '../screens/HomeScreens/ExistingProjects'
import CreateProjectScreen from '../screens/create_project' 
import ProjectsPortfolio from '../screens/HomeScreens/ProjectsPortfolio'
import MenuDrawer from '../Drawer/MenuDrawer'
import Survey from '../screens/surveyScreens/Survey'
import ProjectDetails from '../screens/ProjectScreens/ProjectDetails'
import LeapSheetsPlan from '../screens/ProjectScreens/LeapSheetsPlan'
import LeapSheetsPlanInfo from '../screens/ProjectScreens/LeapSheetsPlanInfo'
import CompetencyLeapScreen from '../screens/ProjectScreens/CompetencyLeapScreen'
import TKOScreen from '../screens/ProjectScreens/TKOScreen'
import InstructionsScreen from '../screens/HomeScreens/InstructionsScreen'
import LeadershipSurvey from '../screens/HomeScreens/LeadershipSurvery'
import ArchiveProjects from '../screens/HomeScreens/ArchiveProjects'
import ProfileScreen from '../screens/HomeScreens/ProfileScreen'
import EditProfileScreen from '../screens/ProfileScreens/EditProfileScreen'
import AddMoreCompetencyScreen from '../screens/ProjectScreens/AddMoreCompetencyScreen'

import OnboardingScreens from '../screens/OnboardingScreens/OnboardingScreens'

const DrawerConfig = {
    draweWidth: 400,
    contentComponent: ({ navigation }) => {
        return (<MenuDrawer navigation={navigation} />)
    },
    drawerType: 'back'
}

const HomeMainStack = createStackNavigator({
    ProjectsPortfolio: {
        screen: ProjectsPortfolio
    },
    ExistingProjects: ExistingProjects,
    CreateProjectScreen: CreateProjectScreen,
    InstructionsScreen: InstructionsScreen,
    LeadershipSurvey: LeadershipSurvey,
    Survey: Survey,
    ProjectDetails: ProjectDetails,
    LeapSheetsPlan: LeapSheetsPlan,
    LeapSheetsPlanInfo: LeapSheetsPlanInfo,
    CompetencyLeapScreen: CompetencyLeapScreen,
    TKOScreen: TKOScreen,
    ArchiveProjects: ArchiveProjects,
    ProfileScreen: ProfileScreen,
    EditProfileScreen: EditProfileScreen,
    AddMoreCompetencyScreen: AddMoreCompetencyScreen
}, {
    initialRouteName: 'ProjectsPortfolio'
})



const HomeDrawerStack = createDrawerNavigator({
    HomeMainStack
}, DrawerConfig)


const AuthStack = createStackNavigator({
    LoginScreen: LoginScreen,
    SignUpScreen: SignUpScreen,
    ResetPasswordScreen: ResetPasswordScreen,
}, {
    initialRouteName: 'LoginScreen'
})

const OnboardingStack = createStackNavigator({
    OnboardingScreens: OnboardingScreens
}, {
    initialRouteName: 'OnboardingScreens'
})

export default createAppContainer(
    createSwitchNavigator(
        {
            SplashScreen: SplashScreen,
            Auth: AuthStack,
            Home: HomeDrawerStack,
            Onboarding: OnboardingStack
        },
        {
            initialRouteName: 'SplashScreen',
            navigationOptions: {
                gesturesEnabled: true
            }
        }
    )
)