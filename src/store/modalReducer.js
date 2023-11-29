
const defaultState = {
    modal: false
}

const CHANGE = 'CHANGE'

export const modalReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE:
            return {...state, modal: action.payload}
        default:
            return state
    }
} 

export const changeModalAction = (payload) => ({type: 'CHANGE', payload}) 