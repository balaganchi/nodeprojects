var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contacts', ['contacts']);
var bodyparser = require('body-parser');


app.use(express.static(__dirname + "/public"));
app.use(bodyparser.json());


app.get('/contactlist', function(req, res){
	console.log('Got a get request');

    db.contacts.find(function(err, docs){
    	res.json(docs);
    });
});

app.post('/contactlist', function(req, res){
	console.log('Got a post request');
	console.log(req.body);

	db.contacts.insert(req.body, function(err, doc){
		res.json(doc);
	});
});


app.delete('/contactlist/:id', function(req, res){
	console.log('Got a delete request');

	var id = req.params.id;
	db.contacts.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.get('/contactlist/:id', function(req, res){
	console.log('Got an edit request');

	var id = req.params.id;
	db.contacts.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});


app.put('/contactlist/:id', function(req, res){
	console.log('Got an update request');

	var id = req.params.id;
	console.log(req.body.name + id);
	db.contacts.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, contact: req.body.number}},
		new: true}, function(err, doc){
			res.json(doc);
		});
});

app.listen(3000);

console.log('Server listening on port: 3000');