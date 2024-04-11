import { getAllTasks, getAllUsers, } from './petitions.js';


const listUsers = document.getElementById('users');
const tasksTable = document.getElementById('tasks');
const taskSelect = document.getElementById('listTasks');
const formTask = document.getElementById('form-task');
let isUpdatingTask = false;
let seleccionarID;
const btnUP = formTask.children[3];


document.addEventListener('DOMContentLoaded', async () => {
    const users = await getAllUsers();
    const tasks = await getAllTasks(); 

    let template = listUsers.innerHTML;
    let templateTasks = tasksTable.innerHTML;
    templateTasks = '';
    let templateTask = taskSelect.innerHTML;
    for ( const user of users) {
        template += `
        <option value="${user.id}">${user.fullname}</option>
        `;
    };

    for (const task of tasks){
        templateTasks += `
        <tr>
            <td>${task.iduser}</td>
            <td>${task.name}</td>
            <td>${task.idtask}</td>
            <td>${task.tittle}</td> 
            <td></td>
            <td>
            <button class="actualizar btn btn-secondary btn-sm" value="${task.idtask}">
              <span>Update</span> <i class="nf nf-md-pencil"></i>
            </button>
            <button class="borrar btn btn-danger btn-sm" value="${task.idtask}">
              <span>Delete</span> <i class="nf nf-cod-trash"></i>
            </button>
          </td>
        </tr>     
        `;
    };

    for (const tareas of tasks) {
        templateTask += `
        <option value="${tareas.idtask}">${tareas.idtask}</option>
        `;
    };
    listUsers.innerHTML = template;
    tasksTable.innerHTML = templateTasks; 
    taskSelect.innerHTML = templateTask; 

    taskSelect.addEventListener('change', async function() {
      const selectedValue = this.value;

      const answer = await fetch(`api/getTask.php?selectedTaskId=${selectedValue}`);
      const data = await answer.json();

      let templateTasks = '';

      for (const task of data) {
          templateTasks += `
              <tr>
                  <td>${task.iduser}</td>
                  <td>${task.name}</td>
                  <td>${task.idtask}</td>
                  <td>${task.title}</td> 
                  <td></td>
                  <td>
                      <button class="actualizar btn btn-secondary btn-sm" value="${task.idtask}">
                          <span>Update</span> <i class="nf nf-md-pencil"></i>
                      </button>
                      <button class="borrar btn btn-danger btn-sm" value="${task.idtask}">
                          <span>Delete</span> <i class="nf nf-cod-trash"></i>
                      </button>
                  </td>
              </tr>     
          `;
      }
      tasksTable.innerHTML = templateTasks;
  });

  document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('borrar')) {
        const taskId = event.target.value;
        const formData = new FormData();
        formData.append('taskId', taskId);
        await fetch('api/deleteTask.php', {
            method: 'POST',
            body: formData
        });
        
    }
});

    formTask.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(formTask);
    const title = formData.get('title');
    const userId = formData.get('users');
    if (!isUpdatingTask) {
        await fetch('api/createTask.php', {
            method: 'POST',
            body: formData
        });
    } else {
        const id = seleccionarID; 
        formData.append('id', id); 
        await fetch(`api/updateTask.php?id=${id}`, {
            method: 'POST',
            body: formData
        });
    }
});

document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('actualizar')) {
        const idTask = event.target.value;
        seleccionarID = idTask;
        const infoTask = await fetch(`api/getTask.php?selectedTaskId=${seleccionarID}`);
        const data = await infoTask.json();
        formTask.children[0].children[0].value = data[0].title;
        formTask.children[1].children[0].value = data[0].iduser;
        btnUP.innerText = "UPDATE";
        isUpdatingTask  = true;
        
    } 
  });

});
