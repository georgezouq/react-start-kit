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

const store = configureStore();

import './sass/style.scss';

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={StudentsContainer}/>
                <Route path="/students(/:pageNum)(/:filterName)" component={StudentsContainer}/>
                <Route path="/courses(/:pageNum)(/:studentId)" component={CoursesContainer}/>


            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);