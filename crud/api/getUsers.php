<?php

include "./partials/Connection.php";

try {
    $SQL = "Select * from user;";

    $state = $conn->query($SQL);
    $json = [];
    while ($row = $state->fetch(PDO::FETCH_ASSOC)) {
        $json [] = [
            "id" => $row['id'],
            'fullname' => "{$row['firstName']}{$row['lastName']}"
        ];
    }
    echo json_encode($json);
} catch (PDOException $e) { 
    die($e->getMessage());
}