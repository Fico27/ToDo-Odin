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

function saveToLocalStorage() {
    localStorage.setItem("todoProjects", JSON.stringify(projectList));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem("todoProjects");
    if (saved) {
        projectList = JSON.parse(saved);
    }
    render();
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
    saveToLocalStorage()

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
    saveToLocalStorage()
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
        projectLI.innerHTML = ` ${project.name}`
        projectUL.appendChild(projectLI)
        projectLI.appendChild(deleteButtonProject)
        projectLI.addEventListener('click', () => projectSelector(project))

        deleteButtonProject.addEventListener('click', (e) => {
            e.stopPropagation()
            projectList = projectList.filter(project => project.id !== e.target.dataset.projectId)
            
            resetTaskDisplay();
            render();
            saveToLocalStorage()
        });
        
    })

    const projectContainer = document.querySelector(".content");
    const taskContainer = document.querySelector(".task-container");
    if (!currentProject || projectList.length === 0) {
        // Clear .content entirely when no projects or no current project
        projectContainer.innerHTML = '';
        projectContainer.appendChild(taskContainer); // Reattach task-container
    } else {
        currentProject.tasks.forEach(task => {
            const newTask = document.createElement("div");
            const deleteButton = document.createElement('button');
            deleteButton.className = "delete-todo";
            deleteButton.innerHTML = "remove";
            deleteButton.dataset.taskId = task.id;
            newTask.innerHTML = `<span>${task.name}</span> <span>Due date:</span> ${task.date} <span>Priority:</span> ${task.priority}`;
            newTask.appendChild(deleteButton);
            taskContainer.appendChild(newTask);
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                currentProject.tasks = currentProject.tasks.filter(task => task.id !== e.target.dataset.taskId);
                resetTaskDisplay();
                displayProject(currentProject);
                render();
                saveToLocalStorage()
            });
        });
    }


}

loadFromLocalStorage()

