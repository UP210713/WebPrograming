<?php

include "./partials/Connection.php";

$title = $_POST['title'];
$userId = $_POST['users'];

try {
    $insertStatement = $conn->prepare("INSERT INTO task (idUser, title, completed) VALUES (?, ?, 0)");
    $insertStatement->execute([$userId, $title]);

} catch (PDOException $e) {
    die($e->getMessage());
}
?>