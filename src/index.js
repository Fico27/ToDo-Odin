import './style.css';
import { newProject,  } from "./modules/projects.js"
import { newProjectForm} from "./modules/domController.js"


// alert("Js is Running!")
// newProject()

const newProjectButton = document.querySelector('.newProjectButton');

newProjectButton.addEventListener('click', newProjectForm)


