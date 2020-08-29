const functions = require('firebase-functions');
const admin = require('firebase-admin')

const moment = require('moment')
const json2csv = require("json2csv").parse;

var serviceAccount = require("./the-lq-app-development-project-firebase-adminsdk-792q4-409f629395");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://the-lq-app-development-project.firebaseio.com/"
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions


const addLevel = (competency, level) => {
    return {
        Think: {
            id: 0,
            desc: `Think about what ${competency.name} means in the context of Leadership.`,
            point_value: '4 LQ',
            plan_start_date: '',
            plan_end_date: '',
            status: 'In Progress',
            LQ_Points: 0,
            actual_start_date: '',
            actual_end_date: '',
            actual_accomplishments: '',
            planned_activities: "",
            isCompleted: false,
            isStarted: false,
            completedOn: '',
            level: level,
            lq_value: 1
        },
        Read: {
            id: 1,
            desc: `Read about what ${competency.name} means in the context of Leadership.`,
            point_value: '8 LQ',
            plan_start_date: '',
            plan_end_date: '',
            status: 'In Progress',
            LQ_Points: 0,
            actual_start_date: '',
            actual_end_date: '',
            actual_accomplishments: '',
            planned_activities: "",
            isCompleted: false,
            isStarted: false,
            completedOn: '',
            level: level,
            lq_value: 2
        },
        Write: {
            id: 2,
            desc: `Write about what ${competency.name} means in the context of Leadership.`,
            point_value: '8 LQ',
            plan_start_date: '',
            plan_end_date: '',
            status: 'In Progress',
            LQ_Points: 0,
            actual_start_date: '',
            actual_end_date: '',
            actual_accomplishments: '',
            planned_activities: "",
            isCompleted: false,
            isStarted: false,
            completedOn: '',
            level: level,
            lq_value: 2
        },
        Say: {
            id: 3,
            desc: `Talk about what ${competency.name} means in the context of Leadership.`,
            point_value: '8 LQ',
            plan_start_date: '',
            plan_end_date: '',
            status: 'In Progress',
            LQ_Points: 0,
            actual_start_date: '',
            actual_end_date: '',
            actual_accomplishments: '',
            planned_activities: "",
            isCompleted: false,
            isStarted: false,
            completedOn: '',
            level: level,
            lq_value: 2
        },
        Do: {
            id: 4,
            desc: `Do something that shows what ${competency.name} means in the context of Leadership.`,
            point_value: '8 LQ',
            plan_start_date: '',
            plan_end_date: '',
            status: 'In Progress',
            LQ_Points: 0,
            actual_start_date: '',
            actual_end_date: '',
            actual_accomplishments: '',
            planned_activities: "",
            isCompleted: false,
            isStarted: false,
            completedOn: '',
            level: level,
            lq_value: 2
        },
        Reflect: {
            id: 5,
            desc: `Reflect Upon your new knowledge what ${competency.name} means in the context of Leadership.`,
            point_value: '4 LQ',
            plan_start_date: '',
            plan_end_date: '',
            status: 'In Progress',
            LQ_Points: 0,
            actual_start_date: '',
            actual_end_date: '',
            actual_accomplishments: '',
            planned_activities: "",
            isCompleted: false,
            isStarted: false,
            completedOn: '',
            level: level,
            lq_value: 1
        }
    }
}

const createCompentency = (competency) => {
    return {
        name: competency.name,
        id: competency.id,
        current_level: -1,
        LQ_Point: 0,
        Level1: addLevel(competency, 0),
        Level2: addLevel(competency, 1),
        Level3: addLevel(competency, 2),
        Level4: addLevel(competency, 3),
        Level5: addLevel(competency, 4)
    }
}

exports.create_project = functions.https.onRequest((req, res) => {

    if (req.method === "POST") {
        const competencies = req.body.competencies;
        const projectDetails = req.body.projectDetails;
        const myId = req.body.myId


        const all_compentencies = competencies.map(competency => {
            return createCompentency(competency)
        })


        const new_project = {
            ...projectDetails,
            createdOn: moment().format(),
            isArchived: false,
            competencies: 0
        }




        admin
            .database()
            .ref(`/Projects/${myId}`)
            .push(new_project)
            .then(snapshot => {
                const id = snapshot.key;

                all_compentencies.forEach(competency => {
                    admin
                        .database()
                        .ref(`/Projects/${myId}/${id}/competencies/${competency.id}`)
                        .set(competency)
                })

                admin
                    .database()
                    .ref(`/Users/${myId}/Projects/${id}`)
                    .set({ projectId: id })
                    .then(() => {
                        return res.json({
                            error: false,
                            message: 'Project Sucessfully Created',
                            project: {
                                id,
                                name: new_project.name,
                                createdOn: new_project.createdOn,
                                userId: new_project.userId,
                            }
                        })
                    })
                    .catch(err => {
                        return res.status(404).json({ error: true, message: `Unable to add Project` })
                    })


            })
            .catch(err => {
                return res.status(404).json({ error: true, message: `Unable to add Project` })
            })
    }
})


// Add More Competency In a Project

exports.addMoreCompetency = functions.https.onRequest((req, res) => {
    if (req.method === "POST") {
        // const competencies = req.body.competencies;
        const competency = req.body.competency
        const projectId = req.body.projectId;
        const myId = req.body.myId;



        // const new_compentencies = competencies.map(competency => {
        //     return createCompentency(competency)
        // })

        const newCompetency = createCompentency(competency)

        admin
            .database()
            .ref(`/Projects/${myId}/${projectId}/competencies/${competency.id}`)
            .set(newCompetency)
            .then(() => {
                return res.json({
                    error: false,
                    message: 'Project Sucessfully Created',
                    competency: newCompetency
                })
            })
            .catch(err => {
                return res.status(404).json({ error: true, message: `Unable to update Project` })
            })

        // new_compentencies.forEach(competency => {
        //     admin
        //         .database()
        //         .ref(`/Projects/${myId}/${projectId}/competencies/${competency.id}`)
        //         .set(competency)
        //         .then(() => { })
        //         .catch(err => {
        //             return res.status(404).json({ error: true, message: `Unable to update Project` })
        //         })
        // })


        // return res.json({
        //     error: false,
        //     message: 'Project Sucessfully Created',
        //     new_compentencies: new_compentencies
        // })






    }
})

exports.delete_competency = functions.https.onRequest((req, res) => {
    if (req.method === "POST") {
        const projectId = req.body.projectId
        const competencyId = req.body.competencyId
        const myId = req.body.myId
        const isMasterProject = req.body.isMasterProject
        const myLQScore = req.body.myLQScore

        if (isMasterProject) {
            admin
                .database()
                .ref(`/Projects/${myId}/${projectId}/competencies/${competencyId}/LQ_Point`)
                .once('value')
                .then(snapshot => {
                    // if (snapshot.val()) {
                        const LQ_Point = snapshot.val();

                        const new_point = myLQScore - (LQ_Point * 5 / 100)
                        // console.log(Math.ceil(myLQScore))
                        // console.log(LQ_Point * 5 / 100);
                        console.log(new_point);


                        admin
                            .database()
                            .ref(`/Users/${myId}/LQ_POINTS`)
                            .set(new_point)
                            .then(() => {

                                admin
                                    .database()
                                    .ref(`/Projects/${myId}/${projectId}/competencies/${competencyId}`)
                                    .remove()
                                    .then(() => {
                                        return res.json({
                                            error: false,
                                            message: 'Competency Deleted',
                                            new_point: new_point
                                        })
                                    })
                                    .catch(err => {
                                        return res.status(404).json({ error: true, message: `Unable to update Project` })
                                    })
                            })

                    // }

                })
        } else {
            admin
                .database()
                .ref(`/Projects/${myId}/${projectId}/competencies/${competencyId}`)
                .remove()
                .then(() => {
                    return res.json({
                        error: false,
                        message: 'Competency Deleted',
                    })
                })
                .catch(err => {
                    return res.status(404).json({ error: true, message: `Unable to update Project` })
                })
        }


    }
})

// Set Progression Level
exports.set_progression_level = functions.https.onRequest((req, res) => {
    if (req.method === "POST") {
        const projectId = req.body.projectId;
        const competencyId = req.body.competencyId
        const myId = req.body.myId


        console.log("project _ id", projectId);
        console.log("competency id", competencyId);


        admin
            .database()
            .ref(`/Projects/${myId}/${projectId}/competencies/${competencyId}`)
            .update({
                current_level: 0
            })
            .then(() => {
                console.log('Request done')

                admin
                    .database()
                    .ref(`/Projects/${myId}/${projectId}`)
                    .once('value')
                    .then(snapshot => {
                        if (snapshot) {
                            let main_competencies = []

                            snapshot.forEach(childSnapshot => {
                                if (childSnapshot.key === 'competencies') {
                                    childSnapshot.forEach(subChild => {
                                        main_competencies.push(subChild.val())
                                    })
                                }
                            })
                            const project = {
                                ...snapshot.val(),
                                competencies: main_competencies,
                                id: snapshot.key
                            }

                            return res.json({
                                error: false,
                                message: 'Progression Level Set',
                                project: project
                            })
                        }
                    })


            })
            .catch(err => {
                console.log("sad")
                return res.status(404).json({ error: true, message: `Unable to find Project` })
            })


        // admin
        //     .database()
        //     .ref(`/Projects/${myId}/${projectId}`)
        //     .once('value')
        //     .then(snapshot => {
        //         if (snapshot) {
        //             let main_competencies = []

        //             // console.log(snapshot.val())
        //             // console.log(snapshot.val().competencies)

        //             snapshot.forEach(childSnapshot => {
        //                 if (childSnapshot.key === 'competencies') {
        //                     childSnapshot.forEach(subChild => {
        //                         main_competencies.push(subChild.val())
        //                     })
        //                 }
        //             })
        //             const project = {
        //                 ...snapshot.val(),
        //                 competencies: main_competencies,
        //                 id: snapshot.key
        //             }

        //             const all_comeptencies = project.competencies.map(competency => {
        //                 if (competency.id === competencyId) {
        //                     return {
        //                         ...competency,
        //                         current_level: 0
        //                     }
        //                     // switch (level) {
        //                     // case 0:
        //                     // return {
        //                     //     ...competency,
        //                     //     current_level: level
        //                     // }
        //                     // case 1:
        //                     //     return {
        //                     //         ...competency,
        //                     //         current_level: level,
        //                     //         Level1: {
        //                     //             ...competency.Level1,
        //                     //             Think: { ...competency.Level1.Think, isCompleted: true, completedOn: moment().format() },
        //                     //             Read: { ...competency.Level1.Read, isCompleted: true, completedOn: moment().format() },
        //                     //             Write: { ...competency.Level1.Write, isCompleted: true, completedOn: moment().format() },
        //                     //             Say: { ...competency.Level1.Say, isCompleted: true, completedOn: moment().format() },
        //                     //             Do: { ...competency.Level1.Do, isCompleted: true, completedOn: moment().format() },
        //                     //             Reflect: { ...competency.Level1.Reflect, isCompleted: true, completedOn: moment().format() },
        //                     //         }
        //                     //     }
        //                     // case 2:
        //                     //     return {
        //                     //         ...competency,
        //                     //         current_level: level,
        //                     //         Level1: {
        //                     //             ...competency.Level1,
        //                     //             Think: { ...competency.Level1.Think, isCompleted: true, completedOn: moment().format() },
        //                     //             Read: { ...competency.Level1.Read, isCompleted: true, completedOn: moment().format() },
        //                     //             Write: { ...competency.Level1.Write, isCompleted: true, completedOn: moment().format() },
        //                     //             Say: { ...competency.Level1.Say, isCompleted: true, completedOn: moment().format() },
        //                     //             Do: { ...competency.Level1.Do, isCompleted: true, completedOn: moment().format() },
        //                     //             Reflect: { ...competency.Level1.Reflect, isCompleted: true, completedOn: moment().format() },
        //                     //         },
        //                     //         Level2: {
        //                     //             ...competency.Level2,
        //                     //             Think: { ...competency.Level2.Think, isCompleted: true, completedOn: moment().format() },
        //                     //             Read: { ...competency.Level2.Read, isCompleted: true, completedOn: moment().format() },
        //                     //             Write: { ...competency.Level2.Write, isCompleted: true, completedOn: moment().format() },
        //                     //             Say: { ...competency.Level2.Say, isCompleted: true, completedOn: moment().format() },
        //                     //             Do: { ...competency.Level2.Do, isCompleted: true, completedOn: moment().format() },
        //                     //             Reflect: { ...competency.Level2.Reflect, isCompleted: true, completedOn: moment().format() },
        //                     //         }
        //                     //     }
        //                     // case 3:
        //                     //     return {
        //                     //         ...competency,
        //                     //         current_level: level,
        //                     //         Level1: {
        //                     //             ...competency.Level1,
        //                     //             Think: { ...competency.Level1.Think, isCompleted: true, completedOn: moment().format() },
        //                     //             Read: { ...competency.Level1.Read, isCompleted: true, completedOn: moment().format() },
        //                     //             Write: { ...competency.Level1.Write, isCompleted: true, completedOn: moment().format() },
        //                     //             Say: { ...competency.Level1.Say, isCompleted: true, completedOn: moment().format() },
        //                     //             Do: { ...competency.Level1.Do, isCompleted: true, completedOn: moment().format() },
        //                     //             Reflect: { ...competency.Level1.Reflect, isCompleted: true, completedOn: moment().format() },
        //                     //         },
        //                     //         Level2: {
        //                     //             ...competency.Level2,
        //                     //             Think: { ...competency.Level2.Think, isCompleted: true, completedOn: moment().format() },
        //                     //             Read: { ...competency.Level2.Read, isCompleted: true, completedOn: moment().format() },
        //                     //             Write: { ...competency.Level2.Write, isCompleted: true, completedOn: moment().format() },
        //                     //             Say: { ...competency.Level2.Say, isCompleted: true, completedOn: moment().format() },
        //                     //             Do: { ...competency.Level2.Do, isCompleted: true, completedOn: moment().format() },
        //                     //             Reflect: { ...competency.Level2.Reflect, isCompleted: true, completedOn: moment().format() },
        //                     //         },
        //                     //         Level3: {
        //                     //             ...competency.Level3,
        //                     //             Think: { ...competency.Level3.Think, isCompleted: true, completedOn: moment().format() },
        //                     //             Read: { ...competency.Level3.Read, isCompleted: true, completedOn: moment().format() },
        //                     //             Write: { ...competency.Level3.Write, isCompleted: true, completedOn: moment().format() },
        //                     //             Say: { ...competency.Level3.Say, isCompleted: true, completedOn: moment().format() },
        //                     //             Do: { ...competency.Level3.Do, isCompleted: true, completedOn: moment().format() },
        //                     //             Reflect: { ...competency.Level3.Reflect, isCompleted: true, completedOn: moment().format() },
        //                     //         }
        //                     //     }
        //                     // case 4:
        //                     //     return {
        //                     //         ...competency,
        //                     //         current_level: level,
        //                     //         Level1: {
        //                     //             ...competency.Level1,
        //                     //             Think: { ...competency.Level1.Think, isCompleted: true, completedOn: moment().format() },
        //                     //             Read: { ...competency.Level1.Read, isCompleted: true, completedOn: moment().format() },
        //                     //             Write: { ...competency.Level1.Write, isCompleted: true, completedOn: moment().format() },
        //                     //             Say: { ...competency.Level1.Say, isCompleted: true, completedOn: moment().format() },
        //                     //             Do: { ...competency.Level1.Do, isCompleted: true, completedOn: moment().format() },
        //                     //             Reflect: { ...competency.Level1.Reflect, isCompleted: true, completedOn: moment().format() },
        //                     //         },
        //                     //         Level2: {
        //                     //             ...competency.Level2,
        //                     //             Think: { ...competency.Level2.Think, isCompleted: true, completedOn: moment().format() },
        //                     //             Read: { ...competency.Level2.Read, isCompleted: true, completedOn: moment().format() },
        //                     //             Write: { ...competency.Level2.Write, isCompleted: true, completedOn: moment().format() },
        //                     //             Say: { ...competency.Level2.Say, isCompleted: true, completedOn: moment().format() },
        //                     //             Do: { ...competency.Level2.Do, isCompleted: true, completedOn: moment().format() },
        //                     //             Reflect: { ...competency.Level2.Reflect, isCompleted: true, completedOn: moment().format() },
        //                     //         },
        //                     //         Level3: {
        //                     //             ...competency.Level3,
        //                     //             Think: { ...competency.Level3.Think, isCompleted: true, completedOn: moment().format() },
        //                     //             Read: { ...competency.Level3.Read, isCompleted: true, completedOn: moment().format() },
        //                     //             Write: { ...competency.Level3.Write, isCompleted: true, completedOn: moment().format() },
        //                     //             Say: { ...competency.Level3.Say, isCompleted: true, completedOn: moment().format() },
        //                     //             Do: { ...competency.Level3.Do, isCompleted: true, completedOn: moment().format() },
        //                     //             Reflect: { ...competency.Level3.Reflect, isCompleted: true, completedOn: moment().format() },
        //                     //         },
        //                     //         Level4: {
        //                     //             ...competency.Level4,
        //                     //             Think: { ...competency.Level4.Think, isCompleted: true, completedOn: moment().format() },
        //                     //             Read: { ...competency.Level4.Read, isCompleted: true, completedOn: moment().format() },
        //                     //             Write: { ...competency.Level4.Write, isCompleted: true, completedOn: moment().format() },
        //                     //             Say: { ...competency.Level4.Say, isCompleted: true, completedOn: moment().format() },
        //                     //             Do: { ...competency.Level4.Do, isCompleted: true, completedOn: moment().format() },
        //                     //             Reflect: { ...competency.Level4.Reflect, isCompleted: true, completedOn: moment().format() },
        //                     //         }
        //                     // }
        //                     // }


        //                 }
        //                 return competency
        //             })


        //             project.competencies = all_comeptencies;

        //             // console.log(project)

        //             admin
        //                 .database()
        //                 .ref(`/Projects/${myId}/${projectId}`)
        //                 .update(project)
        //                 .then(() => {
        //                     return res.json({
        //                         error: false,
        //                         message: 'Progression Level Set',
        //                         project: project
        //                     })
        //                 })
        //         } else {
        //             return res.status(404).json({ error: true, message: `Unable to find Project` })
        //         }
        // })
        // .catch(err => {
        //     return res.status(404).json({ error: true, message: `Unable to find Project` })
        // })
    }
})




// Start Leap in a Project
exports.start_leap_in_project = functions.https.onRequest((req, res) => {
    if (req.method === "POST") {
        const level = req.body.level;
        const activeLevelNumber = req.body.activeLevelNumber;
        const projectId = req.body.projectId;
        const competencyId = req.body.competencyId
        const myId = req.body.myId


        admin
            .database()
            .ref(`/Projects/${myId}/${projectId}/competencies/${competencyId}`)
            .once("value")
            .then(snapshot => {
                if (snapshot) {
                    const competency = snapshot.val()

                    // console.log(competency)

                    switch (activeLevelNumber) {
                        case 0:
                            competency.Level1 = level
                            break;
                        case 1:
                            competency.Level2 = level;
                            break;
                        case 2:
                            competency.Level3 = level
                            break;
                        case 3:
                            competency.Level4 = level
                            break;
                        case 4:
                            competency.Level5 = level
                            break;
                    }

                    admin
                        .database()
                        .ref(`/Projects/${myId}/${projectId}/competencies/${competencyId}`)
                        .set(competency)
                        .then(() => {


                            admin
                                .database()
                                .ref(`/Projects/${myId}/${projectId}`)
                                .once('value')
                                .then(snapshot => {
                                    if (snapshot) {
                                        let main_competencies = []

                                        snapshot.forEach(childSnapshot => {
                                            if (childSnapshot.key === 'competencies') {
                                                childSnapshot.forEach(subChild => {
                                                    main_competencies.push(subChild.val())
                                                })
                                            }
                                        })
                                        const project = {
                                            ...snapshot.val(),
                                            competencies: main_competencies,
                                            id: snapshot.key
                                        }

                                        return res.json({
                                            error: false,
                                            message: 'Progression Level Set',
                                            project: project
                                        })
                                    }
                                })
                                .catch(err => {
                                    return res.status(404).json({ error: true, message: `Unable to find Project` })
                                })
                        })
                }
            })

        // admin
        //     .database()
        //     .ref(`/Projects/${myId}/${projectId}`)
        //     .once('value')
        //     .then(snapshot => {
        //         if (snapshot) {

        //             let main_competencies = []

        //             snapshot.forEach(childSnapshot => {
        //                 if (childSnapshot.key === 'competencies') {
        //                     childSnapshot.forEach(subChild => {
        //                         main_competencies.push(subChild.val())
        //                     })
        //                 }
        //             })
        //             const project = {
        //                 ...snapshot.val(),
        //                 competencies: main_competencies,
        //                 id: snapshot.key
        //             }


        //             const all_comeptencies = project.competencies.map(competency => {
        //                 if (competency.id === competencyId) {
        //                     switch (activeLevelNumber) {
        //                         case 0:
        //                             return {
        //                                 ...competency,
        //                                 Level1: level
        //                             }
        //                         case 1:
        //                             return {
        //                                 ...competency,
        //                                 Level2: level
        //                             }
        //                         case 2:
        //                             return {
        //                                 ...competency,
        //                                 Level3: level
        //                             }
        //                         case 3:
        //                             return {
        //                                 ...competency,
        //                                 Level4: level
        //                             }
        //                         case 4:
        //                             return {
        //                                 ...competency,
        //                                 Level5: level
        //                             }
        //                     }


        //                 }
        //                 return competency
        //             })

        //             project.competencies = all_comeptencies

        //             admin
        //                 .database()
        //                 .ref(`/Projects/${myId}/${projectId}`)
        //                 .update(project)
        //                 .then(() => {
        //                     return res.json({
        //                         error: false,
        //                         message: 'Progression Level Set',
        //                         project: project
        //                     })
        //                 })
        //         } else {
        //             return res.status(404).json({ error: true, message: `Unable to find Project` })
        //         }
        //     })
        //     .catch(err => {
        //         return res.status(404).json({ error: true, message: `Unable to find Project` })
        //     })
    }
})



// End Leap in a Project; 
exports.end_leap_in_project = functions.https.onRequest((req, res) => {
    if (req.method === "POST") {
        const level = req.body.level;
        const activeLevelNumber = req.body.activeLevelNumber;
        const projectId = req.body.projectId;
        const competencyId = req.body.competencyId
        const myId = req.body.myId
        const activeTab = req.body.activeTab
        const isMasterProject = req.body.isMasterProject
        const lq_value = req.body.lq_value;
        const competencyLQPoints = req.body.competencyLQPoints

        // console.log(competencyId);
        // console.log(projectId);
        // console.log(isMasterProject);


        // console.log(isMasterProject)
        // console.log(lq_value)
        // console.log(competencyLQPoints)

        if (isMasterProject) {
            admin
                .database()
                .ref(`/Users/${myId}/LQ_POINTS`)
                .once("value")
                .then(snapshot => {
                    const LQ_POINTS = snapshot.val()
                    // console.log(LQ_POINTS);
                    const NEW_LQ_POINTS = LQ_POINTS + (lq_value * 5 / 100)
                    console.log(NEW_LQ_POINTS);


                    admin
                        .database()
                        .ref(`/Users/${myId}/LQ_POINTS`)
                        .set(NEW_LQ_POINTS)
                        .then(() => {

                        })
                })



        }

        admin
            .database()
            .ref(`/Projects/${myId}/${projectId}/competencies/${competencyId}/LQ_Point`)
            .set(competencyLQPoints + lq_value)
            .then(() => {
                console.log('score updated')
            })

        // Update Comptency Score

        // Set level
        admin
            .database()
            .ref(`/Projects/${myId}/${projectId}/competencies/${competencyId}`)
            .once("value")
            .then(snapshot => {
                if (snapshot) {
                    const competency = snapshot.val()

                    switch (activeLevelNumber) {
                        case 0:
                            if (activeTab === 5) {
                                if (competency.current_level < 4) {
                                    competency.current_level = activeLevelNumber + 1
                                }
                            }
                            competency.Level1 = level
                            break;
                        case 1:
                            if (activeTab === 5) {
                                if (competency.current_level < 4) {
                                    competency.current_level = activeLevelNumber + 1
                                }
                            }
                            competency.Level2 = level
                            break;
                        case 2:
                            if (activeTab === 5) {
                                if (competency.current_level < 4) {
                                    competency.current_level = activeLevelNumber + 1
                                }
                            }
                            competency.Level3 = level
                            break;
                        case 3:
                            if (activeTab === 5) {
                                if (competency.current_level < 4) {
                                    competency.current_level = activeLevelNumber + 1
                                }
                            }
                            competency.Level4 = level;
                            break;
                        case 4:
                            competency.Level5 = level
                            break;

                    }


                    admin
                        .database()
                        .ref(`/Projects/${myId}/${projectId}/competencies/${competencyId}`)
                        .set(competency)
                        .then(() => {


                            admin
                                .database()
                                .ref(`/Projects/${myId}/${projectId}`)
                                .once('value')
                                .then(snapshot => {
                                    if (snapshot) {
                                        let main_competencies = []

                                        snapshot.forEach(childSnapshot => {
                                            if (childSnapshot.key === 'competencies') {
                                                childSnapshot.forEach(subChild => {
                                                    main_competencies.push(subChild.val())
                                                })
                                            }
                                        })
                                        const project = {
                                            ...snapshot.val(),
                                            competencies: main_competencies,
                                            id: snapshot.key
                                        }

                                        return res.json({
                                            error: false,
                                            message: 'Progression Level Set',
                                            project: project
                                        })
                                    }
                                })
                                .catch(err => {
                                    return res.status(404).json({ error: true, message: `Unable to find Project` })
                                })
                        })
                }
            })

        // admin
        //     .database()
        //     .ref(`Projects/${myId}/${projectId}`)
        //     .once('value')
        //     .then(snapshot => {
        //         if (snapshot) {

        //             let main_competencies = []

        //             snapshot.forEach(childSnapshot => {
        //                 if (childSnapshot.key === 'competencies') {
        //                     childSnapshot.forEach(subChild => {
        //                         main_competencies.push(subChild.val())
        //                     })
        //                 }
        //             })
        //             const project = {
        //                 ...snapshot.val(),
        //                 competencies: main_competencies,
        //                 id: snapshot.key
        //             }


        //             const all_comeptencies = project.competencies.map(competency => {
        //                 if (competency.id === competencyId) {
        //                     switch (activeLevelNumber) {
        //                         case 0:
        //                             if (activeTab === 5) {
        //                                 if (competency.current_level < 4) {
        //                                     competency.current_level = activeLevelNumber + 1
        //                                 }
        //                             }
        //                             return {
        //                                 ...competency,
        //                                 Level1: level
        //                             }
        //                         case 1:
        //                             if (activeTab === 5) {
        //                                 if (competency.current_level < 4) {
        //                                     competency.current_level = activeLevelNumber + 1
        //                                 }
        //                             }
        //                             return {
        //                                 ...competency,
        //                                 Level2: level
        //                             }
        //                         case 2:
        //                             if (activeTab === 5) {
        //                                 if (competency.current_level < 4) {
        //                                     competency.current_level = activeLevelNumber + 1
        //                                 }
        //                             }
        //                             return {
        //                                 ...competency,
        //                                 Level3: level
        //                             }
        //                         case 3:
        //                             if (activeTab === 5) {
        //                                 if (competency.current_level < 4) {
        //                                     competency.current_level = activeLevelNumber + 1
        //                                 }
        //                             }
        //                             return {
        //                                 ...competency,
        //                                 Level4: level
        //                             }
        //                         case 4:
        //                             // if (activeTab === 5) {
        //                             //     if (competency.current_level < 4) {
        //                             //         competency.current_level = activeLevelNumber + 1
        //                             //     }
        //                             // }
        //                             return {
        //                                 ...competency,
        //                                 Level5: level
        //                             }

        //                     }


        //                 }
        //                 return competency
        //             })

        //             project.competencies = all_comeptencies

        //             admin
        //                 .database()
        //                 .ref(`/Projects/${myId}/${projectId}`)
        //                 .update(project)
        //                 .then(() => {
        //                     return res.json({
        //                         error: false,
        //                         message: 'Project Updated',
        //                         project: project
        //                     })
        //                 })
        //         } else {
        //             return res.status(404).json({ error: true, message: `Unable to find Project` })
        //         }
        //     })
        //     .catch(err => {
        //         return res.status(404).json({ error: true, message: `Unable to find Project` })
        //     })
    }
})

exports.clear_all_data = functions.https.onRequest((req, res) => {
    admin
        .database()
        .ref(`Projects/`)
        .set(0)
})


exports.fetch_single_project = functions.https.onRequest((req, res) => {
    if (req.method === "GET") {
        const userId = req.query.userId
        const projectId = req.query.id

        admin
            .database()
            .ref(`Projects/${userId}/${projectId}`)
            .once('value')
            .then(snapshot => {
                if (snapshot) {
                    const project = snapshot.val()
                    const new_project = {
                        id: projectId,
                        name: project.name,
                        createdOn: project.createdOn,
                        userId: project.userId,
                        isArchived: project.isArchived,
                        isMasterProject: project.isMasterProject
                    }

                    return res.json({
                        error: false,
                        project: new_project
                    })
                } else {
                    return res.status(404).json({ error: true, message: `Unable to find Project` })
                }
            })
            .catch(err => res.status(404).json({ error: true, message: `Unable to find Project` }))
    }
})


exports.csvJsonReport = functions.https.onRequest((req, res) => {
    const report = req.body.surveyResults;

    const fields = ['id', 'title', 'description', 'selectedAns', 'Selected Ans Index', 'options'];
    const opts = { fields };

    const csv = json2csv(report, opts);

    res.setHeader(
        "Content-disposition",
        "attachment; filename=report.csv"
    )
    res.set("Content-Type", "text/csv")
    res.status(200).send(csv)

})
