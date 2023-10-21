const mysql = require('mysql2');

//mysql pingu
const mysqlConnection = mysql.createConnection({
    host: '10.11.33.8',
    user: 'saldbdapp',
    password: 'carpo',
    database: 'SALDBD'

});

mysqlConnection.connect(function (err){
    if(err){
        console.log(err);
        return;
    } else {
        console.log('Db is connected');
    }
});

//mysql tcom
/* const mysqlConnection = mysql.createConnection({
    host: '10.76.20.51',
    user: 'saldbdapp',
    password: 'carpo',
    database: 'SALDBD'

});

mysqlConnection.connect(function (err){
    if(err){
        console.log(err);
        return;
    } else {
        console.log('Db is connected');
    }
}); */

module.exports = mysqlConnection;