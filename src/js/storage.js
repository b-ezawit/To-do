import Project from './project.js';
import  todo  from './todo.js';

const storage_key = "my_todo_project";


function saveLocal(project){
    localStorage.setItem(storage_key,JSON.stringify(project));
}

function restoreLocal(){
    const rawData = localStorage.getItem(storage_key);
    if(!rawData) return null;
    
    const data = JSON.parse(rawData);

    let restoredProject = new Project(data.name);

    restoredProject.tasks = data.tasks.map(t=>{
        let liveTask = todo.createTodo(t.title,t.description,t.dueDate);
        liveTask.id = t.id;
        liveTask.isComplete = t.isComplete;

        return liveTask;
    });
    return restoredProject;
}

export default{
    saveLocal,
    restoreLocal
}
