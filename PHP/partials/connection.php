<?php

header("Access-Control-Allow-Origin: *");

try {
    // Conexion a la base de datos
    $conn = new PDO(
        "mysql:host=localhost;dbname=tasklist",
        "root",
        ""
    );
} catch (PDOException $e) {
    echo $e->getMessage();
}