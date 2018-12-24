Mysql Library for CRUD operations
===================

## How to use
### Get used to it
Get library in your node modules using following command:
```
npm install --save https://github.com/pravindot17/mysqllib
```

Let's see about js code:
```js
let mysqlDb = require('mysqllib');

let config = {
    connection_limit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test',
    port: 3306
}

// init the connection in your bootstrap file using following code
mysqlDb.init(config).then(() => {
    console.log('Mssql connection started successfully');
}).catch(err => {
    throw err;
});

// later you can use the crud functions in following way
mysqlDb.select('SELECT * FROM test WHERE id >= ?', [10]).then((result) => {
    console.log('Got the result', result);
}).catch(err => {
    throw err;
});
```
