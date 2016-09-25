import React from 'react';

import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import Courses from '../components/Courses';

import { getCourses } from '../actions';

class CoursesContainer extends React.Component{
    constructor(props){
        super(props);
    }

    getPageParam(){
        let pageParam = parseInt(this.props.params.pageNum);
        return isNaN(pageParam) ? 1 : pageParam;
    }

    componentWillMount(){
        let pageParam = this.getPageParam();

        this.props.getCourses({
            page:pageParam
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

        if ( prevPageNum != nextPageNum ) {
            this.props.getCourses({
                page: nextPageNum
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
    console.log("to mapStateToProps function");
    return {
        courseList:store.courses.courses,
        totalPages:store.courses.totalPages
    }
}

export default connect(mapStateToProps,{ getCourses })(CoursesContainer);