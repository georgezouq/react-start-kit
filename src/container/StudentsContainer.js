import React,{ Component } from 'react';

import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { getStudents } from '../actions';
import Students from '../components/Students';

class StudentsContainer extends Component{
    constructor(props){
        super(props);
        //this.handlePageClick = this.handlePageClick.bind(this);
        this.getFilterNameParam = this.getFilterNameParam.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.getPageParam = this.getPageParam.bind(this);
    }

    getPageParam(){
        let pageParam = parseInt(this.props.params.pageNum);
        return isNaN(pageParam) ? 1 : pageParam;

    }

    componentWillMount(){
        let page = this.getPageParam();
        let filterName = this.getFilterNameParam();

        if(filterName) {
            this.props.getStudents({
                page,
                filterName
            });
        }else{
            this.props.getStudents({
                page
            });
        }
    }

    componentWillReceiveProps(props) {
        let pageNow = this.getPageParam(),
            pageNext = parseInt(props.params.pageNum);
        pageNext = isNaN(pageNext) ? 1 : pageNext;

        let filterNameNow = this.getFilterNameParam(),
            filterNameNext = props.params.filterName;

        if( (!isNaN(pageNext) && pageNow !== pageNext)
            || (filterNameNow !== filterNameNext)){
            this.props.getStudents({
                page:pageNext,
                filterName:filterNameNext
            });
        }
    }

    handlePageClick(e){
        let pageNow = e.selected + 1;
        let filterName = this.getFilterNameParam();
        if( filterName )
            hashHistory.push(`/students/${pageNow}/${filterName}/`);
        else
            hashHistory.push(`/students/${pageNow}`);
    }

    getFilterNameParam(){
        let filterNameParams = this.props.params.filterName;
        
        return filterNameParams;
    }

    render(){
        return (
            <Students {...this.props}
                handlePageClick={this.handlePageClick}
                getPageParam={this.getPageParam}
                getFilterNameParam={this.getFilterNameParam}
            />
        )
    }
}


function mapStateToProps(store){
    return {
        studentList:store.students.students,
        totalPages:store.students.totalPages
    }
}

/**
 * @Params:
 *      1.映射store中的数据到组件
 *      2.映射action方法到组件
 *
 * { getStudents } == { getStudents:getStudents }
 */
export default connect(mapStateToProps,{ getStudents })(StudentsContainer);