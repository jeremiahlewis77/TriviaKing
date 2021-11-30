const mysql = require("mysql");
const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'root',
    database: 'triviaking',
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


