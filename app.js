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
        state: 'en cours',
        color: 'blue',
    },

];

// Générer les tâches
const generateTask = () => {
    const html_section = document.querySelectorAll("section");
    html_section.innerHTML = "";

    const html_section_1 = document.getElementById("first-section");
    const html_section_2 = document.getElementById("second-section");
    const html_section_3 = document.getElementById("third-section");
    
    html_section_1.innerHTML = "";
    html_section_2.innerHTML = "";  
    html_section_3.innerHTML = "";
    
    
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
    if (task.state === "à faire"){
       html_section_1.appendChild(html_taskArticle);     
    }
    else if(task.state ==="en cours"){
        html_section_2.appendChild(html_taskArticle);     
    }
    else{
        html_section_3.appendChild(html_taskArticle);
    }
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

// Gestion des événements avec event delegation
const sections = document.querySelectorAll('#first-section, #second-section, #third-section');
const popUpFormModified = document.getElementsByClassName("container-popup-modified")[0];
const closePopUp = document.getElementById("close-popup-modified");

// Boucle pour chaque section
sections.forEach(section => {
    section.addEventListener('click', (event) => {
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

        // Ouvrir le pop-up de modification
        if (target.classList.contains('modify-task-button')) {
            popUpFormModified.classList.remove('hidden');
            document.getElementById("popup-input-description").value = "";
            document.getElementById("popup-task-name").value = "";
        }
        //  Faire les modification pour voir si sa marche 
        // sections.forEach(section => {
        //     section.addEventListener('click', (event) => {
        //         const target = event.target;
        
        //         // Ouvrir le pop-up de modification
        //         if (target.classList.contains('modify-task-button')) {
        //             const taskId = target.closest('article').querySelector('.delete-task-button').dataset.id;
        //             const task = tasks.find(t => t.id === Number(taskId));
        
        //             if (task) {
        //                 // Afficher le pop-up et pré-remplir les champs
        //                 popUpFormModified.classList.remove('hidden');
        //                 modifiedTitle.value = task.title;
        //                 modifiedDescription.value = task.description;
        //                 modifiedStatus.value = task.state;
                        
        //                 // Sauvegarder l'ID de la tâche à modifier
        //                 saveModifiedButton.dataset.id = taskId;
        //             }
        //         }
        //     });
        // });
        
    });
});

// Fermer le pop-up de modification
closePopUp.addEventListener("click", () => {
    popUpFormModified.classList.add("hidden");
});

function deleteTask(id) {
    console.log(id);
    const index = tasks.findIndex(task => task.id === Number(id));
    if (index !== -1) {
        tasks.splice(index, 1);
        generateTask();
        console.log(`Tâche avec l'ID ${id} supprimée.`);
    } else {
        console.log(`Aucune tâche trouvée avec l'ID ${id}.`);
    }
}

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




//POP UP MODIFICATION

closePopUp.addEventListener("click", () => {
    popUpFormModified.classList.add("hidden");
});

// const modifiedTitle = document.getElementById("popup-modified-task-name");
// const modifiedDescription = document.getElementById("popup-modified-description");
// const modifiedStatus = document.getElementById("popup-modified-status");
// const saveModifiedButton = document.getElementById("button-save-modified-task");
// const FormModified = document.querySelector(".container-popup-modified");
// const close = document.getElementById("close-popup-modified");



// gestionnaire d'événements pour le bouton Enregistrer et mets à jour le tableau tasks avec les nouvelles valeurs :
// saveModifiedButton.addEventListener("click", () => {
//     const taskId = Number(saveModifiedButton.dataset.id);
//     const taskIndex = tasks.findIndex(task => task.id === taskId);

//     if (taskIndex !== -1) {
//         // Mettre à jour les informations de la tâche
//         tasks[taskIndex].title = modifiedTitle.value;
//         tasks[taskIndex].description = modifiedDescription.value;
//         tasks[taskIndex].state = modifiedStatus.value; // Mise à jour du statut

//         // Fermer la pop-up et rafraîchir l'affichage
//         popUpFormModified.classList.add("hidden");
//         generateTask(); // Rafraîchir les tâches affichées
//     } else {
//         console.error("Tâche non trouvée pour la mise à jour.");
//     }
// });



generateTask();
displayPopUp();
