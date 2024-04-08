<?php
require_once "../cors.php";
require_once "../config.php";
require_once "utility.php";

$data = getRequestDataBody();
$sql = "DELETE FROM permission WHERE `permission`.`user` = " . $data["id"];
$result = $conn->query($sql);

$sql1 = "DELETE FROM user WHERE `id` = ". $data["id"];
$result1 = $conn->query($sql1);

echo $result;
?>