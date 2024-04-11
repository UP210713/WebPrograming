<?php

include "./partials/Connection.php";

try{
    $SQL = "select u.id , u.firstName, t.id, t.title, t.idUser
    from user u inner join task t
    on  u.id = t.idUser;";

    
    $state = $conn -> query($SQL);

    $json = [];
    while($row = $state->fetch(PDO::FETCH_ASSOC)){
        array_push($json, [
            "iduser" => $row['idUser'],
            "name" => $row['firstName'],
            "idtask" => $row['id'],
            "tittle" => $row['title'], 
        ]);
    }

    echo json_encode($json);
}catch(PDOException $e){
    die($e->getMessage());
}