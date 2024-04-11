<?php

include "./partials/Connection.php";

$tittle = $_POST['title'];
$idUser = $_POST["users"];
$idTask = $_POST["id"];

try {
        $updateStatement = $conn->prepare("UPDATE task SET title = ?, idUser = ? WHERE id = ?");
        $updateStatement->execute([$tittle, $idUser, $idTask]);

} catch (PDOException $e) {
    echo json_encode();
}
?>