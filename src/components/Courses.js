import React from 'react';
import { Link } from 'react-router';
import ReactPaginate from 'react-paginate';

export default class Courses extends React.Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){
        
    }

    render(){

        let { courseList,handlePageClick,totalPages,student } = this.props;
        student = student && student[0] ? student[0]: [];

        console.log("courseList:")
        console.log(courseList)

        return (
            <div>
                <h2>{student && student.first_name ? student.first_name + " "+student.last_name + "'s Course List" : "Courses List"}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Course Name</th>
                            <th>Teacher Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {

                        courseList ? courseList.map(course => {
                            return (
                                <tr key={course.id}>
                                    <td>{course.id}</td>
                                    <td>
                                        <Link to={`/course/${course.id}`}>
                                        {course.name}
                                        </Link>
                                    </td>
                                    <td>{course.teacher_name}</td>
                                </tr>
                            );
                        }) : ''
                    }
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
        );
    }
}