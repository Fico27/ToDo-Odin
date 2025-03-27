// Controls all DOM 
export { displayProject, newProjectForm, closeProjectForm}
import { newProject } from "./projects";
// import {projectList} from "../index.js"


// Creates in the .Content
function displayProject(){
    //Create them
    const projectContainer = document.querySelector(".content")
    const divHeader = document.createElement("div")
    const h3Header = document.createElement("h3")
    const taskButton = document.createElement('button')


    // change innards
    h3Header.innerHTML= "I fucking made this!"
    taskButton.innerHTML = "Add ToDo"


    //Class em up or ID them
    divHeader.className = "todoName"

    //append them
    projectContainer.appendChild(divHeader)
    divHeader.appendChild(h3Header)
    divHeader.appendChild(taskButton)

}


function newProjectForm(){
    const form = document.querySelector(".form");
    const formClose = document.querySelector(".project-form-close")
    form.style.display = "block";
    formClose.addEventListener('click', closeProjectForm)
}

function closeProjectForm(){
    const form = document.querySelector(".form");
    form.style.display = "none";
}

