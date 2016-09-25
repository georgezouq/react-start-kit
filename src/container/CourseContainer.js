import React from 'react';

import { getCourseInfo } from '../actions';
import Course from '../components/Course';
import { connect } from 'react-redux';

class CourseContainer extends React.Component{

    constructor(props){
        super(props);
    }
    render(){
        return (
            <Course />
        );
    }

};

function mapStateToProps(store){

    c
    return {
        course:store.course.data
    }
}

export default connect(mapStateToProps,{ getCourseInfo })(CourseContainer);

