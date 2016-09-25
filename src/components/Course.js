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
        return (
            <div>
                <h2>Course Detail</h2>

            </div>
        )
    }

};

export default Course;