var express = require('express');
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "node"
});



var router = express.Router();


/* GET form page. */
router.get('/', function(req, res, next) {

  	var user = req.param("user");
  	console.log('data for :'+user);

  	if(user=="all"){
	  	con.query('SELECT * FROM user',function(err,rows){
		  if(err) throw err;

		  console.log('Data received from Db:\n');
		  //console.log(rows);
		  res.setHeader('Content-Type', 'application/json');
		  res.json(rows);
		});
  	}else{
  		con.query("SELECT * FROM user WHERE `slno`='"+user+"'",function(err,rows){
		  res.setHeader('Content-Type', 'application/json');
		  res.json(rows);
		});
  	}

});



router.post('/', function(req, res, next) {

	if(req.body._method=="PUT"){



		var username = req.body.username;
    	var email = req.body.email;
    	var slno = req.body.slno;
    
	    con.query("SELECT * FROM `user` WHERE `email`='"+email+"' AND `slno`!='"+slno+"'",function(err,rows){

		  	//console.log("adasd"+rows.length);
		  	if(rows.length>0){
		  		res.send('0');
		  	}else{
			  	con.query("UPDATE `user` SET `username`='"+username+"',`email`='"+email+"' WHERE `slno`='"+slno+"'",function(err,rows){

			  		res.send('1');

		    	});
		  	}

	    });

	
	}else{

		var username = req.body.username;
    	var email = req.body.email;
    
    
	    con.query("SELECT * FROM `user` WHERE `email`='"+email+"'",function(err,rows){

		  	//console.log("adasd"+rows.length);
		  	if(rows.length>0){
		  		res.send('0');
		  	}else{
			  	con.query("INSERT INTO `user`(`username`, `email`) VALUES ('"+username+"','"+email+"')",function(err,rows){

			  		res.send('1');

		    	});
		  	}

	    });


	}

    
});

router.delete('/', function(req, res, next) {
	var slno = req.body.slno;

    con.query("DELETE FROM `user` WHERE `slno`='"+slno+"'",function(err,rows){

	  	res.send('1');

    });
});




module.exports = router;
