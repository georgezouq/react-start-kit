import React from 'react';


class Teachers extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let { teacherList }  = this.props;

        return (
            <div>
                <h2>Teacher List</h2>
                <div>
                    <table>
                        <thead>
                        <th>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Phone</td>
                            <td>Address</td>
                        </th>
                        </thead>
                        <tbody>
                        {
                            teacherList.map(teacher => {
                                return (
                                    <tr>
                                        <td>{teacher.id}</td>
                                        <td>{teacher.name}</td>
                                        <td>{teacher.phone}</td>
                                        <td>{teacher.address}</td>
                                    </tr>
                                )
                            })
                        }

                        </tbody>

                    </table>

                </div>
            </div>
        )
    }
}

export default Teachers;