import createTodo from "./todo";
class Project{
    constructor(name){
        this.name = name;
        this.tasks = []
    }
    addTask(task){
        this.tasks.push(task);
    }
    removeTask(taskID){
        this.tasks = this.tasks.filter(t => t.id !== taskID);
    }
    updateTask(taskID,newDetails){
        const task = this.tasks.find(t => t.id === taskID);
        if (task){
            Object.assign(task,newDetails);
        }

    }
}

export default Project;