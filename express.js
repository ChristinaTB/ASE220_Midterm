var fs=require('fs');
var path=require('path');
var express=require('express');
var bodyParser=require('body-parser');
var port=5199;
const axios = require('axios');



var app=express();
app.use(express.static(path.join(__dirname,'static_files')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// app.get('/',function(req,res,next){
// 	fs.readFile('index.html',function(err,data){
// 		res.send(data.toString());
// 	});
// });

// app.get('/API',function(req,res,next){
// 	fs.readFile('data/database.json',function(err,data){
// 		res.json(data.toString());
// 	});
// });

// app.post('/API',function(req,res,next){
// 	fs.writeFile('data/'+Math.random().toString(36).substring(8)+'.json',JSON.stringify(req.body),function(err,data){
// 		res.json(req.body);
// 	});
// });

// app.put('/API',function(req,res,next){
// 	fs.writeFile('data/1.json',JSON.stringify(req.body),function(err,data){
// 		res.json(req.body);
// 	});
// });
	
// app.delete('/API',function(req,res,next){
// 	fs.unlink('data/1.json',function(err){
// 		if(err) console.log(err);
// 		res.json({
// 			'status':1,
// 			'message':'file deleted'
// 		})
// 	});
// });

// app.get('/',function(req,res,next){
// 	fs.readFile('index.html',function(err,data){
// 		res.send(data.toString());
// 		res.end();
// 	});
// });
// {
// 	console.log(Date.now());
// 	console.log(res);
// 	next();
// })

// app.get('/', function(req,res,next){
// 	console.log('index');
// 	fs.readFile('index.html', function(err,data){
// 		res.send(data.toString());
// 		res.end();
// 	})

// });


app.get('/index.html',function(req,res,next){
	fs.readFile('index.html',function(err,data){
		res.send(data.toString());
	});
});

app.get('/article.html',function(req,res,next){
	fs.readFile('article.html' ,function(err,data){
		res.send(data.toString());
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


app.get('/API',function(req,res,next){
	fs.readFile('data/database.json',function(err,data){
		res.json(data.toString());
	});
});

app.post('/API',function(req,res,next){
	fs.writeFile('data/'+Math.random().toString(36).substring(8)+'.json',JSON.stringify(req.body),function(err,data){
		res.json(req.body);
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
	
app.listen(port);
module.exports=app;