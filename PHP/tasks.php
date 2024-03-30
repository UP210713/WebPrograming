<?php

include "./partials/connection.php";

try {
    $sql = "select * from task;";
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