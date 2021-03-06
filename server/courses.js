"use strict";

let db = require('./pghelper');

let findAll = (req,res,next) => {

    let id = req.query.id;

    if( id )
        findCourse(id,res,next);
    else
        findCourses(req,res,next);

};

/**
 * Find course list
 * @param req
 * @param res
 * @param next
 */
let findCourses = (req,res,next) => {
    let studentId = req.query.studentId;

    let page = req.query.page && req.query.page > 0 ? req.query.page : 1;
    let per_page = req.query.per_page && req.query.per_page > 0 ? req.query.per_page : 10;

    let offset  = page * per_page - per_page;

    let params = [];
    let sql,sqlNum;

    let ifStudentId = studentId ? ' WHERE en.student_id = $3 ': '';

    sql = `SELECT DISTINCT cou.*,concat(tc.first_name,' ',tc.last_name) as teacher_name
        FROM course cou 
        LEFT JOIN enrollment en on cou.id = en.course_id 
        LEFT JOIN teacher tc on cou.teacher_id = tc.id 
        ${ifStudentId}
        ORDER BY cou.id  DESC LIMIT $1 OFFSET $2`;

    sqlNum = `SELECT distinct count(1) as i 
        FROM course cou 
        ${ifStudentId ?
    "LEFT JOIN enrollment en on cou.id = en.course_id " +
    ifStudentId.replace('$3','$1') : ''}
        `;

    params.push(per_page);
    params.push(offset);

    if(ifStudentId)
        params.push(studentId)

    db.query(sql,params)
        .then(results =>
            db.query(sqlNum,(studentId ? [studentId] : [])).then(
                totalPages => {

                    res.json({
                        results,
                        totalPages: Math.ceil((totalPages[0].i / parseInt(per_page)))
                    })
                }
            )
        )
        .catch(next);
};


let findCourse = (id,res,next) => {
    let sql = `select * from course where id = $1`;

    db.query(sql,[id])
        .then(result => {
            res.json({
                result
            })
        })
        .catch(next);
};
exports.findAll = findAll;



