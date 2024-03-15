const btn = document.getElementById('btn');
const container = document.getElementById('container-users');

btn.addEventListener('click', () =>{
    container.innerText = ""; 

    getUsers(function(users){
        const ul = document.createElement('ul');

        for (let i = 0; i < users.length; i ++) {
            const li = document.createElement('li');
            const btnLi = document.createElement('button');
            btnLi.innerText = "Get User Info";

            li.innerText = users[i].name;
            li.appendChild(btnLi);

            ul.appendChild(li);

            btnLi.addEventListener('click', () =>{
                const id = users[i].id;
                getInfo(id, (info) =>{
                    const ol = document.createElement("ol");
                    ol.innerHTML = `
                        <li> ${info.fullname} </li>
                        <li> ${info.birthday} </li>
                    `;
                    li.appendChild(ol);
                });
            });
        }

        container.appendChild(ul);
        
    });
});

function getUsers(callback) {
    const time = (Math.floor(Math.random() * 5) + 1) * 1000;
    setTimeout(() => {
        const users = [
            {id: 1, name: "Samuel", years: 22},
            {id: 2, name: "Salvador" , years: 30} 
        ];
        callback(users);
    }, time);
}

function getInfo(id, callback){
    const time = (Math.floor(Math.random() * 5) + 1) * 1000;
    setTimeout(() => {
        const userInfo = [
            {id: 1, idUser: 2, fullname: "Salvador Soto", birthday: "200l-12-23"},
            {id: 2, idUser: 1, fullname: "Samuel Torres" , birthday: "2001-12-22"} 
        ];

        const userFindInfo = userInfo.find(user => {
            return user.idUser === id
        });

        callback(userFindInfo);
    }, time);
}