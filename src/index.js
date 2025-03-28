import './style.css';
import { newProject, newTask } from "./modules/projects.js"
import { newProjectForm, closeProjectForm, projectSelector, newTaskForm, closeTaskForm, displayProject, resetTaskDisplay } from "./modules/domController.js"
export { projectList, setCurrentProject, getCurrentProject , render}


let projectList = [];

let currentProject = null; // Define here

function setCurrentProject(project) {
    currentProject = project;
}

function getCurrentProject() {
    return currentProject;
}


// Adds a new project
const newProjectButton = document.querySelector('.newProjectButton');
newProjectButton.addEventListener('click', newProjectForm);

// const newTaskButton = document.querySelector(".new-task-button")
// newTaskButton.addEventListener("click", newTaskForm)

//

const form = document.querySelector(".new-project-class")
const taskForm = document.querySelector(".task-form")
const taskFormID = document.querySelector("#task-form")
const projectSubmit = document.querySelector(".project-form-submit")

form.addEventListener('submit', e => {
    e.preventDefault()

    let projectName = document.querySelector("#new-project-name")
    addProject(projectName.value)
    projectName.value = '';
    closeProjectForm()

    console.log(projectList)
})

taskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const taskName = document.querySelector("#new-task-name")
    const taskDate = document.querySelector("#new-task-date")
    const taskPriority = document.querySelector("#new-task-priority")
    addTask(taskName.value, taskDate.value, taskPriority.value)

})


function addProject(name) {
    const projectListItem = new newProject(name);
    projectList.push(projectListItem)
    resetTaskDisplay()
    render()

}

function addTask(name, date, priority) {
    // const task = new newTask(name, date, priority)
    // console.log(task)

    const selectedProject = getCurrentProject();
    if (!selectedProject) {
        console.log("No project selected! Please select a project first.");
        return;
    }
    const task = new newTask(name, date, priority);
    selectedProject.tasks.push(task);
    console.log(`Added task to ${selectedProject.name}:`, selectedProject.tasks);
    taskFormID.reset();
    closeTaskForm();
    resetTaskDisplay();
    displayProject(selectedProject);
    render()
}



function render() {
    const projectUL = document.querySelector(".project-list")
    while (projectUL.firstChild) {
        projectUL.removeChild(projectUL.firstChild)
    }
    

    projectList.forEach(project => {

        const projectLI = document.createElement("li")
        projectLI.innerHTML = project.name
        projectUL.appendChild(projectLI)
        projectLI.addEventListener('click', () => projectSelector(project))

    })
        

    if (currentProject) {
        currentProject.tasks.forEach(task => {
            const newTask = document.createElement("div")
            const container = document.querySelector(".content");

            newTask.innerHTML = task.name;
            container.appendChild(newTask)
        })
    }

}


