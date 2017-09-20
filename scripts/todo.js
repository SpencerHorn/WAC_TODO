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

    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completed_todos++
      }
    })

    this.todos.forEach(function(todo) {
      if (completed_todos === total_todos) {
        todo.completed = false;
      } else {
        todo.completed = true
      }
    })
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
  delete_todo: function(position) {
    todo_list.delete_todo(position)
    view.display_todos();
  },
  toggle_completed: function(position) {
    todo_list.toggle_completed(position)
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

    todo_list.todos.forEach(function(todo, position) {
      var todo_li = document.createElement('li')
      var completed_todo_text = ''

      if (todo.completed === true) {
          completed_todo_text = '(x) ' + todo.todo_text;
        } else {
          completed_todo_text = '( ) ' + todo.todo_text;
        }

        todo_li.id = position
        todo_li.textContent = completed_todo_text
        todo_li.appendChild(this.create_delete_button())
        todo_li.appendChild(this.create_complete_button())
        todos_ul.appendChild(todo_li)
      }, this)

  },
  create_delete_button: function() {
    var delete_button = document.createElement('button')
    delete_button.textContent = 'Delete'
    delete_button.className = 'delete_button'
    return delete_button
  },
  create_complete_button: function() {
    var complete_button = document.createElement('button')
    complete_button.textContent = 'Mark Complete'
    complete_button.className = 'complete_button'
    return complete_button
  },
  setup_event_listeners: function() {
    var todos_ul = document.querySelector('ul')
    
    todos_ul.addEventListener('click', function(event) {
      var element_clicked = event.target
    
      if (element_clicked.className === 'delete_button') {
        handlers.delete_todo(parseInt(element_clicked.parentNode.id))
      } else { (element_clicked.className === 'complete_button') 
        handlers.toggle_completed(parseInt(element_clicked.parentNode.id))
      }
    })
  }
};

view.setup_event_listeners()