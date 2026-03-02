const input = document.getElementById("input");
const addBtn = document.querySelector("add");
const inprogressCounter = document.getElementById("inprogressCount");
const doneCount = document.getElementById("doneCount");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
const clearBtn = document.getElementById("reset");
const themeToggle = document.getElementById("themeBtn");
const textTheme = document.querySelector(".toggle-text");
const iconTheme = document.querySelector(".moon-icon");


//open form
function openInputForm(defaultValue = ""){
    if (document.querySelector(".insertForm")) return;

    const div = document.createElement("div");
    div.classList.add("insertForm")
    div.innerHTML = `
    <ul class="task-detail">
            <li>Title: <input type="text" class="title" value="${input.value}" placeholder="Task Title"></li>
            <li>Due Date: <input type="date" class="duedate"></li>
            <li>Description: <textarea class="desc" placeholder="Details..."></textarea></li>
    </ul>
    `
    input.after(div);
}

//close form
function closeInputForm(){
    const insertForm = document.querySelector(".insertForm");
    if (insertForm) insertForm.remove();
    if (input) input.value = "";
}

//create task-card
function createCardHTML(task) {
    const div = document.createElement("div");
    div.classList.add("task-card");
    div.dataset.id = task.id;

    div.innerHTML = `
        <div class="card-header">
            <input type="checkbox" class="check-btn btn">
            <span class="title-display">${task.title}</span>
            <div class="action-icons">
                <button type="button" class="edit-btn btn">🖊️</button>
                <button type="button" class="delete-btn btn" style="color:red;">🗑</button>
                <button type="button" class="view-btn btn">...</button>
            </div>
        </div>
        <div class="edit-details" style="display: none;">
            <ul class="edit-task-detail">
                <li>Title: <input type="text" class="edit-title" value="${task.title}"></li>
                <li>Due: <input type="date" class="edit-date" value="${task.dueDate}"></li>
                <li>Descritption: <textarea class="edit-desc">${task.description}</textarea></li>
            </ul>
            <div style="margin-top:10px;">
                <button type="button" class="save-btn btn btn-gradient">Save</button>
                <button type="button" class="cancel-edit-btn btn">Cancel</button>
            </div>
        </div>
        
        <div class="view-details" style="display: none;">
            <p><strong>Due:</strong> <span class="date-display">${task.dueDate}</span></p>
            <p><strong>Description:</strong> <span class="desc-display">${task.description}</span></p>
            <button type="button" class="hide-view-btn btn">Close</button>
        </div>

        
    `;
    return div;
}

function updateCounters() {
    inprogressCounter.textContent = `In Progress: ${todoList.children.length}`
    doneCount.textContent = `Done: ${doneList.children.length}`
}

//initial load
function initialRender(tasks){
    todoList.innerHTML = "";
    doneList.innerHTML = ""
    if (!tasks) return;

    tasks.forEach((task)=>{
        const card = createCardHTML(task);
        if (task.isComplete) doneList.appendChild(card);
        else todoList.appendChild(card);
    });
    updateCounters();
}

// Append
function appendSingleTask(task) {
    const card = createCardHTML(task);
    todoList.appendChild(card);
    updateCounters();
}

//move
function moveTaskCard(card , newStatus){
    const targetList = newStatus == "True" ? doneList : todoList;
    targetList.appendChild(card);
    updateCounters();
}

//remove
function removeTaskCard(card){
    card.remove();
    updateCounters();
}

//Update card content
function updateCardText(card , data){
    card.querySelector(".title-display").textContent = data.title;
    card.querySelector(".date-display").textContent = data.dueDate;
    card.querySelector(".desc-display").textContent = data.description;

    //update edit-input values
    card.querySelector(".edit-title").value = data.title;
    card.querySelector(".edit-date").value = data.dueDate;
    card.querySelector(".edit-desc").value = data.description;
}

//clear all
function clearAllTasksVisually(){
    while (todoList.firstChild) todoList.removeChild(todoList.firstChild);
    while (doneList.firstChild) doneList.removeChild(doneList.firstChild);
    updateCounters();
}

//view toggles
function showEditView(card){
    card.querySelector(".view-details").style.display = "none";
    card.querySelector(".card-header").style.display = "none";
    card.querySelector(".edit-details").style.display = "block";
}

function showMoreView(card){
    card.querySelector(".edit-details").style.display = "none";
    card.querySelector(".view-details").style.display = "block";
}

function showNormalView(card){
    card.querySelector(".view-details").style.display = "none";
    card.querySelector(".edit-details").style.display = "none";
    card.querySelector(".card-header").style.display = "flex";
}

//theme icon
function updateThemeIcon(isDark){
    const textSpan = document.querySelector(".toggle-text");
    textSpan.textContent =  (isDark) ? "Light Mode" : "Dark Mode";
    document.querySelector(".moon-icon").textContent = (isDark) ? "☀ ": "☾"; 
}


export default {
    initialRender,
    appendSingleTask,
    moveTaskCard,
    removeTaskCard,
    updateCardText,
    clearAllTasksVisually,
    showEditView,
    showMoreView,
    showNormalView,
    openInputForm,
    closeInputForm,
    updateThemeIcon
};