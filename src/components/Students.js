import React,{ Component,Children } from 'react';

import ReactPaginate from 'react-paginate';
import { Link } from 'react-router';

import moment from 'moment';

export default class Students extends Component {
    constructor(props){
        super(props);
    }

    createMarkup(html){
        return {__html:html};
    }

    //组件安装前执行
    componentWillMount(){
    }

    render(){
        let _this = this;
        let {studentList,totalPages,handlePageClick} = this.props;

        return (
            <div>
                <h2>This is post page</h2>
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

                        {studentList.map( student => {
                            return (
                                <tr className="studentList" key={student.id}>
                                    <td>
                                        <a href="">
                                            {student.first_name + ' ' + student.last_name}
                                        </a>
                                    </td>
                                    <td dangerouslySetInnerHTML={_this.createMarkup(student.address)}></td>
                                    <td>{student.city}</td>
                                    <td>{student.state}</td>
                                    <td>{moment(student.dob).format('YYYY-MM-DD')}</td>
                                    <td>
                                        <Link to={`/${student.id}`} key={student.id}>
                                            Courses List
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
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


