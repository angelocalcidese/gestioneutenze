<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";
require_once "../createPassword.php";
require_once "sendMailMessage.php";

$data = getRequestDataBody();

$password = random_str(10);
$hash = password_hash($password, PASSWORD_DEFAULT);

$sql = "UPDATE `user` SET `password` = '" . $hash . "', `firstaccess` = '1' WHERE `user`.`id` = " . $data["id"];
$result = $conn->query($sql);

$title = "Benvenuto nel Portale EasySw";
$message = "Il suo account EasySW è stato resettato con successo. <br> La sua utenza è la seguente, <br> Login: " . $data["email"] . "<br> Password:" . $password . "<br> Grazie.";

sendEmail($data["email"], $message, $title);

echo $result;
?>