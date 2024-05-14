<?php
require_once "../cors.php";
require_once "../config.php";
require_once "utility.php";

$data = getRequestDataBody();

  $sql = "UPDATE `user` SET `nome` = '" . $data["nome"] . "', `cognome` = '" . $data["cognome"] . "', `email` = '" . $data["email"] . "', 
  `telefono` = '" . $data["telefono"] . "', `company` = '" . $data["company"] . "', `active` = '" . $data["active"] . "', `view` = '" . $data["view"] . "' WHERE `user`.`id` = " . $data["id"] . ";";

$result = $conn->query($sql);

echo $result;
?>