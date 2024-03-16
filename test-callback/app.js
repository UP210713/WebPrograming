console.log("This is working");
// Es que una funcion reciba como parametro otra funcion
function sum(a, b){
    return a + b;
}
function sumaDosNumeros (callback){
    const resultadoSuma = sum(1,2);

    //Realice anteriormente varias cosa mas!!! ...

    callback(resultadoSuma);
}
function algo(valor){
    console.log(valor);
}
sumaDosNumeros(algo);

const button = document.getElementById("btn");
const container = document.getElementById("container");

button.addEventListener('click', function(){
    getUsers()
        .then(function(json){
            const ul = document.createElement("ul");
            for (let i = 0; i < json.usuarios.length; i ++){
                const li = document.createElement("li");

                li.innerText = json.usuarios[i].name;
                ul.appendChild(li);
            }

            container.appendChild(ul);
            console.log(json.usuarios);
        });;
});

function getUsers(){
    return fetch("http://127.0.0.1:5000/test-callback/info.json")
        .then(function(response){
            return response.json();
        });
}

