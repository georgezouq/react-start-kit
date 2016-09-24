import { combineReducers } from 'redux';

import students from './students';

import courses from './courses';

const rootReducer = combineReducers({
    students:students,
    courses:courses
});

export default rootReducer;