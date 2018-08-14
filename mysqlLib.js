/*
    Created by Pravin Lolage on 15 June 2018.
*/
let mysql = require('mysql');
let libMysql = {};

module.exports = {
    __init: init,
    __select: select,
    __insert: insert,
    __update: update,
    __getPoolConnection: getPoolConnection,
    __poolQuery: poolQuery,
    __close: close
}

function init(dbConfig) {
    return new Promise((resolve, reject) => {

        // set config here for later use
        libMysql.dbConfig = dbConfig;

        if(!libMysql.conn) {
            let pool =  mysql.createPool(libMysql.dbConfig);
            libMysql.conn = pool;
            pool.getConnection((err, client) => {
                if (err) {
                    console.error('connection failed with mysql', err.message);
                    reject(err);
                } else {
                    client.release();
                    resolve(true);
                }
            });
        } else {
            resolve(null);
        }
    });
}

function select(query, queryParams = []) {
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

function insert(query, queryParams = []) {
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


function update(query, queryParams = []) {
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

async function close() {
    if (libMysql.dbConfig.init) {
        await libMysql.conn.end();
    }
}

function getPoolConnection() {
    return new Promise((resolve, reject) => {
        if (libMysql.conn) {
            libMysql.conn.getConnection((err, client) => {
                if(err) {
                    console.error('libMysql.getPoolConnection, failed', err.message);
                    reject(err);
                } else {
                    resolve(client);
                }
            });
        } else {
            console.error('libMysql.getPoolConnection, error connecting mysql');
            reject(new Error('Mysql is not connected, please try again later'));
        }
    });
}

function poolQuery(pool, query, queryParams = []) {
    return new Promise((resolve, reject) => {
        pool.query(query, queryParams, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
