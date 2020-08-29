import moment from "moment"

const initialState = {
    id: 0,
    name: "Sample Project",
    userId: '',
    competencies: []
}



export default (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PROJECT':
            return action.project
        case 'ADD_NEW_COMPETENCIES':
            const project = state;

            project.competencies = project.competencies.concat(action.competencies)

            project.competencies.sort((a, b) => a.id < b.id ? -1 : 1)
            return project;
        case 'DELETE_COMPETENCY_IN_PROJECT':
            const project1 = state;

            project1.competencies = project1.competencies.filter(competency => competency.id !== action.competencyId)

            return project1
        case 'UPDATE_COMPETENCY_LQ_POINTS':
            const project2 = state;

            project2.competencies = project2.competencies.map(competency => {
                if (competency.id === action.competencyId) {
                    return {
                        ...competency,
                        LQ_Point: competency.LQ_Point + action.lq_points
                    }
                }
                return competency
            })

            return project2
        case 'SET_PROGRESSION_LEVEL':
            return action.project
        // console.warn(action.competencyId)
        // const project3 = state;
        // console.log("Before competec",project3)
        // project3.competencies = project3.competencies.map(competency => {
        //     if(competency.id === action.competencyId) {
        //         return {
        //             ...competency,
        //             current_level: 0
        //         }
        //     }
        //     return competency
        // })
        // console.log("after level",project3)
        // return project3
        case 'START_LEAP_IN_PROJECT':
            return action.project
        case "SET_START_DATE_IN_LEAP":
            const old_competencies = state.competencies;
            old_competencies.map(competency => {
                if (competency.id === action.competencyId) {
                    competency[`Level${action.activeLevelNumber + 1}`][action.activeTabName].plan_start_date = action.date
                }
                return competency
            })

            return {
                ...state,
                competencies: old_competencies
            }
        case "SET_END_DATE_IN_LEAP":
            const old_competencies2 = state.competencies;
            old_competencies2.map(competency => {
                if (competency.id === action.competencyId) {
                    competency[`Level${action.activeLevelNumber + 1}`][action.activeTabName].plan_end_date = action.date
                }
                return competency
            })

            return {
                ...state,
                competencies: old_competencies2
            }
        case 'END_LEAP_IN_PROJECT':
            return action.project
        case 'CLEAR_SINGLE_PROJECT':
            return initialState
        default:
            return state
    }
}