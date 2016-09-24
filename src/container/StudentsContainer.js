import React,{ Component } from 'react';

import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { getStudents } from '../actions';
import Students from '../components/Students';

class StudentsContainer extends Component{
    constructor(props){
        super(props);
        //this.handlePageClick = this.handlePageClick.bind(this);
    }

    getPageParam(){
        let pageParam = parseInt(this.props.params.pageNum);
        return isNaN(pageParam) ? 1 : pageParam;
    }

    componentWillMount(){
        this.props.getStudents({
            page:this.getPageParam()
        });
    }

    componentWillReceiveProps(props) {
        console.log("come to componentWillReceiveProps");

        let pageNow = this.getPageParam();
        let pageNext = parseInt(props.params.pageNum);

        console.log(pageNow + "  " + pageNext);

        if( !isNaN(pageNext) && pageNow !== pageNext ){
            this.props.getStudents({
                page:this.getPageParam()
            });
        }
    }

    handlePageClick(e){
        let pageNow = e.selected + 1;
        browserHistory.push(`/students/${pageNow}`)
        //location.hash = `students/${pageNow}`
    }

    render(){
        return (
            <Students {...this.props} handlePageClick={this.handlePageClick}/>
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