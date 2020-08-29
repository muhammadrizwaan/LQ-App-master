const initialState = [];


export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ARCHIVE_PROJECT':
            let new_projects = [action.project, ...state];

            new_projects = new_projects.sort((a, b) => {
                return a.createdOn < b.createdOn ? 1 : -1
            })

            return new_projects
        case 'CLEAR_ARCHIVE_PROJECTS':
            return initialState;
        case 'REMOVE_ARCHIVE_PROJECT':
            const upd_projects = state.filter(project => project.id !== action.id)

            return upd_projects
        default:
            return state
    }
}