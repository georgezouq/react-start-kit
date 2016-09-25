import React from 'react';

import { getCourseInfo } from '../actions';
import Course from '../components/Course';
import { connect } from 'react-redux';

class CourseContainer extends React.Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){
        console.log("componentWillMount");
        this.props.getCourseInfo(this.props.params.courseId);
    }

    render(){
        return (
            <Course {...this.props}/>
        );
    }

};

function mapStateToProps(store){

    return {
        course:store.courses.course.result
    }
}

export default connect(mapStateToProps,{ getCourseInfo })(CourseContainer);

