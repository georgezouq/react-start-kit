"use strict";

let db = require('./pghelper');

let findAll = (req,res,next) => {

    let id = req.query.id;

    if( id )
        queryById(id,res,next);
    else
        queryStudents(req,res,next)
}

/**
 * Find Student By Id
 * @param id
 * @param res
 */
let queryById = (id,res,next) => {
    let sql = `SELECT * FROM STUDENT WHERE ID = $1`;
    let params = [id];
    db.query(sql,params)
        .then(result => {
            res.json({
                student:result
            })
        }).
        catch(next);
}

/**
 * Find Student List
 * @param req
 * @param res
 * @param next
 */
let queryStudents = (req,res,next) => {
    let page = req.query.page && req.query.page > 0 ? req.query.page : 1;
    let per_page = req.query.per_page && req.query.per_page > 0 ? req.query.per_page : 10;

    let offset  = (page * per_page - per_page) + 1;
    let params = [];
    let sql;

    sql = `SELECT * FROM student ORDER BY last_update DESC LIMIT $1 OFFSET $2`;
    params.push(per_page);
    params.push(offset);

    db.query(sql,params)
        .then(results => db.query(`SELECT count(1) as i FROM student`).then(
            totalPages => {
                res.json({
                    results,
                    totalPages: Math.ceil((totalPages[0].i / parseInt(per_page)))
                })
            })
        )
        .catch(next);
}

exports.findAll = findAll;