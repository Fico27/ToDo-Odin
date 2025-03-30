import './style.css';
import { newProject, newTask } from "./modules/projects.js"
import { newProjectForm, closeProjectForm, projectSelector, closeTaskForm, displayProject, resetTaskDisplay } from "./modules/domController.js"
export { projectList, setCurrentProject, getCurrentProject, render }


let projectList = [];

let currentProject = null; 

function setCurrentProject(project) {
    currentProject = project;
}

function getCurrentProject() {
    return currentProject;
}


// Adds a new project
const newProjectButton = document.querySelector('.newProjectButton');
newProjectButton.addEventListener('click', newProjectForm);

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
    resetTaskDisplay()
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

    const selectedProject = getCurrentProject();
    if (!selectedProject) {
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
        const deleteButtonProject = document.createElement("button")
        deleteButtonProject.innerHTML = "Delete"
        deleteButtonProject.dataset.projectId = project.id
        projectLI.innerHTML = project.name
        projectUL.appendChild(projectLI)
        projectLI.appendChild(deleteButtonProject)
        projectLI.addEventListener('click', () => projectSelector(project))

        deleteButtonProject.addEventListener('click', (e) => {
            e.stopPropagation()
            projectList = projectList.filter(project => project.id !== e.target.dataset.projectId)
            render();
            resetTaskDisplay();
        });
    })



    if (currentProject) {
        currentProject.tasks.forEach(task => {
            const newTask = document.createElement("div")
            const container = document.querySelector(".task-container");
            const deleteButton = document.createElement('button')
            deleteButton.className = "delete-todo"
            deleteButton.innerHTML = "remove"
            deleteButton.dataset.taskId = task.id;
            newTask.innerHTML = `${task.name} Due date: ${task.date} Priority: ${task.priority}`
            newTask.appendChild(deleteButton)
            container.appendChild(newTask)

            deleteButton.addEventListener('click', (e) => {

                currentProject.tasks = currentProject.tasks.filter(task => task.id !== e.target.dataset.taskId)
                resetTaskDisplay();
                displayProject(currentProject)
                render();
            });
        })
    }

}

