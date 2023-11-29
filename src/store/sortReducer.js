const defaultState = { sort: "date" };


const SET_SORT = 'SET_SORT'

export const sortReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_SORT:
            return {...state, sort: action.payload}
        default:
            return state
    }
} 

export const setSortAction = (payload) => ({type: 'SET_SORT', payload})