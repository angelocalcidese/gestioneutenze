<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";

$data = getRequestDataBody();
//$sql3 = "DELETE FROM `permission` WHERE `user`= " . $data["id"];
//$result3 = $conn->query($sql3);

$sql = "DELETE FROM permission WHERE `permission`.`user` = " . $data["id"];
$result = $conn->query($sql);

$sql1 = "DELETE FROM user WHERE `id` = ". $data["id"];
$result1 = $conn->query($sql1);

echo $result;
?>