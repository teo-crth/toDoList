// TABLEAU DES TACHES
const tasks = [
    {
        id: 1,
        title: 'Tâche 1',
        description: 'iiiiiiiiiiiiiiiiiiiiiiiiiiii',
        state: 'à faire',
        color: 'blue',
    },
    {
        id: 2,
        title: 'Tâche 2',
        description: 'blblablabalalbalbalab',
        state: 'à faire',
        color: 'blue',
    },
    {
        id: 3,
        title: 'Tâche 3',
        description: 'oooooooooooooooooo',
        state: 'à faire',
        color: 'blue',
    },

];

// Générer les tâches
const generateTask = () => {

  const html_section = document.querySelector("section");
  html_section.innerHTML = "";

  tasks.forEach((task) => {
    const html_taskArticle = document.createElement("article");
    const html_containerTaskHeader = document.createElement("div");
    const html_taskTitle = document.createElement("h3");
    const html_modifyIcone = document.createElement("span");
    const html_containerBodyTask = document.createElement("div");
    const html_descriptionTask = document.createElement("p");
    const html_containerModificationOfTask = document.createElement("div");
    const html_buttonModifyTask = document.createElement("button");
    const html_buttonDelete = document.createElement("button");
    const html_closeEditTask = document.createElement("span");

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
    html_containerTaskHeader.setAttribute("data-id", task.id);

    html_closeEditTask.classList.add("close-edit-task");

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
    html_containerModificationOfTask.appendChild(html_closeEditTask);

    // Add content
    html_taskTitle.textContent = task.title;
    html_descriptionTask.textContent = task.description;
    html_modifyIcone.textContent = "...";
    html_closeEditTask.textContent = "X";
    html_buttonModifyTask.textContent = "Modifier";
    html_buttonDelete.textContent = "Supprimer";

    if (task.color === "green") {
      html_containerTaskHeader.style.backgroundColor = "green";
    } else if (task.color === "orange") {
      html_containerTaskHeader.style.backgroundColor = "var(--color-orange)";
    } else {
      html_containerTaskHeader.style.backgroundColor = "var(--color-blue)";
    }
    console.log("conteneur à modifier au clic:", html_containerTaskHeader);

    return;
  });
};

generateTask();


// Gestion des événements avec event delegation
document.querySelector('section').addEventListener('click', (event) => {
    const target = event.target;

    // Supprimer une tâche
    if (target.classList.contains('delete-task-button')) {
        const id = target.dataset.id;
        deleteTask(id);
    }

    // Afficher/Masquer le conteneur de modification
    if (target.classList.contains('modify-icon')) {
        const taskContainer = target.closest('article').querySelector('.container-modificationOfaTask');
        taskContainer.classList.toggle('hidden');
    }

    // Fermer le conteneur de modification
    if (target.classList.contains('close-edit-task')) {
        const taskContainer = target.closest('article').querySelector('.container-modificationOfaTask');
        taskContainer.classList.add('hidden');
    }
});

// Ajouter une tâche
const buttonAddTask = document.getElementById('add-task-icone');
const popUpForm = document.getElementsByClassName('container-popup-task')[0];
const description = document.getElementById('popup-input-description');
const title = document.getElementById('popup-task-name');
const button = document.getElementById('button-submit');
const color = document.querySelector("#popup-input-color");
    
button.addEventListener("click", (event) => {
    event.preventDefault();
    
    const newTask = {
        id: tasks.length + 1,
        title: title.value,
        description: description.value,
        state: "à faire",
        color: color.value,
    };
    
    tasks.push(newTask);
    console.log("nouvelle tache :", newTask);
    console.log("tableau des taches :", tasks);
    popUpForm.classList.add("hidden");
    generateTask();
        
});

const displayPopUp = () => {
// Vérification si l'élément existe
        buttonAddTask.addEventListener('click', () => {
            popUpForm.classList.remove('hidden');
            console.log('Bouton cliqué !');
            description.value = '';
            title.value = '';
        });
};

// Fermer la pop-up d'ajout d'une tâche
const closePopUpIcone = document.getElementById('close-popup-add-task');
if (closePopUpIcone) {
    closePopUpIcone.addEventListener('click', () => {
        popUpForm.classList.add('hidden');
    });
} else {
    console.error("Élément avec l'ID 'close-popup-add-task' non trouvé.");
}


generateTask(); // Générer les tâches initiales
displayPopUp();

