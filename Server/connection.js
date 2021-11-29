const mysql = require("mysql");
const db = mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
   });
   
   db.connect(function(err){
       if(err){
       console.log('DB error');
       throw err;
       }
       else{
           console.log('Connected');
       }
   });

module.exports=db


