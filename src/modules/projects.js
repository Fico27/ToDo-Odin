

export {newProject, newTask}

function newProject(name){
    
    return{
        name: name,
        id: crypto.randomUUID(),
        tasks: []
    }

}

function newTask(name, date, priority){
    return {
        name: name,
        id: crypto.randomUUID(),
        date: date,
        priority: priority
    }
}




