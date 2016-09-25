import { GET_STUDENTS,GET_STUDENT } from '../actions';

const defaultState = {
    students:[],
    student:{},
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

        case GET_STUDENT:
            return {
                student:action.payload.data.student
            }

        default:
            return state;
    }
}