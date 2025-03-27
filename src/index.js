import './style.css';
import { newProject, } from "./modules/projects.js"
import { newProjectForm, closeProjectForm, projectSelector, newTaskForm} from "./modules/domController.js"
export {projectList}


// alert("Js is Running!")
// newProject()

let projectList = [];

// Adds a new project
const newProjectButton = document.querySelector('.newProjectButton');
newProjectButton.addEventListener('click', newProjectForm);

const newTaskButton = document.querySelector(".new-task-button")
newTaskButton.addEventListener("click", newTaskForm)

//

const form = document.querySelector(".new-project-class")
const projectSubmit = document.querySelector(".project-form-submit")

form.addEventListener('submit', e => {
    e.preventDefault()
    
    let projectName = document.querySelector("#new-project-name")
    addProject(projectName.value)
    projectName.value = '';
    closeProjectForm()
    
    console.log(projectList)
})

function addProject(name){
    const projectListItem = new newProject(name);
    projectList.push(projectListItem)
    render()

}



function render(){
    const projectUL = document.querySelector(".project-list")
    while (projectUL.firstChild){
        projectUL.removeChild(projectUL.firstChild)
    }

    projectList.forEach(project =>{
        
        const projectLI = document.createElement("li")
        projectLI.innerHTML = project.name
        projectUL.appendChild(projectLI)
        projectLI.addEventListener('click', () => projectSelector(project))
        
    })
}



