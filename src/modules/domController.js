// Controls all DOM 
export { displayProject, newProjectForm, closeProjectForm, projectSelector, newTaskForm , closeTaskForm, resetTaskDisplay}
import {setCurrentProject, getCurrentProject, render } from "../index.js";
import { newProject } from "./projects";



const projectContainer = document.querySelector(".content")

// Creates in the .Content
function displayProject(project) {
    //Create them
    const projectContainer = document.querySelector(".content")
    const divHeader = document.createElement("div")
    const h3Header = document.createElement("h3")
    const taskButton = document.createElement('button')


    // change innards
    h3Header.innerHTML = `${project.name}`
    taskButton.innerHTML = "Add ToDo"
    taskButton.addEventListener('click', newTaskForm)

    //Class em up or ID them
    divHeader.className = "todoName"

    //append them
    projectContainer.appendChild(divHeader)
    divHeader.appendChild(h3Header)
    divHeader.appendChild(taskButton)



}

function resetTaskDisplay() {
    while (projectContainer.firstChild) {
        projectContainer.removeChild(projectContainer.firstChild)
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

