import { GET_STUDENTS } from '../actions';

const defaultState = {
    students:[],
    totalPages:1,
    status:'start'
}

export default function students(state = defaultState,action){

    switch (action.type){
        case GET_STUDENTS:
            return {
                students:action.payload.data.results,
                totalPages:action.payload.data.totalPages
            };

        default:
            return state;
    }
}