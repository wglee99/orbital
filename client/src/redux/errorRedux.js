// types
export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

// error actions
// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id }
    }
}

// CLEAR ERRORS
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}

// error reducers
const initialState = {
    msg: {},
    status: null,
    id: null
}

export const errorReducer = (state=initialState, action) => {
    switch(action.type){
        case GET_ERRORS:
            return{
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            };
        
        case CLEAR_ERRORS:
            return{
                msg: {},
                status: null,
                id: null
            };
            
        default:
            return state;
    }
}