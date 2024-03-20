const inputField = document.querySelector('input[type = "text"]');
const addIconButton = document.getElementById('addIcon');
const todoContainer = document.getElementById('todos');
const itemLeftEle = document.getElementById('itemsLeft');
const allButton = document.getElementById('all');
const unCompleteButton = document.getElementById('unComplete');
const completedButton = document.getElementById('completed');
const clearCompletedButton = document.getElementById('clearCompleted');

let todosTaskList = [];

// function to update number of tasks to be completedButton.
function updateTasksLeft(){
    const tasksLeft = todosTaskList.reduce((acc, obj)=>{
        if(obj.isCompleted === false){
            return acc += 1;
        }
        else{
            return acc;
        }
    }, 0);
    console.log(tasksLeft);

    itemLeftEle.textContent = tasksLeft;
    return tasksLeft;
}

// function to render the list item to the container in html
function rendertodosTaskList(todosTaskList){
    todoContainer.innerHTML = "";

    todosTaskList.forEach((todo)=>{
        const newTodoTask = document.createElement("li");
        newTodoTask.classList.add('card', 'todoTask');

        const todoContent = `
            <div class = "todo">
                <input type = "checkbox" id = "checkbox-${todo.id}" ${todo.isCompleted ? "checked" : ""}/>
                <label for = "checkbox-${todo.id}"></label>
                <p> ${todo.text} </p>
            </div>
            <div class="icons"> 
                
                <i class="fa-solid fa-trash"></i>
            </div>
        `;
        newTodoTask.innerHTML = todoContent;
        todoContainer.appendChild(newTodoTask);
    });
}

// function to create new task 
function addTask(){
    if(inputField.value.trim() !== ""){
        const taskText = inputField.value;
        inputField.value = "";

        const newTaskId = Math.floor(Math.random() * 1000);

        const newTask = {
            id: newTaskId,
            text: taskText,
            isCompleted: false
        }

        todosTaskList.push(newTask);
        // filteredTaskList.push(newTask);
        rendertodosTaskList(todosTaskList);
        updateTasksLeft();
    }
}

// function to toggle the task to completed or uncomplete state 
function toggleTaskCompletion(taskId){
    todosTaskList.forEach((task)=>{
        if(taskId === task.id)
        {
            task.isCompleted = !task.isCompleted;
        }
    })
    // filteredTaskList = todosTaskList;
    rendertodosTaskList(todosTaskList);
    updateTasksLeft();
}

// function to delete the task 
function deleteTask(taskId){
    const updatedTaskList = todosTaskList.filter(item => item.id != taskId);
    todosTaskList = updatedTaskList;
    rendertodosTaskList(todosTaskList);
    updateTasksLeft();
}

// function to filter the uncomplete tasks and render it in the container 
function renderUnCompleteTasks(){
    const unCompleteTaskList = todosTaskList.filter((item)=>{
        return !item.isCompleted;
    });
    rendertodosTaskList(unCompleteTaskList);
    allButton.classList.remove("active");
    unCompleteButton.classList.add("active");
    completedButton.classList.remove("active");
}

// function to filter the completed tasks and render it in the container 

function renderCompletedTasks(){
    const completedTaskList = todosTaskList.filter((item)=>{
        return item.isCompleted;
    });
    rendertodosTaskList(completedTaskList);
    allButton.classList.remove("active");
    unCompleteButton.classList.remove("active");
    completedButton.classList.add("active");
}

// function to delete all the completed tasks 

function clearCompletedTasks(){
    const updatedTaskList = todosTaskList.filter(item => !item.isCompleted);
    todosTaskList = updatedTaskList;
    rendertodosTaskList(todosTaskList);
    updateTasksLeft();
}

// event listener for the input field to add new task
inputField.addEventListener("keydown", (event)=>{
    if(event.key === "Enter" && inputField.value.trim() !== ""){
        addTask();
    }
})
addIconButton.addEventListener('click', addTask);

todoContainer.addEventListener('change', (event)=>{
    const checkbox = event.target;
    const taskId = parseInt(checkbox.id.split("-")[1]);

    toggleTaskCompletion(taskId);
});

//event listener for delete button
todoContainer.addEventListener("click", (event)=>{
    if(event.target.classList.contains("fa-trash")){
        const icon = event.target;
        const task = icon.closest('.todoTask');

        const taskId = parseInt(task.querySelector('input[type="checkbox"]').id.split("-")[1]);

        deleteTask(taskId);        
    }
})

allButton.addEventListener('click', ()=>{
    rendertodosTaskList(todosTaskList);
    allButton.classList.add("active");
    unCompleteButton.classList.remove("active");
    completedButton.classList.remove("active");
});

unCompleteButton.addEventListener('click', renderUnCompleteTasks);
completedButton.addEventListener('click', renderCompletedTasks);
clearCompletedButton.addEventListener('click', clearCompletedTasks);