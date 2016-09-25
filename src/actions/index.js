import * as Urls from '../urls';

import axios from 'axios';

export const GET_STUDENTS = "GET_STUDENTS";
export const GET_COURSES = "GET_COURSES";
export const GET_STUDENT = "GET_STUDENT";


let defaultQuery = {
    page:1,
    per_page:10
}

export function getStudentInfo(id){
    let params = {id:id};
    let request = axios.get(Urls.STUDENTS_URL,{
        params
    });
    return {
        type:GET_STUDENT,
        payload:request
    }
}

export function getStudents(query = defaultQuery){

    let params = {...defaultQuery,...query};

    let request = axios.get(Urls.STUDENTS_URL,{
        params:params
    });
    
    return {
        type:GET_STUDENTS,
        payload:request
    }
}

export function getCourses(query = defaultQuery){

    let params = {...defaultQuery,...query};
    
    let request = axios.get(Urls.COURSES_URL,{
        params
    });

    return {
        type:GET_COURSES,
        payload:request
    }
}

