<?php

include "./partials/connection.php";

$idUser = $_GET['id'];

try {
    $sql = "select * from task where idUser = {$idUser};";
    $state = $conn->query($sql);    
    $json = [];
    while($row = $state->fetch()){
        $json[] = [
            "id" => $row['idTask'],
            "idUser" => $row['idUser'],
            "tittle" => $row['title'],
            "completed" => $row['completed']
        ];
    }
    
    $jsonString = json_encode($json);
    echo $jsonString;
} catch (PDOException $e) {
    echo $e->getMessage();
}