const mysql = require("mysql");
const db = mysql.createConnection({
    host: 'triviaking-server.database.windows.net',
    port: 1433,
    user: 'triviaking4353',
    password: 'cosc4353triviaking!',
    database: 'TriviaKingDB',
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


