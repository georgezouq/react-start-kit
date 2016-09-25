import React from 'react';

import { connect } from 'react-redux';
import { getTeachers } from '../actions';
import { Teachers } from '../components/Teachers';

class TeacherContainer extends React.Component{
    constructor(props){
        super(props);

    }

    getPageParam(){
        let page = parseInt(this.props.params.pageNum);
        return isNaN(pagfe) ? 1 : page;
    }

    getCourseCode(){
        let courseCode = this.props.params.courseCode;
        return courseCode;
    }

    componentWillMount(){
        let courseCode = this.getCourseCode();
        let page = this.getPageParam();

        this.props.getTeachers({
            courseCode,
            page
        })
    }

    componentWillReceiveProps(props){
        let courseCodeNow = this.getCourseCode(),
            courseCodeNext = props.params.courseCode;

        let pageNow = this.getPageParam(),
            pageNext = parseInt(props.params.pageNum);

        if( pageNow != pageNext
            || courseCodeNow != courseCodeNext){

        }
    }

    render(){
        return (
            <Teachers {...this.props} />
        )
    }
}

function mapStateToProps(store){

    return {
        teachers:store.teachers.teachers
    }
}

export default connect(mapStateToProps,{ getTeachers })(TeacherContainer);
