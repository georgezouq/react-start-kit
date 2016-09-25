import React from 'react';

class Course extends React.Component{

    constructor(props){
        super(props);

    }

    createMarkup(html){
        return {
            _html:html
        }
    }

    render(){

        let { course } = this.props;
        return (
            <div>
                <h2>Course Detail</h2>
                <div>
                    <dl>
                        <dt>Code:</dt>
                        <dd>{course.code}</dd>
                        <dt>Name:</dt>
                        <dd>{course.name}</dd>
                        <dt>Id:</dt>
                        <dd>{course.id}</dd>
                    </dl>
                </div>
            </div>
        )
    }

};

export default Course;