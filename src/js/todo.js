function createTodo(title,description,dueDate){
    return{
        id:Date.now(),
        title: title,
        description : description,
        dueDate:dueDate,
        isComplete:false,
    }
}

export default{
    createTodo
}