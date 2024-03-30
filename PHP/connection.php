<?php

include "./partials/connection.php";

try {
   
//Para ejecutar estructuras SQL en PHP
//Se utiliza la función fetch para mostrar el valor
$result = $conn->query("select * from user;");
//Se crea un array para hacer un "push"
$json = [];
while ($row = $result->fetch()) { 
    array_push($json, [
        "id" => $row["id"],
        "firstName" => $row["lastName"],
        "lastName" => $row["lastName"],
        "email" => $row["email"]
    ]);
}
$jsonString = json_encode($json);
echo $jsonString;

} catch (PDOException $e) {
    echo $e->getMessage();
}

