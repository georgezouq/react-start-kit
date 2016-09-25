"use strict";
let db = require('./pghelper');

let findAll = (req,res,next) => {

    let courseCode = req.query.courseCode;
    let queryByCourseSql = '';
    let page = req.query.page && req.query.page > 0 ? req.query.page : 1;
    let per_page = req.query.per_page && req.query.per_page > 0 ? req.query.per_page : 10;

    let offset  = page * per_page - per_page;

    let params = [];
    params.push(per_page);
    params.push(offset);

    if(courseCode) {
        queryByCourseSql = ` WHERE id in (
            SELECT teacher_id FROM course where code = $3 )`;
        params.push(courseCode);
    }
    let sql = `SELECT * FROM teacher ${queryByCourseSql}
            LIMIT $1
            OFFSET $2            
        `;

    let sqlCount = `SELECT count(1) as i FROM teacher ${queryByCourseSql?queryByCourseSql.replace('$3','$1'):''}`;

    db.query(sql,params).
        then(results =>  db.query(sqlCount,courseCode ? [courseCode]:[]).then(
                count => {
                    console.log()
                    res.json({
                        results,
                        totalPages: Math.ceil((count[0].i / parseInt(per_page)))
                    })
                }
            )
        ).catch(next);


}

exports.findAll = findAll;