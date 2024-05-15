<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";

$data = getRequestDataBody();

$sql = "SELECT * FROM `permission` WHERE `function` = ". $data["id"]." AND `user` = ".$data["user"];
$result = $conn->query($sql);
$pres = "Errore";

if ($result->num_rows > 0) {
    $sql1 = "DELETE FROM permission WHERE `permission`.`user` = " . $data["user"] . " AND `permission`.`function` = " . $data["id"];
    $result1 = $conn->query($sql1);
    $pres = "Rimosso correttamente";
} else {
    $sql1 = "INSERT INTO `permission` (`id`, `user`, `function`) VALUES (NULL, '" . $data["user"] . "', '". $data["id"]."')";
    $result1 = $conn->query($sql1);
    $pres = "Aggiunto correttamente";
}

//print_r($data);
//echo $pres;
echo $pres;

$conn->close();
