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

const generateTask = () => {
    tasks.forEach(task => {
        
        const html_section = document.querySelector('section');
        const html_taskArticle = document.createElement('article');
        const html_containerTaskHeader = document.createElement('div');
        const html_taskTitle = document.createElement('h3');
        const html_modifyIcone = document.createElement('span');
        const html_containerBodyTask = document.createElement('div');
        const html_descriptionTask = document.createElement('p');
        const html_containerModificationOfTask = document.createElement('div');
        const html_buttonModifyTask = document.createElement('button');
        const html_buttonDelete = document.createElement('button');

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
        html_modifyIcone.textContent = '...';
        html_buttonModifyTask.textContent = 'Modifier';
        html_buttonDelete.textContent = 'Supprimer';

        return ;

    });
}
generateTask();


const buttonDelete = document.getElementById("delete-task-button");
let id = buttonDelete.dataset.id;

function deleteTask(id){
    if (id === tasks.filter(task => task.id === id )){
        tasks.splice(id, 1); //supprime
        console.log(`Tâche avec ID ${id} supprimée.`);//affiche dans la console que la tâche à était supprimer
    } else{
        console.error("Introuvable");    
    }
}

buttonDelete.addEventListener('click', () => {
    deleteTask(id);
});



