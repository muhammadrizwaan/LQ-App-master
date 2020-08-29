import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


import authReducer from '../reducers/authReducer'
import projectReducer from '../reducers/projectReducer'
import singleProjectReducer from '../reducers/singleProjectReducer'
import archiveProjectReducer from '../reducers/archiveProjectsReducer'
import loaderReducer from '../reducers/loaderReducer'
import competencyFilterReducer from '../reducers/competencyFilterReducer'

const initialState = {}

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            projects: projectReducer,
            single_project: singleProjectReducer,
            loader: loaderReducer,
            archiveProjects: archiveProjectReducer,
            competencyFilter: competencyFilterReducer
        }),
        initialState,
        applyMiddleware(thunk)
    );

    return store
}
