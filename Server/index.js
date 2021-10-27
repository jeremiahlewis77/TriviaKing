const express = require('express');
const app = express();
const cors = require('cors');
const connection=require('./connection');
const jwt = require('jsonwebtoken');

app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    })
  );
  app.use(express.json());

//User login authentication.
app.post('/auth/user', (request, response) =>{
    const username = request.body.username;
    const password = request.body.password;
    connection.query(
        "SELECT * FROM user_authenticationd WHERE username = ? and password = ?",
        [username,password],
        (err, result) => {
          console.log(result);
          if (err) {
            response.send({ err: err });
        }
        if (result.length > 0) {   
            const user = result[0].username;
            const token = jwt.sign({user}, 'secure');
            console.log("token"+token);
            response.json({auth: true, token: token, result: result})                     
          } else {
              response.send({ auth: false, message: "Invalid details!" });
          }
    });
});

// Registering user details in database.   
app.post('/register', (request,response)=>{
    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;

    connection.query(
        "INSERT INTO user_authenticationd(username,password,email) VALUES (?,?,?)",
        [username,password,email],
            (err,result) => {
            if(err)
            {
                response.send(err)
                response.end()
            }
            else{
                response.send(result);
                response.end()
            }
        })
});

//retrieving questions from database
app.get('/Questions/:id',(request,response)=>{
	var data=[]
	var questionCategory=request.params.id
    var query="select question,option1,option2,option3,option4,correct  from questions_"+questionCategory;
    
	connection.query(
		query,
		(err, result) => {
		  if (result.length > 0) {
			  console.log(result)
			result.map((r)=>{
				data.push(r)
			})
		}
		return response.json(JSON.stringify(data))
	})
 })

 //saving the scores in database.
 app.post('/leaderboard',(request,response)=>{
	var score=request.body.score;
	var username=request.body.username;
    var category=request.body.category;
    var query="insert into leaderboard values(?,?,?)";
	connection.query(
		query,[username,score,category],
		(err, result) => {
		  if (err) {
			  response.send(err)
			}
            
		})
 })

 //retrieving the leaderboard.
 app.get('/leaderboard',(request,response)=>{
     data=[]
	connection.query(
		"select username,category,score  from leaderboard",
		(err, result) => {
		  if (result.length > 0) {
			  console.log(result)
			result.map((r)=>{
				data.push(r)
			})
		}
		return response.json(JSON.stringify(data))
 })
})

app.listen(3002, () => {
    console.log("running on port 3002")
})