// Controls all DOM 
export { createProject}
import { newProject } from "./projects";


// Creates in the .Content
function createProject(){
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


