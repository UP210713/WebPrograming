export async function getAllUsers(){
    const resp = await fetch("api/getUsers.php");
    const json = await resp.json(); 
    return json;
}


export async function getAllTasks(){
    const resp = await fetch("api/getTasks.php");
    const json = await resp.json(); 
    return json;
}

export async function getAllTask(){
    const resp = await fetch("api/getTask.php");
    const json = await resp.json(); 
    return json;
}

