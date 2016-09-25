import React,{ Component,Children } from 'react';

import ReactPaginate from 'react-paginate';
import { Link,hashHistory } from 'react-router';

import moment from 'moment';

export default class Students extends Component {
    constructor(props){
        super(props);

        this.state = {
            filterName:''
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    createMarkup(html){
        return {__html:html};
    }

    //组件安装前执行
    componentWillMount(){
    }

    handleSearch(e){
        e.preventDefault();
        let filterName = this.state.filterName;
        if(filterName)
            hashHistory.push(`/students/1/${filterName}`);
    }

    handleSearchChange(e){
        this.setState({
            filterName:e.target.value
        })
    }

    render(){
        let _this = this;
        let {studentList,totalPages,handlePageClick,getFilterNameParam} = this.props;

        return (
            <div className="student-list">
                <h2 className="title">
                    {
                        (() =>{
                            let filterName = getFilterNameParam();
                            if( filterName ){
                                return `"${filterName}" Search Result`;
                            }else{
                                return "Student List";
                            }
                        })()
                    }
                    </h2>
                <section className="student-search-container">
                    <form role="search" method="get"
                          onSubmit={this.handleSearch}>
                        <label>按姓名搜索:</label>
                        <input type="text" name="" onChange={this.handleSearchChange}/>
                        <button type="submit">搜索</button>
                        <button type="reset">重置</button>
                    </form>
                </section>
                <div className="content">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Birthday</th>
                                <th>Courses</th>
                            </tr>
                        </thead>
                        <tbody>

                        {studentList ? studentList.map( student => {

                            return (
                                <tr className="studentList" key={student.id}>
                                    <td>
                                        <Link to={`/courses/1/${student.id}`}>
                                            {student.first_name + ' ' + student.last_name}
                                        </Link>
                                    </td>
                                    <td dangerouslySetInnerHTML={_this.createMarkup(student.address)}></td>
                                    <td>{student.city}</td>
                                    <td>{student.state}</td>
                                    <td>{moment(student.dob).format('YYYY-MM-DD')}</td>
                                    <td>
                                        <Link to={`/courses/1/${student.id}`} key={student.id}>
                                            Courses List
                                        </Link>
                                    </td>
                                </tr>
                            );
                        }) : ''}
                        </tbody>
                    </table>
                    <div>
                        <ReactPaginate previousLabel={"previous"}
                                        nextLabel={"next"}
                                        breakLabel={<a href="">...</a>}
                                        pageNum={totalPages}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        clickCallback={handlePageClick}
                                        containerClassName={"pagination"}
                                        subContainerClassName={"pages pagination"}
                                        activeClassName={"active"}/>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        )
    }
}


