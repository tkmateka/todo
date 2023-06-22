const newTodo = document.getElementById('newTodo');
newTodo.onkeydown = (event) => {
    if (event.keyCode == 13) submit()
}
let listElement = document.getElementById('todo-list');
let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos') || '{}') : [];
updateUI(todos);

function submit() {
    if (!newTodo.value) return; // stop if no new todo

    todos.push({
        value: newTodo.value,
        isCompleted: false
    }); // Add the new todo to the list

    localStorage.setItem('todos', JSON.stringify(todos)); // Store all todos in localStorage

    newTodo.value = ''; // Clear the input

    updateUI(todos);
}

function clearTodos() {
    todos = [];
    localStorage.removeItem('todos');
    updateUI(todos);
}

function updateUI(todos) {
    let todoList = '';
    todos.forEach((todo, i) => {
        todoList += `
            <div class="todo-item grey-border-bottom pointer ${todo.isCompleted ? 'completed' : ''}" onclick="handleSelect(${i})">
                <i class="fa ${todo.isCompleted ? 'fa-check-circle-o' : 'fa-circle-thin'}" aria-hidden="true"></i>
                <p>${todo.value}</p>
            </div>
        `;
    });// Push all todos as elements

    listElement.innerHTML = `
        <div class="todo-list-container">
            ${todoList ? todoList : `
                <div class="todo-item grey-border-bottom">
                    <p class="padding-left-10px">No Data Found</p>
                </div>
            `}
        </div>
        <div class="footer">
            <p class="no-margin">${todos.length} Item</p>
            <p class="no-margin pointer clear" onclick="clearTodos()">Clear Complete</p>
        </div>
    `;
}

function handleSelect(i) {
    todos[i].isCompleted = !todos[i].isCompleted;
    localStorage.setItem('todos', JSON.stringify(todos));
    updateUI(todos);
}