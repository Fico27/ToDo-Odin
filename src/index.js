import './style.css';
import { newProject } from "./modules/projects.js"


// alert("Js is Running!")
// newProject()

const newProjectButton = document.querySelector('.newProjectButton');

newProjectButton.addEventListener('click', newProject(test))
