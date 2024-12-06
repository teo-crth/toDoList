const task = {
    id: 1,
    title: 'Tâche 1',
    description: 'My description',
    state: 'à faire',
    color: 'blue'
}

const taskArray = [task];

const buttonDelete = document.getElementById("delete-task-button");

function deleteTask(id){
    if (id === taskArrey[task.id]){
        taskArray.splice(index,1); //supprime
        console.log(`Tâche avec ID ${taskId} supprimée.`);//affiche dans la console que la tâche à était supprimer
    } else{
        console.error("Introuvable");    
    }
   
}

buttonDelete.addEventListener('click', () => {
    deleteTask(id);
});

