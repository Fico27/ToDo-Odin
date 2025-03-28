// Each project should create an array in JS. 
// It should also create a list container (ToDo list for this project). 
// This array will be filled with toDo items (objects)
import {createProject} from './domController'
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
        Date: date,
        priority: priority
    }
}



//

