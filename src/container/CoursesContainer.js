import React from 'react';

import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import Courses from '../components/Courses';

import { getCourses,getStudentInfo } from '../actions';

class CoursesContainer extends React.Component{
    constructor(props){
        super(props);
    }

    getPageParam(){
        let pageParam = parseInt(this.props.params.pageNum);
        return isNaN(pageParam) ? 1 : pageParam;
    }

    getStudentId(){
        var studentId = this.props.params.studentId;
        return isNaN(studentId) ? '' : studentId;
    }

    componentWillMount(){
        let pageParam = this.getPageParam();
        let studentId = this.getStudentId();

        if( studentId )
            this.props.getStudentInfo(studentId);

        this.props.getCourses({
            page:pageParam,
            studentId:studentId
        });

    }

    handlePageClick(e){
        let pageNow = e.selected + 1;

        hashHistory.push(`courses/${pageNow}`);
    }


    componentWillReceiveProps(nextProps){
        let prevPageNum = this.getPageParam(),
            nextPageNum = parseInt(nextProps.params.pageNum);
        nextPageNum = isNaN(nextPageNum) ? 1 : nextPageNum;

        let prevStudentId = this.getStudentId(),
            nextStudentId = nextProps.params.studentId;

        if ( prevPageNum != nextPageNum
            || nextStudentId != prevStudentId
        ) {
            this.props.getCourses({
                page: nextPageNum,
                studentId:nextStudentId
            });
        }
    }

    render(){
        return (
            <Courses {...this.props} handlePageClick={this.handlePageClick}/>
        )
    }
}

function mapStateToProps(store){
    return {
        courseList:store.courses.courses,
        totalPages:store.courses.totalPages,
        student:store.students.student
    }
}

export default connect(mapStateToProps,{ getCourses,getStudentInfo })(CoursesContainer);