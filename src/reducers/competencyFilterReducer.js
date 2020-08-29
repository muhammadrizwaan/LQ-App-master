const sampleFilter = {
    text: ''
}

export default (state = sampleFilter, action) => {
    switch(action.type) {
        case 'SET_NAME_FILTER':
            return {...state, text: action.text}
        case 'CLEAR_NAME_FILTER':
            return {...state, text: ''}
        default:
            return state
    }
}