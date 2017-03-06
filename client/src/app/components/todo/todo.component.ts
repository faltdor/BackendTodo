import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../model/todo';
import  'rxjs/add/operator/map';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[];
  	

  constructor(private _service:TodoService) { }

  ngOnInit() {
  	this.todos = [];
  	this._service.getTodos()
  		  		  .map(res => 
  		  		  	res.json()
  		  		  )
  		  		  .subscribe(todos => this.todos = todos);
  }

  
  addTodo($event, todoText){
  	if(!todoText.value.trim()){return;}
  	if($event.which ===1){

  		let result;

  		let newTodo = {
  			_id:null,
  			text:todoText.value,
  			isCompleted:false
  		}

  		result = this._service.saveTodo(newTodo);
  		result.subscribe(x => {
  			newTodo._id = x._id;
  			this.todos.push(newTodo);
  			todoText = '';
  		})
  	}
  }

  updateStatus(todo){
  	console.log('worrk');
  	let _todo = {
  		_id:todo._id,
  		text: todo.text,
  		isCompleted: !todo.isCompleted
  	}
  	this._service.updateTodo(_todo)
  				.map(res => res.json())
  				.subscribe(data => {
  					todo.isCompleted = !todo.isCompleted;
  				});
  }

  setEditState(todo,state){
  	console.log('wors');
  	if(state){
  		todo.isEditMode = state;
  	}else {
  		delete todo.isEditMode;
  	}
  }

  updateTodoText($event,todo){
  	console.log('wors2');
  	if($event.which ===13){
  		todo.text = $event.target.value;

  		let _Todo = {
  			_id:todo._id,
  			text:todo.value,
  			isCompleted:todo.isCompleted
  		}

  		this._service.updateTodo(_Todo)
  				.map(res => res.json())
  				.subscribe(data => {
  					this.setEditState(todo,false);
  				});
  	}
  }

  deleteTodo(todo){
  	let todos = this.todos;

  	this._service.deleteTodo(todo._id)
  				 .map(res => res.json())
  				 .subscribe(data => {
  				 	if(data.n == 1){
  				 		for(let i = 0; i< todos.length;i++){
  				 			if(todos[i]._id == todo._id){
  				 				todos.splice(i,1);
  				 			}
  				 		}
  				 	}
  				 });
  }

}
