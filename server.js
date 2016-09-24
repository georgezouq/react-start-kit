var express = require('express'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    students = require('./server/students'),
    courses = require('./server/courses'),
    app = express();

app.set('port',process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(compression());

//app.use('/',express.static(__dirname+'/www'));

//resolve access control
app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

app.use('/',express.static(__dirname));

app.get('/students',students.findAll);
app.get('/courses',courses.findAll);

app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500).send(err);
});

app.listen(app.get('port'),function(){
    console.log("Express server listening on port " + app.get("port"));
});
