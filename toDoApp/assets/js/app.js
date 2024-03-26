const userSelect = document.getElementById('select-users');
const userContainer = document.getElementById('user-container');
const taskContainer = document.getElementById('task-container');
const displayButton = document.getElementById('btndisplay');

displayButton.addEventListener('click', () => {
    updateUserAndTasks();
});

function updateUserAndTasks() {
    const userId = userSelect.value;
    getUser(userId)
        .then(user => {
            updateUserDisplay(user);
            return getTasks(user.id);
        })
        .then(tasks => {
            updateTaskDisplay(tasks);
            toggleTaskContainerVisibility();
        });
}

function updateUserDisplay(user) {
    const fullName = `${user.firstname} ${user.lastname}`;
    const email = user.email;
    userContainer.children[1].children[0].children[0].textContent = fullName;
    userContainer.children[1].children[1].children[0].textContent = email;
}

function updateTaskDisplay(tasks) {
    const ul = taskContainer.children[1];
    ul.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        li.innerText = `${task.id}. ${task.title}`;
        checkbox.checked = task.completed;
        li.appendChild(checkbox);
        ul.appendChild(li);
    });
}

function toggleTaskContainerVisibility() {
    taskContainer.style.visibility = 'visible';
}

function getUser(userId) {
    return fetch('data/usuarios.json')
        .then(resp => resp.json())
        .then(users => users[userId - 1]);
}

function getTasks(userId) {
    return fetch('data/tareas.json')
        .then(resp => resp.json())
        .then(tasks => tasks.filter(task => task.userId == userId));
}


/* UNA MEJOR MANERA DE HACERLO */
/* 
document.addEventListener('DOMContentLoaded', ()=>{
    getAllusers()
        .then(allUsers =>{
            let template = ""
            for (let i = 0; i < allUsers.length; i ++){
                template += `
                    <option value="${allUsers[i].id}">${allUsers[i].fistname}</option>
                `;
            }
            userSelect.innerHTML = template;
        });
});

userSelect.addEventListener('change', ()=>{
    const id = parseInt(e.target.value);
    getAllUsers()
        .then(allUsers =>{
            const ul = document.createElement('ul')
            for(let i = 0; i < allUsers.lentgh; i ++){
                if (id === allUsers[i].id){
                    const liNombre = document.createElement('li')
                    const liCorreo = document.createElement('li')
                    liNombre.innerText = `${allUsers[i].firstname} ${allUsers[i].lastname}`
                    liCorreo.innerText = `${allUsers[i].email};
                    ul.appendChild(liNombre);
                    ul.appendChild(liCorreo);
                    break;
                }
            }
            const h3 =  document.createElement('h3');
        });
});
*/