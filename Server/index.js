const express = require('express');
const app = express();
const cors = require('cors');
const connection=require('./connection');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'chharshadeep@gmail.com',
    pass: '14.ntractiva14'
  }
});

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
		"Select distinct(username), category, max(score) as score from leaderboard group by username, category;",
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

//otp
app.post('/otp',(request,response)=>{
  var otp = Math.floor(100000 + Math.random() * 900000);
  var username= request.body.username;
  var updatequery="update user_otp set otp=? where username=?";
  var insertquery="insert into user_otp values(?,?)";
  connection.query(
		"Select email from user_authenticationd where username=?",[username],
		(err, result) => {
          var id=result[0].email;
          var mailOptions = {
            from: 'kaushikchitipothu5@gmail.com',
            to: id,
            subject: 'TriviaKing: OTP to reset password',
            text: 'The 6 digit one time password is : '+otp
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          })
    })

  connection.query(
		"Select * from user_otp where username=?",[username],
		(err, result) => {
		  if (result.length > 0) {
        console.log(result);
        connection.query(
          updatequery,[otp,username],
          (err, result) => {
            if (err) {
              response.send(err)
            }
            else{
              response.send("success")
            }
			})
    }
    else{
      connection.query(
        insertquery,[username,otp],
        (err, result) => {
          if (err) {
            response.send(err)
          }
          else{
            response.send("success")
          }
    })
    }
    })           
})

app.post("/otp/check",(request,response)=>{
  var username= request.body.username;
  var otp = request.body.otp;
  console.log(username,' ', otp)
  var query="select * from user_otp where username=? and otp=?";
  connection.query(
    query,[username,otp],
    (err, result) => {
      console.log(result)
      if(result.length==1){
        var go = { username: username };
            return response.json(go);
      }
})
})

//password reset
app.post("/reset",(req,res)=>{
  console.log('inside');
  var username = req.body.username;
    var password = req.body.password;
      const sqlReset = `UPDATE user_authenticationd SET password = "${password}" WHERE username = "${username}";`;
      console.log(sqlReset);
      connection.query(sqlReset, (err, result) => {
          var go = { goto: '/' };
            return res.json(go); 
      });
})

app.listen(3002, () => {
    console.log("running on port 3002")
})