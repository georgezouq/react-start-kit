'use strict';
var isProduction = process.env.NODE_ENV === "production";
//const DEBUG = !process.argv.includes('--release');

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var sassLoader = ['style-loader', 'css-loader', 'sass-loader'];

var plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV':isProduction ? "production" : `"development"`
    })
];

if(isProduction) {
    styleLoader.shift();

    plugins.push(
        new ExtractTextPlugin("styles.css"),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourceMap: false})
    )
}

// Develop & QA WebService Configuration
let serviceDev = {
    dir:'../dist',
    host:'',
    port:'22',
    username:'root',
    password:'password',
    serverPath:'/www/'
};

// Production WebService COnfiguration
let servicePro = {
    dir:'../dist',
    host:'',
    port:'22',
    username:'root',
    password:'password',
    serverPath:'/www/'
}

module.exports = {
    service: isProduction ? serviceDev : servicePro,
    context:__dirname + "/",
    entry:'./src',
    output:{
        path:path.join(__dirname,'dist'),
        filename:'app.bundle.js'
    },
    module:{
        loaders:[
            {
                test: /\.scss$/,
                loader: isProduction ? ExtractTextPlugin.extract(sassLoader.join("!")) : sassLoader.join("!"),
                include: __dirname + '/src'
            },{
                test:/\.js/,
                loader:'babel',
                query:{
                    presets:['es2015','react','stage-2']
                },
                include:__dirname+'/src'
            },{
                test:/\.(png|jpg)/,
                loader:'file-loader?name=images/[name].[ext]',
                include:__dirname + '/src'
            }
        ]
    },
    resolve: {
        //查找module的话从这里开始查找
        root: __dirname + "/", //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.scss'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {}
    }
}