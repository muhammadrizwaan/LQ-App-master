const defaultState = {
    isSettingLevelLoading: false,
    isProjectLoading: true,
    isEditedMode: false
}

export default (state = defaultState, action) => {
    switch(action.type) {
        case 'START_SETTING_LEVEL_LOADING':
            return {...state, isSettingLevelLoading: true}
        case 'STOP_SETTING_LEVEL_LOADING':
            return {...state, isSettingLevelLoading: false}
        case 'START_PROJECT_LOADER':
            return {...state, isProjectLoading: true}
        case 'STOP_PROJECT_LOADER':
            return {...state, isProjectLoading: false}
        case 'START_EDIT_MODE':
            return { ...state, isEditedMode: true }
        case 'STOP_EDIT_MODE':
            return { ...state, isEditedMode: false }
        default:
            return state
    }
}