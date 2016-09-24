"use strict";

let db = require('./pghelper');

let findAll = (req,res,next) => {

    //let name = req.query.name;
    let page = req.query.page && req.query.page > 0 ? req.query.page : 1;
    let per_page = req.query.per_page && req.query.per_page > 0 ? req.query.per_page : 10;

    let offset  = (page * per_page - per_page) + 1;
    let params = [];
    let sql;

    // if(name){
    //     sql = `
    //         SELECT id,first_name || ' ' || last_name AS name FROM student
    //         WHERE lower(first_name) || ' ' || lower(last_name) LIKE $1 ORDER BY LASTNAME,
    //         first_name LIMIT ${per_page} OFFSET ${offset}
    //     `;
    //     params.push("%" + name.toLowerCase() + "%");
    //} else {
    sql = `SELECT * FROM student ORDER BY last_update DESC LIMIT $1 OFFSET $2`;
    params.push(per_page);
    params.push(offset);
    //}
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