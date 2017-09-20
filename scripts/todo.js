var todo_list = {
  todos: [],
  add_todo: function(todo_text) {
    this.todos.push({
      todo_text: todo_text,
      completed: false
    });
  },
  change_todo: function(position, todo_text) {
    this.todos[position].todo_text = todo_text;
  },
  delete_todo: function(position){
    this.todos.splice(position, 1);
  },
  toggle_completed: function(position) {
    var todo = this.todos[position]
    todo.completed = !todo.completed;
  },
  toggle_all: function() {
    var total_todos = this.todos.length;
    var completed_todos = 0;
    for (var i = 0; i < total_todos; i++) {
      if (this.todos[i].completed === true){
        completed_todos++;
      }
    }
    if (completed_todos === total_todos) {
      for (var i = 0; i < total_todos; i++) {
        this.todos[i].completed = false;
      }
    } else {
      for (var i = 0; i < total_todos; i++) {
        this.todos[i].completed = true;
      }
    }
  }
};

var handlers = {
  add_todo: function() {
    var add_todo_text_input = document.getElementById('add_todo_text_input')
    todo_list.add_todo(add_todo_text_input.value)
    add_todo_text_input.value = ''
    view.display_todos();
  },
  change_todo: function() {
    var change_todo_position_input = document.getElementById('change_todo_position_input') 
    var change_todo_text_input = document.getElementById('change_todo_text_input') 
    todo_list.change_todo(change_todo_position_input.valueAsNumber, change_todo_text_input.value)
    change_todo_position_input.value = ''
    change_todo_text_input.value = ''
    view.display_todos();
  },
  delete_todo: function() {
    var delete_todo_position_input = document.getElementById('delete_todo_position_input')
    todo_list.delete_todo(delete_todo_position_input.valueAsNumber)
    delete_todo_position_input.value = ''
    view.display_todos();
  },
  toggle_completed: function() {
    var toggle_completed_position_input = document.getElementById('toggle_completed_position_input')
    todo_list.toggle_completed(toggle_completed_position_input.valueAsNumber)
    toggle_completed_position_input.value = ''
    view.display_todos();
  },
  toggle_all: function() {
    todo_list.toggle_all();
    view.display_todos();
  }
};

var view = {
  display_todos: function() {
    var todos_ul = document.querySelector('ul')
    todos_ul.innerHTML = ''
    for (var i=0; i < todo_list.todos.length; i++) {
      var todo_li = document.createElement('li')
      var todo = todo_list.todos[i]
      var completed_todo_text = ''
      if (todo.completed === true) {
        completed_todo_text = '(x) ' + todo.todo_text;
      } else {
        completed_todo_text = '( ) ' + todo.todo_text;
      }
      todo_li.textContent = completed_todo_text
      todos_ul.appendChild(todo_li)
    }
  }
};