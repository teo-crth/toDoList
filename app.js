// TABLEAU DES TACHES

    const tasks = [
        {
        id: 1,
        title: 'Tâche 1',
        description: 'iiiiiiiiiiiiiiiiiiiiiiiiiiii',
        state: 'à faire',
        color: 'blue'
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
        }
    ];

// Générer les tâches
    const generateTask = () => {
        
        const html_section = document.querySelector('section');
        html_section.innerHTML = '';

        tasks.forEach(task => {
            
            const html_taskArticle = document.createElement('article');
            const html_containerTaskHeader = document.createElement('div');
            const html_taskTitle = document.createElement('h3');
            const html_modifyIcone = document.createElement('span');
            const html_containerBodyTask = document.createElement('div');
            const html_descriptionTask = document.createElement('p');
            const html_containerModificationOfTask = document.createElement('div');
            const html_buttonModifyTask = document.createElement('button');
            const html_buttonDelete = document.createElement('button');
            const html_closeEditTask = document.createElement('span');
            
            // Add classes
            html_containerTaskHeader.classList.add('container-task-header');
            html_taskTitle.classList.add('task-name');
            html_modifyIcone.classList.add('modify-icon');
            html_containerBodyTask.classList.add('container-task-body');
            html_descriptionTask.classList.add('description-task');
            html_containerModificationOfTask.classList.add('container-modificationOfaTask', 'hidden');
            html_buttonModifyTask.classList.add('modify-task-button');
            html_buttonDelete.classList.add('delete-task-button');
            html_buttonDelete.setAttribute('data-id', task.id);
            html_closeEditTask.classList.add('close-edit-task');
            
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
            html_modifyIcone.textContent = '...';
            html_closeEditTask.textContent = 'X';
            html_buttonModifyTask.textContent = 'Modifier';
            html_buttonDelete.textContent = 'Supprimer';
            
            return ;
            
        });
    }

    generateTask();
    
    // Supprimer une tâche
    const buttonDelete = document.getElementsByClassName("delete-task-button");
    
    for (let i = 0; i < buttonDelete.length; i++) {
        // Ajouter un événement de clic à chaque bouton de suppression
        buttonDelete[i].addEventListener('click', () => {
            // Récupérer l'ID du bouton de suppression à partir de son dataset
            let id = buttonDelete[i].dataset.id;
            
            // Appeler la fonction deleteTask avec l'ID récupéré
            deleteTask(id);            
        });
    }

    function deleteTask(id){
        
        console.log(id);
        const index = tasks.findIndex(task => task.id === Number(id));
        console.log("indexxxx",index);
        if (index !== -1) {
            // Si une tâche avec cet id est trouvée, la supprimer
            tasks.splice(index, 1);
            generateTask();
            console.log(`Tâche avec l'ID ${id} supprimée.`);
        } else {
            // Si la tâche n'est pas trouvée
            console.log(`Aucune tâche trouvée avec l'ID ${id}.`);
        }

    }
    
    // ouvrir la div de modification/suppression d'une tache
    const html_modifyIcone = document.getElementsByClassName('modify-icon');
    const html_containerModificationOfTask = document.getElementsByClassName('container-modificationOfaTask');
    
    for (let i = 0; i < html_modifyIcone.length; i++) {
        html_modifyIcone[i].addEventListener('click', () => {
            // Cible le conteneur correspondant en utilisant l'index
            html_containerModificationOfTask[i].classList.toggle('hidden');
        });
    }

    // Fermer la div de modification/suppression d'une tache
    const html_closeEditTask = document.getElementsByClassName('close-edit-task');

    for (let i = 0; i < html_closeEditTask.length; i++) {
        html_closeEditTask[i].addEventListener('click', () => {
            // Fermer le conteneur correspondant
            Array.from(html_containerModificationOfTask).forEach(elem => {
                elem.classList.add('hidden');
            });
        });
    }


// Ajouter une tâche
const buttonAddTask = document.getElementById("add-icone");

const popUpForm = document.getElementsByClassName("container-popup-task")[0];

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

// Fermer la pop d'ajout d'une tâche
  const closePopUpIcone = document.getElementById("close-popup-add-task");
  closePopUpIcone.addEventListener("click", () => {
      popUpForm.classList.add("hidden");
  });




//POP UP MODIFICATION

const buttonModifiedTask = document.getElementsByClassName("modify-task-button");
const popUpFormModified = document.getElementsByClassName("container-popup-modified")[0];
const closePopUp = document.getElementById("close-popup-modified");

const PopUp = () => {
    for ( i=0; i < buttonModifiedTask.length; i++){
        buttonModifiedTask[i].addEventListener("click", () => {
        popUpFormModified.classList.remove("hidden");
        document.getElementById("popup-input-description").value = "";
        document.getElementById("popup-task-name").value = "";
         });
    }
};

PopUp();

closePopUp.addEventListener("click", () => {
    popUpFormModified.classList.add("hidden");
});

// const buttonSubmitModified = document.getElementById("button-submit-modified");

// buttonSubmitModified.addEventListener("click", () => {
//     const index = tasks.findIndex(task => task.id === currentTaskId);
//     if (index !== -1) {
//         tasks[index].title = titleModified.value;
//         tasks[index].description = descriptionModified.value;
//         popUpFormModified.classList.add("hidden");
//         generateTask();
//     }
// });

