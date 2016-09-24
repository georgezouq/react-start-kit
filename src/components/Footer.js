import React,{ Component } from 'react';

export default class Footer extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <footer>
                <h6 className="copyright">Copyright 2016-2020 GeorgeZou</h6>
            </footer>
        )
    }
}