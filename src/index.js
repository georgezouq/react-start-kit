/**
 * Created by georgezou on 16/9/16.
 */
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

import configureStore from './store/configureStore';

import Main from './components/Main';
import StudentsContainer from './container/StudentsContainer';
import CoursesContainer from './container/CoursesContainer';
import CourseContainer from './container/CourseContainer';

const store = configureStore();

import './sass/style.scss';

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={StudentsContainer}/>
                <Route path="/students(/:pageNum)(/:filterName)" component={StudentsContainer}/>
                <Route path="/courses(/:pageNum)(/:studentId)" component={CoursesContainer}/>
                <Route path="/course/(:courseId)" component={CourseContainer}/>


            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);