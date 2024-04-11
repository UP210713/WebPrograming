<?php

include "./partials/Connection.php";

$selectTaskId = $_POST['taskId'];

try {
    $deleteStatement = $conn->prepare("DELETE FROM task WHERE id = ?");
    $deleteStatement->execute([$selectTaskId]);

} catch (PDOException $e) {
    echo json_encode();
}
?>