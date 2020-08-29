import database from '../firebase/firebase';
import axios from 'axios'

import { setArchiveProject } from './archiveProjects'

export const addProject = (project) => ({
    type: 'ADD_PROJECT',
    project
})

export const addNewCompetencies = (projectId, competencies) => ({
    type: 'ADD_NEW_COMPETENCIES',
    projectId,
    competencies
})

export const setProgressionLevel = (project) => ({
    type: 'SET_PROGRESSION_LEVEL',
    project
})

export const startLeapInProject = (project) => ({
    type: 'START_LEAP_IN_PROJECT',
    project
})

export const setStartDateinLeap = (
    activeTabName,
    competencyId,
    activeLevelNumber,
    date
) => ({
    type: "SET_START_DATE_IN_LEAP",
    activeTabName,
    competencyId,
    activeLevelNumber,
    date
})

export const setEndDateinLeap = (
    activeTabName,
    competencyId,
    activeLevelNumber,
    date
) => ({
    type: "SET_END_DATE_IN_LEAP",
    activeTabName,
    competencyId,
    activeLevelNumber,
    date
})



export const endLeapInProject = (project) => ({
    type: 'END_LEAP_IN_PROJECT',
    project
})

// action for Starting Project Loader
export const startProjectLoader = () => ({
    type: 'START_PROJECT_LOADER'
})

// action for Stopping Project Loader
export const stopProjectLoader = () => ({
    type: 'STOP_PROJECT_LOADER'
})

// clear projects
export const clearProjects = () => ({
    type: 'CLEAR_PROJECTS'
})

// Clear Single Project
export const clearSingleProject = () => ({
    type: 'CLEAR_SINGLE_PROJECT'
})

// Set Project
export const setProject = (project) => ({
    type: 'SET_PROJECT',
    project
})

export const startEditMode = () => ({
    type: 'START_EDIT_MODE'
})

export const stopEditMode = () => ({
    type: 'STOP_EDIT_MODE'
})

export const removeProject = (id) => ({
    type: 'REMOVE_PROJECT',
    id
})

export const deleteCompetency = (projectId, competencyId) => ({
    type: 'DELETE_COMPETENCY_IN_PROJECT',
    projectId,
    competencyId
})

export const changeInputCompetency1 = (name) => ({
    type: 'CHANGE_INPUT_COMPETENCY_1',
    name
})


export const changeInputCompetency2 = (name) => ({
    type: 'CHANGE_INPUT_COMPETENCY_2',
    name
})

export const changeInputCompetency3 = (name) => ({
    type: 'CHANGE_INPUT_COMPETENCY_3',
    name
})

export const changeInputCompetency4 = (name) => ({
    type: 'CHANGE_INPUT_COMPETENCY_4',
    name
})

export const changeInputCompetency5 = (name) => ({
    type: 'CHANGE_INPUT_COMPETENCY_5',
    name
})

export const changeInputCompetency6 = (name) => ({
    type: 'CHANGE_INPUT_COMPETENCY_6',
    name
})

export const changeInputCompetency7 = (name) => ({
    type: 'CHANGE_INPUT_COMPETENCY_7',
    name
})

export const updateUserLQ = (lq_points) => ({
    type: 'UPDATE_USER_LQ_POINTS',
    lq_points
})

export const updateCompetencyLQ = (competencyId, lq_points) => ({
    type: 'UPDATE_COMPETENCY_LQ_POINTS',
    competencyId,
    lq_points
})

export const minusUserLQ = (LQ_Point) => ({
    type: 'MINUS_USER_LQ_POINTS',
    LQ_Point
})


// Fetch All Projects
export const startFetchAllProjects = () => {
    return (dispatch, getState) => {
        const myId = getState().auth.user.userId;
        dispatch(startProjectLoader())
        dispatch(clearProjects())

        database
            .ref(`/Users/${myId}/Projects/`)
            .orderByKey()
            .once('value')
            .then(snapshot => {
                if (snapshot) {
                    snapshot.forEach(childSnapshot => {
                        const projectId = childSnapshot.key


                        axios
                            .get('https://us-central1-the-lq-app-development-project.cloudfunctions.net/fetch_single_project',
                                {
                                    params: {
                                        userId: myId,
                                        id: projectId
                                    }
                                })
                            .then((res) => {
                                // console.warn(res)    
                                const project = res.data.project;

                                if (project.isArchived) {
                                    project
                                    dispatch(setArchiveProject(project))
                                } else {
                                    dispatch(setProject(project))
                                }

                            })
                            .catch(err => {
                                console.warn(err)
                            })

                        // database
                        //     .ref(`/Projects/${myId}/${projectId}`)
                        //     .once('value')
                        //     .then(snapshot => {
                        //         if(snapshot) {
                        //             const project = snapshot.val()
                        //             const new_project = {
                        //                 id: snapshot.key,
                        //                 name: project.name,
                        //                 createdOn: project.createdOn,
                        //                 userId: project.userId,
                        //                 isArchived: project.isArchived
                        //             }

                        // if(new_project.isArchived) {
                        //     dispatch(setArchiveProject(new_project))
                        // } else {
                        //     dispatch(setProject(new_project))
                        // }

                        //         }
                        //     })

                    })

                    dispatch(stopProjectLoader())
                } else {
                    dispatch(stopProjectLoader())
                }
            })

    }
}



// export const startSetProgressionLevel = (projectId, competencyId, level) => {
//     return (dispatch, getState) => {

//     }
// }