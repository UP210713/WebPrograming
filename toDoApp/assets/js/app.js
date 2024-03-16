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