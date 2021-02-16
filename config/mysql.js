var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'amazon'
});

connection.connect(function(err,res){
    if(err) throw err;
    console.log('database connected!');
})

module.exports = connection;