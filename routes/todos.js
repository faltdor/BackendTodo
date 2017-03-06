var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');


var db = mongojs('URL_TO_DATABESE',['todos']);

//All todos
router.get('/todos',function(req,res,next){
	
	db.todos.find(function(err,todos){
		if(err){
			res.send(err);
		}else {
			res.json(todos);
		}
	})

});


// Single todo

router.get('/todo/:id',function(req,res,next){
	
	db.todos.findOne({_id:mongojs.ObjectId(req.params.id)},function(err,todo){
		if(err){
			res.send(err);
		}else {
			res.json(todo);
		}
	})

});

//Save todo
router.post('/todo',function(req,res,next){
	var todo = req.body;

	if(!todo.text || !(todo.isCompleted + '')){
		res.status(400);
		res.json({
			"error":"invalidate date"
		});
	}else {

		db.todos.save(todo,function(err,result){
			if(err){
				res.send(err);
			}else {
				res.json(result);
			}
		})
	}

});


//Save update
router.put('/todo/:id',function(req,res,next){
	var todo = req.body;

	var updTodo = {};

	if(todo.isCompleted){
		updTodo.isCompleted = todo.isCompleted;
	}

	if(todo.text){
		updTodo.text = todo.text;
	}

	if(!updTodo){
		res.status(400);
		res.json({
			"error":"invalidate date"
		});
	}else {

		db.todos.update({_id:mongojs.ObjectId(req.params.id)},updTodo,{},function(err,result){
			if(err){
				res.send(err);
			}else {
				res.json(result);
			}
		})
	}

});

//delate
router.delete('/todo/:id',function(req,res,next){
	
	db.todos.remove({_id:mongojs.ObjectId(req.params.id)},'',function(err,todo){
		if(err){
			res.send(err);
		}else {
			res.json(todo);
		}
	})

});

module.exports = router;