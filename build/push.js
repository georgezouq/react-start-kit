import webpackConfig from '../webpack.config';

let defaultConfig = {
    dir:'../dist',
    host:'10.',
    port:'22',
    username:'root',
    password:'password',
    serverPath:'/www/'
};

function push(){
    let config = {...defaultConfig,...webpackConfig.service};
    let client = require('scp2');

    let path = `${config.username}:${config.password}@${config.host}:${config.port}:${config.serverPath}`;

    client(config.dir,path,err => {

    })
    
    
}

export default push;