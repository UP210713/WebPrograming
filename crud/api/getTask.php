<?php

include "./partials/Connection.php";

$selectIdTask = $_GET['selectedTaskId'];

try{
    $SQL = "select u.id , u.firstName, t.id as idTask, t.title
    from user u inner join task t
    on  u.id = t.idUser
    where t.id = :idTask;";

    
    $state = $conn->prepare($SQL);
    $state->bindParam(':idTask', $selectIdTask);
    $state->execute();

    $json = [];
    while($row = $state->fetch(PDO::FETCH_ASSOC)){
        array_push($json, [
            "iduser" => $row['id'],
            "name" => $row['firstName'],
            "idtask" => $row['idTask'],
            "title" => $row['title'] 
        ]);
    }

    echo json_encode($json);
}catch(PDOException $e){
    die($e->getMessage());
}
