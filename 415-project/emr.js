var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//start database i think
var MongoClient = require('mongodb').MongoClient;
//database client
var mongourl = "mongodb+srv://Beavis:Butthead@cluster0-cgukm.mongodb.net/mydb";

// MongoClient.connect(mongourl, function(err, db){
	// if(err) throw err;
	// var dbo = db.db("mydb");	
	// dbo.collection("customers").drop(function(err, delOK){
		// if(err) throw err;
		// db.close();
	// });
	// dbo.createCollection("emrslock");	
// });


//API GET for Mongo
app.get('/api/emr', function(req, res) {
	MongoClient.connect(mongourl, function(err, db){
		if(err) throw err;
		var dbo = db.db("mydb");
		dbo.collection("emrs").find({},{fields:{_id:0}}).toArray(function(err, result){
			if(err) throw err;
			console.log("Successful GET");
			console.log(result);
			res.send(JSON.stringify({result}));
			db.close;
		});
	});

})

//API GET by Name mongo
app.get('/api/emr/:name', function(req, res) {
	MongoClient.connect(mongourl, function(err, db){
		if(err) throw err;
		var dbo = db.db("mydb");
		var search = {name: req.params.name};
		dbo.collection("emrs").findOne(search, function(err, result) {
			if(err) throw err;
			console.log("Successful GET by ID");
			console.log(result);
			res.send(JSON.stringify({result}));
			db.close;
		});
	});
})

//API DELETE
app.get('/api/emr/:name', function(req, res) {
	MongoClient.connect(mongourl, function(err, db){
		if(err) throw err;
		var dbo = db.db("mydb");
		var search = {name: req.params.name};
		dbo.collection("emrs").deleteOne(search, function(err, result) {
			if(err) throw err;
			console.log("Successful DELETE");
			db.close;
		});
	});
})

//API PUT
app.get('/api/emr/:name', function(req, res) {
	MongoClient.connect(mongourl, function(err, db){
		if(err) throw err;
		var dbo = db.db("mydb");
		var search = {name: req.params.name};
		var newstuff = { stuff: req.body }
		var stmp1 = db.collection("emrslock").find({$query: {}});
		//check timestamp
		if(db.collection("emrslock").find({$query: {tmstmp: Date.now()}}) == null){
			//do update
			dbo.collection("emrs").updateOne(search, newstuff, function(err, res){
				if(err) throw err;
				console.log("Successful PUT");
			});
			//Enter Lock into a seperate collection that has a timestamp and the id for that doc.
			dbo.collection("emrslock").insertOne({tmstmp: Date.now(), appid: req.params._id}, function(err,res){
				if(err) throw err;
				consolfe.log("Lock Created")
				db.close;
			});
		}
	});
})

//API Post call for Mongo
app.post('/api/emr', function(req, res) {
	MongoClient.connect(mongourl, function(err, db){
		
		if(err) throw err;
		var dbo = db.db("mydb");
		dbo.collection("emrs").insertOne(req.body, function(err,res){
			if(err) throw err;
			console.log("Successful POST");
			db.close();
		});
	});
	res.send();
})


// start the server on the specified port
app.listen(process.env.PORT || 8080);