var fs=require('fs');
var path=require('path');
var express=require('express');
var session=require('express-session');
var bodyParser=require('body-parser');
var port=5199;
const axios = require('axios');

var app=express();
app.use(express.static(path.join(__dirname,'static_files')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({secret:'my password'}));

function checkIfUserIsSignedIn(req,res,next){
	console.log(req.session.user);
	if(req.session.user){
		next();
	}else{
		res.send('not signed in');
		return;
	}
}

function checkIfUserIsAdmin(req,res,next){
	if(req.session.user.role==1) next();
	else{
		res.send('you are not allowed here');
		return;
	}
}

app.get('/',function(req,res,next){
	fs.readFile('index.html',function(err,data){
		res.send(data.toString());
	});
});

app.get('/article.html',function(req,res,next){
	fs.readFile('article.html',function(err,data){
		res.send(data.toString());
	});
});

app.get('/register.html',function(req,res,next){
	fs.readFile('register.html',function(err,data){
		res.send(data.toString());
	});
});

app.get('/private',checkIfUserIsSignedIn,function(req,res,next){
	fs.readFile('private.html',function(err,data){
		res.send(data.toString());
	});
});

app.get('/admin',checkIfUserIsSignedIn,checkIfUserIsAdmin,function(req,res,next){
	fs.readFile('admin/index.html',function(err,data){
		res.send(data.toString());
	});
});


app.get('/edit.html',checkIfUserIsSignedIn,checkIfUserIsAdmin,function(req,res,next){
	fs.readFile('admin/edit.html',function(err,data){
		res.send(data.toString());
	});
});


app.get('/create.html',checkIfUserIsSignedIn,checkIfUserIsAdmin,function(req,res,next){
	fs.readFile('admin/create.html',function(err,data){
		res.send(data.toString());
	});
});

app.get('/signin',function(req,res,next){
	fs.readFile('signin.html',function(err,data){
		res.send(data.toString());
	});
});

app.get('auth/API/signin',function(req,res,next){
	fs.readFile('signin.html',function(err,data){
		res.send(data.toString());
	});
});

app.get('/auth/signout',function(req,res,next){
	req.session.user=null;
	res.send('signed out');
});

app.post('/auth/API/signin',function(req,res,next){
	console.log(req.body);
	fs.readFile('data/users.json',function(err,data){
		let users=JSON.parse(data.toString());
		for(let i=0;i<users.length;i++){
			if(users[i].email==req.body.email && users[i].password==req.body.password){
				req.session.user={
					ID:i,
					firstname:users[i].firstname,
					lastname:users[i].lastname,
					role:users[i].role					
				}
				res.json({'status':1,'message':'authentication is successful'});
	
				return;
			}	
		}
		res.json({status:-1,message:'authentication is unsuccessful'});
		return;
	});
});

app.get('/API/users',function(req,res,next){
	fs.readFile('data/users.json',function(err,data){
		res.json(JSON.parse(data.toString()));
		return;
	});
});

app.post('/API/users',function(req,res,next){
	fs.readFile('data/users.json',function(err,data){
		users=JSON.parse(data.toString());
		users.push(req.body);
		// Verify if user is in database
		//console.log(users);
		fs.writeFile('data/users.json',JSON.stringify(users),function(err,data){
			res.json(users);
		});
	});
});

app.put('/API',function(req,res,next){
	fs.writeFile('data/1.json',JSON.stringify(req.body),function(err,data){
		res.json(req.body);
	});
});
	
app.delete('/API',function(req,res,next){
	fs.unlink('data/1.json',function(err){
		if(err) console.log(err);
		res.json({
			'status':1,
			'message':'file deleted'
		})
	});
});

app.get('/API',function(req,res, next){
	axios.get('https://jsonblob.com/api/jsonBlob/2c155f5d-7afb-11eb-8dd6-6f7957243c71').then(response =>{
				 res.json(response.data);
			 });
	
	});
	
	app.post('/API',function(req,res, next){
		axios.get('https://jsonblob.com/api/jsonBlob/2c155f5d-7afb-11eb-8dd6-6f7957243c71').then(response =>{
					 res.json(response.data.location);
				 });
		
				});
	
	
			
	app.put('/API',function(req,res, next){
		axios.get('https://jsonblob.com/api/jsonBlob/2c155f5d-7afb-11eb-8dd6-6f7957243c71').then(response =>{
						 res.json(response.data);
					 });
			
			});
	app.delete('/API',function(req,res, next){
		axios.get('https://jsonblob.com/api/jsonBlob/2c155f5d-7afb-11eb-8dd6-6f7957243c71').then(response =>{ res.json(response.data);
						 });
				
				});

				

	
app.listen(port);
module.exports=app;