export const setArchiveProject = (project) => ({
    type: 'SET_ARCHIVE_PROJECT',
    project
})

export const removeArchiveProject = (id) => ({
    type: 'REMOVE_ARCHIVE_PROJECT',
    id
})

export const clearArchiveProjects = () => ({
    type: 'CLEAR_ARCHIVE_PROJECTS'
})