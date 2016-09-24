import React,{Component} from 'react';

import { Link } from 'react-router';


export default class Header extends Component {
    
    constructor(props){
        super(props);
    }

    render(){
        return (
            <header className="header">
                <div className="content">
                    <h2>This is header</h2>
                    <ul>
                        <li>
                            <Link to="/students">Students</Link>
                        </li>
                        <li>
                            <Link to="/courses">Courses</Link>
                        </li>
                    </ul>
                </div>
                <div className="clearfix"></div>
            </header>
        )
    }
}