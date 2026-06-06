const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks when page opens
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskText = taskInput.value.trim();

    if(taskText === ""){
        alert("Please enter a task!");
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    saveTask(task);
    createTaskElement(task);

    taskInput.value = "";
}

function createTaskElement(task) {

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;

    if(task.completed){
        span.classList.add("completed");
    }

    // Complete Button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✓";
    completeBtn.classList.add("complete-btn");

    completeBtn.onclick = () => {
        span.classList.toggle("completed");
        task.completed = !task.completed;
        updateLocalStorage();
    };

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.onclick = () => {
        li.remove();
        updateLocalStorage();
    };

    const actions = document.createElement("div");
    actions.classList.add("task-actions");

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    taskList.appendChild(li);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTaskElement(task);
    });
}

function updateLocalStorage() {

    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {

        const text = li.querySelector("span").textContent;

        const completed =
            li.querySelector("span").classList.contains("completed");

        tasks.push({
            text,
            completed
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}