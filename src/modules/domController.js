// Controls all DOM 
export { displayProject, newProjectForm, closeProjectForm, projectSelector, newTaskForm , closeTaskForm, resetTaskDisplay}
import {setCurrentProject, getCurrentProject, render } from "../index.js";




const projectContainer = document.querySelector(".content")
const taskContainer = document.querySelector(".task-container")
// Creates in the .Content
function displayProject(project) {

    //Create them
    while (projectContainer.firstChild && projectContainer.firstChild !== taskContainer) {
        projectContainer.removeChild(projectContainer.firstChild);
    }
    // If .task-container was removed or misplaced, reattach it
    if (!projectContainer.contains(taskContainer)) {
        projectContainer.appendChild(taskContainer);
    }


    const divHeader = document.createElement("div")
    const h2Header = document.createElement("h2")
    const taskButton = document.createElement('button')
    

    // change innards
    h2Header.innerHTML = `${project.name}`
    taskButton.innerHTML = "Add ToDo"
    taskButton.addEventListener('click', newTaskForm)

    //Class em up or ID them
    divHeader.className = "todoName"

    //append them

    projectContainer.insertBefore(divHeader, taskContainer); 
    divHeader.appendChild(h2Header)
    divHeader.appendChild(taskButton)



}

function resetTaskDisplay() {

    // while (taskContainer.firstChild) {
    //     taskContainer.removeChild(taskContainer.firstChild)
    // }

    // while (projectContainer.firstChild) {
    //     projectContainer.removeChild(projectContainer.firstChild)
    // }
    const taskContainer = document.querySelector(".task-container");
    if (taskContainer) {
        while (taskContainer.firstChild) {
            taskContainer.removeChild(taskContainer.firstChild);
        }
    }
    
}

function newProjectForm() {
    const form = document.querySelector(".form");
    const formClose = document.querySelector(".project-form-close")
    form.style.display = "block";
    formClose.addEventListener('click', closeProjectForm)
}

function newTaskForm() {
    const form = document.querySelector(".task-form");
    const taskClose = document.querySelector(".task-form-close")
    form.style.display = "block";
    taskClose.addEventListener('click', closeTaskForm)

}

function closeProjectForm() {
    const form = document.querySelector(".form");
    form.style.display = "none";
}

function closeTaskForm() {
    const form = document.querySelector(".task-form");
    form.style.display = "none";
}

function projectSelector(project) {
    resetTaskDisplay()
  
   
    setCurrentProject(project);
    displayProject(project)
    render()
    console.log("Selected:", getCurrentProject());
   
}


