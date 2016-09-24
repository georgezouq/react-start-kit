import { GET_COURSES } from '../actions/index';


const defaultState = {
    courses:[],
    totalPages:1,
    status:'start'
}

export default function courses(state = defaultState,action){
    switch(action.type){
        case GET_COURSES:
            return {
                courses:action.payload.data.results,
                totalPages:action.payload.data.totalPages
            };
        default:
            return state;
    }
}