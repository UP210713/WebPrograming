<?php
include "./partials/connection.php";

$idTask = $_GET['id'];

try {
    $sql = "select * from task where idTask = {$idTask};";
    $state = $conn->query($sql);
    
    $row = $state->fetch();
    $json = [
        "id" => $row['idTask'],
        "idUser" => $row['idUser'],
        "tittle" => $row['title'],
        "completed" => $row['completed'] == 1 
    ];
    $jsonString = json_encode($json);
    echo $jsonString;
} catch (PDOException $e) {
    echo $e->getMessage();
}