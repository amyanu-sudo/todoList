const inputField = document.querySelector('input[type = "text"]');
const addIconButton = document.getElementById('addIcon');
const todoContainer = document.getElementById('todos');
const itemLeftEle = document.getElementById('itemsLeft');
const allButton = document.getElementById('all');
const unCompleteButton = document.getElementById('unComplete');
const completedButton = document.getElementById('completed');
const clearCompletedButton = document.getElementById('clearCompleted');

let todosTaskList = [];
// let filteredTaskList = [];

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

function deleteTask(taskId){
    const updatedTaskList = todosTaskList.filter(item => item.id != taskId);
    todosTaskList = updatedTaskList;
    rendertodosTaskList(todosTaskList);
    updateTasksLeft();
}

function renderUnCompleteTasks(){
    const unCompleteTaskList = todosTaskList.filter((item)=>{
        return !item.isCompleted;
    });
    rendertodosTaskList(unCompleteTaskList);
    allButton.classList.remove("active");
    unCompleteButton.classList.add("active");
    completedButton.classList.remove("active");
}

function renderCompletedTasks(){
    const completedTaskList = todosTaskList.filter((item)=>{
        return item.isCompleted;
    });
    rendertodosTaskList(completedTaskList);
    allButton.classList.remove("active");
    unCompleteButton.classList.remove("active");
    completedButton.classList.add("active");
}

function clearCompletedTasks(){
    const updatedTaskList = todosTaskList.filter(item => !item.isCompleted);
    todosTaskList = updatedTaskList;
    rendertodosTaskList(todosTaskList);
    updateTasksLeft();
}

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