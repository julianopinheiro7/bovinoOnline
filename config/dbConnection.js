const mysql = require('mysql');

const connMySQL = function () {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'BovinoOnline'
    });
}

module.exports = function() {
    return connMySQL;
}