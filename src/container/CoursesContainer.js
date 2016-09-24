import React,{ Component } from 'react';

import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Courses from '../components/Courses';

import { getCourses } from '../actions';

class CoursesContainer extends Component{
    constructor(props){
        super(props);
    }

    getPageParam(){
        let pageParam = parseInt(this.props.params.pageNum);
        return isNaN(pageParam) ? 1 : pageParam;
    }

    componentWillMount(){
        this.props.getCourses({
            page:this.getPageParam()
        })
    }

    handlePageClick(e){
        let pageNow = e.selected + 1;
        console.log('======:'+pageNow);
        browserHistory.push(`/courses/${pageNow}`);
    }

    componentWillReceiveProps(props) {

        let pageNow = this.getPageParam();
        let pageNext = parseInt(props.params.pageNum);

        console.log(pageNow + "  " + pageNext);

        if( !isNaN(pageNext) && pageNow !== pageNext ){
            this.props.getCourses({
                page:this.getPageParam()
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