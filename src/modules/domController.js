// Controls all DOM 
export { createProject}

function createProject(){
    const projectContainer = document.querySelector(".content")
    const divHeader = document.createElement("div")
    const h3Header = document.createElement("h3")
    const taskButton = document.createElement('button')

    h3Header.innerHTML= "I fucking made this!"

    projectContainer.appendChild(divHeader)
    divHeader.appendChild(h3Header)
    divHeader.appendChild(taskButton)


}