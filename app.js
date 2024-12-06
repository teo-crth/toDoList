const tasks = [];

const generateTask = () => {
  const html_section = document.querySelector("section");

  html_section.innerHTML = "";

  const toDo = document.querySelector("#to-do");

  console.log(toDo);

  console.log(html_section);
  tasks.forEach((task) => {
    const html_section = document.querySelector("section");
    const html_taskArticle = document.createElement("article");
    const html_containerTaskHeader = document.createElement("div");
    const html_taskTitle = document.createElement("h3");
    const html_modifyIcone = document.createElement("span");
    const html_containerBodyTask = document.createElement("div");
    const html_descriptionTask = document.createElement("p");
    const html_containerModificationOfTask = document.createElement("div");
    const html_buttonModifyTask = document.createElement("button");
    const html_buttonDelete = document.createElement("button");

    // Add classes
    html_containerTaskHeader.classList.add("container-task-header");
    html_taskTitle.classList.add("task-name");
    html_modifyIcone.classList.add("modify-icon");
    html_containerBodyTask.classList.add("container-task-body");
    html_descriptionTask.classList.add("description-task");
    html_containerModificationOfTask.classList.add(
      "container-modificationOfaTask",
      "hidden"
    );
    html_buttonModifyTask.classList.add("modify-task-button");
    html_buttonDelete.classList.add("delete-task-button");
    html_buttonDelete.setAttribute("data-id", task.id);

    // Append elements
    html_section.appendChild(html_taskArticle);
    html_taskArticle.appendChild(html_containerTaskHeader);
    html_taskArticle.appendChild(html_containerBodyTask);
    html_taskArticle.appendChild(html_containerModificationOfTask);

    html_containerTaskHeader.appendChild(html_taskTitle);
    html_containerTaskHeader.appendChild(html_modifyIcone);

    html_containerBodyTask.appendChild(html_descriptionTask);

    html_containerModificationOfTask.appendChild(html_buttonModifyTask);
    html_containerModificationOfTask.appendChild(html_buttonDelete);

    // Add content
    html_taskTitle.textContent = task.title;
    html_descriptionTask.textContent = task.description;
    html_buttonModifyTask.textContent = "Modifier";
    html_buttonDelete.textContent = "Supprimer";
  });
};

const buttonAddTask = document.getElementById("add-icone");

console.log(buttonAddTask);

const popUpForm = document.getElementsByClassName("container-popup-task")[0];

console.log(popUpForm);

const displayPopUp = () => {
  buttonAddTask.addEventListener("click", () => {
    popUpForm.classList.remove("hidden");
    description.value = "";
    title.value = "";
  });
};

displayPopUp();

const description = document.getElementById("popup-input-description");

const title = document.getElementById("popup-task-name");

const button = document.getElementById("button-submit");

button.addEventListener("click", (event) => {
  event.preventDefault();

  const newTask = {
    id: tasks.length + 1,
    title: title.value,
    description: description.value,
    state: "à faire",
    color: "blue",
  };

  tasks.push(newTask);
  console.log("nouvelle tache :", newTask);
  console.log("tableau des taches :", tasks);
  popUpForm.classList.add("hidden");
  generateTask();
});
