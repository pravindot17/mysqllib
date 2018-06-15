/*
    Created by Pravin Lolage on 15 June 2018.
*/
let mysql = require('mysql');
let libMysql = {};

let init = (dbConfig) => {
    return new Promise((resolve, reject) => {

        // set config here for later use
        libMysql.dbConfig = dbConfig;

        if (!libMysql.dbConfig.init) {
            libMysql.conn = null;
            return resolve(false);
        }

        let pool =  mysql.createPool(libMysql.dbConfig.options);

        pool.getConnection((err, client) => {
            if (err) {
                console.error('connection failed with mysql', err.message);
                reject(err);
            } else {
                libMysql.conn = client;
                resolve(true);

                client.on('error', function (err) {
                    console.error('libMysql.init, error connecting mysql:', err.message);
                    libMysql.conn = null;
                });
            }
        });
    });
}

let select = (query, queryParams = []) => {
    return new Promise((resolve, reject) => {
        if (libMysql.conn) {
            libMysql.conn.query(query, queryParams, (err, results, fields) => {
                if(err) {
                    console.error('libMysql.select, failed', err.message);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        } else {
            console.error('libMysql.select, error connecting mysql');
            reject(new Error('Mysql is not connected, please try again later'));
        }
    });
}

let insert = (query, queryParams = []) => {
    return new Promise((resolve, reject) => {
        if (libMysql.conn) {
            libMysql.conn.query(query, queryParams, (err, results, fields) => {
                if(err) {
                    console.error('libMysql.insert, failed', err.message);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        } else {
            console.error('libMysql.insert, error connecting mysql');
            reject(new Error('Mysql is not connected, please try again later'));
        }
    });
}


let update = (query, queryParams = []) => {
    return new Promise((resolve, reject) => {
        if (libMysql.conn) {
            libMysql.conn.query(query, queryParams, (err, results, fields) => {
                if(err) {
                    console.error('libMysql.update, failed', err.message);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        } else {
            console.error('libMysql.update, error connecting mysql');
            reject(new Error('Mysql is not connected, please try again later'));
        }
    });
}

let close = async () => {
    if (libMysql.dbConfig.init) {
        await libMysql.conn.release();
    }
}

module.exports = {
    __init: init,
    __select: select,
    __insert: insert,
    __update: update,
    __close: close
}
