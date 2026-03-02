import "../css/style.css"
import todo from './todo.js'
import dom from './dom.js';
import storage from "./storage.js";
import Project from "./project.js";

window.addEventListener('submit' , function(e){
    e.preventDefault();
    return false;
})

//1. theme logic
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark'){
    document.body.classList.add("dark-theme");
}

//2. initialization
function init(){
    dom.updateThemeIcon(document.body.classList.contains("dark-theme"));
    let project = storage.restoreLocal();
    if(!project){
        project = new Project("Default");
        storage.saveLocal(project)
    }
    
    dom.initialRender(project.tasks);
}


window.addEventListener('DOMContentLoaded', init);

//event handler
document.body.addEventListener("click", (e)=>{
    const el = e.target;
    if (el.tagName === 'BUTTON' || el.Type === 'submit'){
        e.preventDefault();
    }

    //theme toggle
    if (el.closest('#themeBtn')){
        document.body.classList.toggle("dark-theme");
        const isDark = document.body.classList.contains("dark-theme");
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        dom.updateThemeIcon(isDark);

        return;
    }

    //clear all
    if (el.classList.contains("clear")){
        if(confirm("Delete All Tasks?")){
            //delete from the ui
            dom.clearAllTasksVisually();

            //delete from the storage
            const project = storage.restoreLocal();

            for (const task of project.tasks){
                project.removeTask(task.id)
            }
            storage.saveLocal(project);
        }
    }

    //add btn
    if (el.classList.contains("add")){
        const inputField = document.getElementById("input");

        //open form
        if (!document.querySelector(".insertForm")){
            dom.openInputForm();
            return;
        }

        //save new task
        const titleVal = document.querySelector(".title").value;
        const dateVal = document.querySelector(".duedate").value;
        const descVal = document.querySelector(".desc").value;

        if (!titleVal){
            return alert("Title required!")
        }

     

        let newTask = todo.createTodo(titleVal,descVal,dateVal);

        dom.closeInputForm();

        //save new task in project and storage
        let project = storage.restoreLocal();
        if(!project){
            project = new Project;
        }
        project.addTask(newTask);
        storage.saveLocal(project);
        dom.appendSingleTask(newTask);
        return;
    }

    //card specific actions
    const card = el.closest(".task-card");
    if (!card) return;

    const cardId = card.dataset.id;

    //checkbox
    if(el.classList.contains("check-btn")){
        const newStatus = el.checked? "True" : "False";

        dom.moveTaskCard(card, newStatus);
        const project = storage.restoreLocal();

        project.updateTask(cardId, {isComplete : newStatus});
        storage.saveLocal(project);
    }

    //delete icon
    else if(el.classList.contains("delete-btn")){
        dom.removeTaskCard(card);
        const project = storage.restoreLocal();
        project.removeTask(cardId);
        storage.saveLocal(project);   
    }

    //edit icon
    else if(el.classList.contains("edit-btn")){
        dom.showEditView(card);
    }

    //view-more icon
    else  if(el.classList.contains("view-btn")){
        dom.showMoreView(card);
    } 

    //close/cancel buttons
    else if (el.classList.contains("hide-view-btn") || el.classList.contains("cancel-edit-btn")){
        dom.showNormalView(card);
    }

    //save changes button
    else if(el.classList.contains("save-btn")){
        const updatedData = {
            title : card.querySelector(".edit-title").value,
            description : card.querySelector(".edit-desc").value,
            dueDate : card.querySelector(".edit-date").value
        }
        dom.updateCardText(card,updatedData);
        let project = storage.restoreLocal();
        project.updateTask(cardId,updatedData);
        storage.saveLocal(project);
        dom.showNormalView(card);
    }
});

