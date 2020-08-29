import moment from "moment"

export const addLevel = (competency) => {
    return {
        Think: {
            desc: `Think about what ${competency.name} means in the context of Leadership.`,
            point_value: '1 LQ',
            plan_start_date: '',
            plan_end_date: '',
            status: 'In Progress',
            LQ_Points: 0,
            actual_start_date: '',
            actual_end_date: '',
            actual_accomplishments: '',
            isCompleted: false,
            planned_activites: '',
            completedOn: '',
        },
        Read: {
            desc: `Read about what ${competency.name} means in the context of Leadership.`,
            point_value: '1 LQ',
            plan_start_date: '',
            plan_end_date: '',
            status: 'In Progress',
            LQ_Points: 0,
            actual_start_date: '',
            actual_end_date: '',
            actual_accomplishments: '',
            isCompleted: false,
            planned_activites: '',
            completedOn: '',
        },
        Write: {
            desc: `Write about what ${competency.name} means in the context of Leadership.`,
            point_value: '1 LQ',
            plan_start_date: '',
            plan_end_date: '',
            status: 'In Progress',
            LQ_Points: 0,
            actual_start_date: '',
            actual_end_date: '',
            actual_accomplishments: '',
            isCompleted: false,
            planned_activites: '',
            completedOn: '',
        },
        Say: {
            desc: `Talk about what ${competency.name} means in the context of Leadership.`,
            point_value: '1 LQ',
            plan_start_date: '',
            plan_end_date: '',
            status: 'In Progress',
            LQ_Points: 0,
            actual_start_date: '',
            actual_end_date: '',
            actual_accomplishments: '',
            isCompleted: false,
            planned_activites: '',
            completedOn: '',
        },
        Do: {
            desc: `Do something that shows what ${competency.name} means in the context of Leadership.`,
            point_value: '1 LQ',
            plan_start_date: '',
            plan_end_date: '',
            status: 'In Progress',
            LQ_Points: 0,
            actual_start_date: '',
            actual_end_date: '',
            actual_accomplishments: '',
            isCompleted: false,
            planned_activites: '',
            completedOn: '',
        },
        Reflect: {
            desc: `Reflect Upon your new knowledge what ${competency.name} means in the context of Leadership.`,
            point_value: '1 LQ',
            plan_start_date: '',
            plan_end_date: '',
            status: 'In Progress',
            LQ_Points: 0,
            actual_start_date: '',
            actual_end_date: '',
            actual_accomplishments: '',
            isCompleted: false,
            planned_activites: '',
            completedOn: '',
        }
    }
}


export const createCompentency = (competency) => {
        return {
            name: competency.name,
            id: competency.id,
            current_level: -1,
            LQ_Point: 0,
            Level1: addLevel(competency),
            Level2: addLevel(competency),
            Level3: addLevel(competency),
            Level4: addLevel(competency),
            Level5: addLevel(competency)
        }
}

export const startAddProject = (projectDetails, competencies) => {

    const all_compentencies = competencies.map(competency => {
        return createCompentency(competency)
    })

    const new_project = {
        ...projectDetails,
        createdOn: moment().format(),
        competencies: all_compentencies
    }

    // dispatch(addProject(new_project))

    return new_project

}