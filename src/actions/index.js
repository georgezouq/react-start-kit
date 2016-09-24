import * as Urls from '../urls';

import axios from 'axios';

export const GET_STUDENTS = "GET_STUDENTS";
export const GET_COURSES = "GET_COURSES";



let defaultQuery = {
    page:1,
    per_page:10
}

export function getStudents(query = defaultQuery){

    let params = {...defaultQuery,...query};

    let request = axios.get(Urls.STUDENTS_URLS,{
        params:params
    });
    
    return {
        type:GET_STUDENTS,
        payload:request
    }
}

export function getCourses(query = defaultQuery){
    console.log("to getCourses function");
    let params = {...defaultQuery,...query};
    
    let request = axios.get(Urls.COURSES_URLS,{
        params
    });

    return {
        type:GET_COURSES,
        payload:request
    }
}

