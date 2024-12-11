// TABLEAU DES TACHES
let tasks = [
  {
      id: 0,
      title: 'Tâche 1',
      description: 'Description de la tâche',
      state: 'à faire',
      color: 'blue',
      category: '',
      priority: '',
  },
];

let newId = 1;
    
// Trier les tâches par priorité
tasks.sort((a, b) => {
  const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
  return priorityOrder[a.priority] - priorityOrder[b.priority];
});

// Fonction pour afficher les tâches filtrées par catégorie
const filterTasksByCategory = () => {
  const submitFilterButton = document.getElementById("filter-submitButton"); // Bouton pour appliquer le filtre
  const selectedCategory = document.getElementById("category-input-filter"); // Le sélecteur de catégorie (assurez-vous que c'est le bon ID)
  
  submitFilterButton.addEventListener("click", () => {
    // Récupère la catégorie sélectionnée
    const categoryValue = selectedCategory.value;

    // Filtrer les tâches en fonction de la catégorie sélectionnée
    const filteredTasks = categoryValue === "all" 
      ? tasks // Si "all" est sélectionné, affiche toutes les tâches
      : tasks.filter(task => task.category === categoryValue); // Sinon, filtre les tâches par catégorie

    // Regénérer les tâches dans les sections
    generateTask(filteredTasks);
    filterCategory.classList.add("hidden"); // Masquer le conteneur de filtre

  });
};

// Générer les tâches
const generateTask = (filteredTasks = tasks) => {
  const html_section_1 = document.getElementById("first-section");
  const html_section_2 = document.getElementById("second-section");
  const html_section_3 = document.getElementById("third-section");

  html_section_1.innerHTML = "";
  html_section_2.innerHTML = "";  
  html_section_3.innerHTML = "";
  
  
  filteredTasks.forEach((task) => {
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
    const html_containerCategory = document.createElement("div");
    const html_containerPriority = document.createElement("div");
    const html_textCategory = document.createElement("p");
    const html_textPriority = document.createElement("p");
    
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
    html_taskArticle.setAttribute("draggable", "true");  // Rendre la tâche déplaçable
    html_closeEditTask.classList.add("close-edit-task");
    html_containerCategory.classList.add("container-category");
    html_containerPriority.classList.add("container-priority");
    html_textCategory.classList.add("text-category");
    html_textPriority.classList.add("text-priority");
      
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

    html_containerTaskHeader.appendChild(html_containerCategory);
    html_containerBodyTask.appendChild(html_containerPriority);
    html_containerCategory.appendChild(html_textCategory);
    html_containerPriority.appendChild(html_textPriority);

    // Add content
    html_taskTitle.textContent = task.title;
    html_descriptionTask.textContent = task.description;
    html_modifyIcone.textContent = "...";
    html_closeEditTask.textContent = "X";
    html_buttonModifyTask.textContent = "Modifier";
    html_buttonDelete.textContent = "Supprimer";
    html_textCategory.textContent = `Catégorie : ${task.category}`;

    // Ajout de la couleur en fonction de la priorité
    if (task.priority === "low") {
      html_containerPriority.style.backgroundColor = "green";
      html_textPriority.textContent = "Pas urgent";
    } else if (task.priority === "medium") {
      html_containerPriority.style.backgroundColor = "orange";
      html_textPriority.textContent = "Peu urgent";
    } else {
      html_containerPriority.style.backgroundColor = "red";
      html_textPriority.textContent = "Urgent";
    }

    if (task.color === "green") {
      html_containerTaskHeader.style.backgroundColor = "green";
    } else if (task.color === "orange") {
      html_containerTaskHeader.style.backgroundColor = "var(--color-orange)";
    } else {
      html_containerTaskHeader.style.backgroundColor = "var(--color-blue)";
    }

    // Add dragstart event to store the task's current state
    html_taskArticle.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("taskId", task.id);  // Stocke l'ID de la tâche pour le transfert
      e.target.style.opacity = "1";  // Effet visuel lors du drag
    });

    html_taskArticle.addEventListener("dragend", (e) => {
        e.target.style.opacity = "1";  // Réinitialise l'opacité après le drag
    });

    return;
  });
};

const assignAnID = () => {
  const highestIDTask = tasks.filter(
    (task) => task.id === Math.max(...tasks.map((t) => t.id))
  );
  console.log("highest ID", highestIDTask);
  if (highestIDTask.length > 0) {
    newId = highestIDTask[0].id + 1;
    console.log("Nouvel ID attribué :", newId);
    return newId;
  } else {
    newId = 1; // Si le tableau `tasks` est vide
    console.log("Aucune tâche existante, nouvel ID : 1");
  }
};

// Gestion des événements avec event delegation
const sections = document.querySelectorAll('#first-section, #second-section, #third-section');
const popUpFormModified = document.getElementsByClassName("container-popup-modified")[0];
const closePopUp = document.getElementById("close-popup-modified");
const modifiedTitle = document.getElementById("modified-task-name");
const modifiedDescription = document.getElementById("modified-input-description");
const modifiedColor = document.getElementById("modified-input-color");
const modifiedStatus = document.getElementById("popup-input-state");
const saveModifiedButton = document.getElementById("button-submit-modified");
const modifiedPriority = document.getElementById("modified-input-priority");
const modifiedCategory = document.getElementById("modified-task-category");

// Boucle pour chaque section
let currentTaskId = null; // Pour suivre la tâche en cours de modification

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
            const taskId = target.closest('article').querySelector('.delete-task-button').dataset.id;
            console.log(taskId);
            popUpFormModified.classList.remove('hidden');
            document.getElementById("modified-input-description").value = tasks[taskId-1].description;
            document.getElementById("modified-task-name").value = tasks[taskId-1].title;
            const taskmodified = tasks.find(t => t.id === Number(taskId));
            console.log(taskmodified, "taskmodified");
            
           
            if (taskmodified) {
                popUpFormModified.classList.remove('hidden');
                modifiedTitle.value = taskmodified.title;
                modifiedDescription.value = taskmodified.description;
                modifiedColor.value = taskmodified.color;
                modifiedStatus.value = taskmodified.state;
                modifiedPriority.value = taskmodified.priority;
                modifiedCategory.value = taskmodified.category;
                currentTaskId = taskmodified.id; // Stocker l'ID de la tâche en cours de modification
            }
        }
    });
});

// Permettre le drag and drop entre les sections
sections.forEach(section => {
    section.addEventListener('dragover', (e) => {
        e.preventDefault();  // Permet à l'élément d'être déposé sur la section
    });

    section.addEventListener('drop', (e) => {
        e.preventDefault();  // Empêche le comportement par défaut
        const taskId = e.dataTransfer.getData("taskId");  // Récupère l'ID de la tâche
        const task = tasks.find(t => t.id === Number(taskId));  // Recherche la tâche par son ID

        if (task) {
            // Change l'état de la tâche en fonction de la section où elle est déposée
            if (section.id === "first-section") {
                task.state = "à faire";
            } else if (section.id === "second-section") {
                task.state = "en cours";
            } else if (section.id === "third-section") {
                task.state = "terminé";
            }
            generateTask();  // Récupère les tâches avec leur nouvel état
        }
    });
});


// function deleteTask(id) {
//   console.log(id);
//   const index = tasks.findIndex((task) => task.id === Number(id));
//   if (index !== -1) {
//     tasks.splice(index, 1);
//     generateTask();
//     console.log(`Tâche avec l'ID ${id} supprimée.`);
//   } else {
//     console.log(`Aucune tâche trouvée avec l'ID ${id}.`);
//   }
// }

const deleteTask = (id) => {
  tasks.splice(id, 1); // Supprime l'élément à l'index `id`
  updateTaskIDs(); // Met à jour les IDs
  generateTask();
  generateCategoriesOptions();
  saveTasksToLocalStorage();
};

// Ajouter une tâche
const buttonAddTask = document.getElementById("add-task-icone");
const popUpForm = document.getElementsByClassName("container-popup-task")[0];
const description = document.getElementById("popup-input-description");
const title = document.getElementById("popup-task-name");
const button = document.getElementById("button-submit");
const color = document.querySelector("#popup-input-color");
const errorMsg = document.querySelector("#error-msg");
const category = document.querySelector("#popup-task-category");
const priority = document.querySelector("#popup-input-priority");

button.addEventListener("click", (event) => {
  event.preventDefault();

  const newTask = {
    id: tasks.length, // L'ID est égal à la taille actuelle du tableau
    title: title.value,
    description: description.value,
    state: "à faire",
    color: color.value,
    category: category.value,
    priority: priority.value,
  };

  title.addEventListener("input", (event) => {
    valueT = event.target.value;
    console.log(event.target.value); // Récupère la valeur actuelle
    console.log(`Valeur actuelle Title : ${valueT}`); // Affiche la valeur
    if (valueT.length > 0) {
      title.style.border = "1px solid lightgray";
    }
    checkFields();
  });

  description.addEventListener("input", (event) => {
    valueD = event.target.value; // Récupère la valeur actuelle
    console.log(`Valeur actuelle Description : ${valueD}`); // Affiche la valeur
    if (valueD.length > 0) {
      description.style.border = "1px solid lightgray";
    }
    checkFields();
  });

  // Vérification des champs vides avant d'ajouter la tâche
  if (newTask.title === "" && newTask.description === "") {
    errorMsg.classList.remove("hidden");
    errorMsg.textContent = "Remplissez vos champs";
    title.style.border = "2px solid red";
    description.style.border = "2px solid red";
    popUpForm.classList.remove("hidden");
    return; // Ne pas ajouter la tâche au tableau si les champs sont vides
  } else if (newTask.title === "") {
    errorMsg.classList.remove("hidden");
    errorMsg.textContent = "Votre tâche doit avoir un titre";
    title.style.border = "2px solid red";
    popUpForm.classList.remove("hidden");
    return; // Ne pas ajouter la tâche si le titre est vide
  } else if (newTask.description === "") {
    errorMsg.classList.remove("hidden");
    errorMsg.textContent = "Votre tâche doit avoir une description";
    description.style.border = "2px solid red";
    popUpForm.classList.remove("hidden");
    return; // Ne pas ajouter la tâche si la description est vide
  } else {
    // Ajouter la tâche seulement si les champs sont remplis
    tasks.push(newTask);
    generateTask();
    updateTaskIDs();
    generateCategoriesOptions()
    saveTasksToLocalStorage();
    popUpForm.classList.add("hidden");
  }
});

function checkFields() {
  let valueT = title.value.trim();
  let valueD = description.value.trim();

  if (valueT.length > 0 && valueD.length > 0) {
    errorMsg.classList.add("hidden");
  }
}

const displayPopUp = () => {
  // Vérification si l'élément existe
  buttonAddTask.addEventListener("click", () => {
    errorMsg.classList.add("hidden");
    popUpForm.classList.remove("hidden");
    console.log("Bouton cliqué !");
    description.value = "";
    title.value = "";
    category.value = "";
    priority.value = "";
  });
};

// Fermer la pop-up d'ajout d'une tâche
const closePopUpIcone = document.getElementById("close-popup-add-task");
if (closePopUpIcone) {
  closePopUpIcone.addEventListener("click", () => {
    popUpForm.classList.add("hidden");
  });
} else {
  console.error("Élément avec l'ID 'close-popup-add-task' non trouvé.");
}

//POP UP MODIFICATION

saveModifiedButton.addEventListener("click", (event) => {
    event.preventDefault();

    const taskIndex = tasks.findIndex(task => task.id === currentTaskId);
    console.log(taskIndex);
    // Mettre à jour les informations de la tâche
    tasks[taskIndex].title = modifiedTitle.value;
    tasks[taskIndex].description = modifiedDescription.value;
    tasks[taskIndex].color = modifiedColor.value;
    tasks[taskIndex].state = modifiedStatus.value;
    tasks[taskIndex].priority = modifiedPriority.value;
    tasks[taskIndex].category = modifiedCategory.value;

    // Fermer le pop-up et rafraîchir l'affichage des tâches
    popUpFormModified.classList.add("hidden");
    generateTask();
    currentTaskId = null; // Réinitialiser l'ID de la tâche courante

    

});


// Fermer le pop-up de modification
closePopUp.addEventListener("click", () => {
    popUpFormModified.classList.add("hidden");
});

//stockage des tâches dans le local storage
const saveTasksToLocalStorage = () => {
  localStorage.setItem("Saved Tasks", JSON.stringify(tasks));
};

const loadTasksFromLocalStorage = () => {
  let storedTasks = localStorage.getItem("Saved Tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks); // Met à jour les tâches existantes
    updateTaskIDs(); // Réindexe les IDs si nécessaire
    generateCategoriesOptions() 
  }
};

// Met à jour les IDs des tâches
const updateTaskIDs = () => {
  tasks.forEach((task, index) => {
    task.id = index; // ID = index dans le tableau
  });
};



// FILTRER LES TACHES PAR CATEGORIE
const filterCategory = document.querySelector(".container-filter-selection");
const filterButton = document.querySelector(".container-categoryFilter");

filterButton.addEventListener("click", () => {
  filterCategory.classList.toggle("hidden");
});

// Fonction pour récupérer les catégories uniques et les ajouter au sélecteur
const generateCategoriesOptions = () => {
  const selectInputCategory = document.getElementById("category-input-filter");
  
  // Réinitialiser le contenu du menu déroulant
  selectInputCategory.innerHTML = ""; // Supprimer toutes les options existantes
  
  // Récupérer toutes les catégories des tâches
  const categories = tasks.map(task => task.category).filter(category => category !== ""); // Filtrer les catégories vides
  
  // Rendre les catégories uniques
  const uniqueCategories = [...new Set(categories)];
  
  // Ajouter une option par catégorie unique
  uniqueCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    selectInputCategory.appendChild(option);
  });
};

loadTasksFromLocalStorage();
generateCategoriesOptions();
filterTasksByCategory();
generateTask();
displayPopUp();