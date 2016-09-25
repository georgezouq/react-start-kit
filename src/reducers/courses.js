import { GET_COURSES,GET_COURSE } from '../actions/index';


const defaultState = {
    courses:{
        courses:[],
        totalPages:1,
        status:'start'
    },
    course:{
        data:{
            id:-1,
            name:'',
            credits:0,
            period_id:-1,
            teacher_id:-1
        }
    }
}


export default function courses(state = defaultState,action){
    switch(action.type){
        case GET_COURSES:
            return {
                ...state.courses,
                courses: {
                    courses: action.payload.data.results,
                    totalPages: action.payload.data.totalPages
                }
            };
        case GET_COURSE:
            return {
                ...state.course,
                course:{
                    data:action.payload[0]
                }
            }
        default:
            return state;
    }
}