<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";

$data = getRequestDataBody();

$sql = "SELECT * FROM `permission` WHERE `function` = ". $data["id"]." AND `user` = ".$data["user"];
$result = $conn->query($sql);
$pres = "Errore";
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {    
        $cud = $row["cud"]; 
        $id = $row["id"];
    }

    if($cud == true){
       $active = 0;
    } else {
        $active = 1;
    }
    $sql1 = "UPDATE `permission` SET `cud` = $active WHERE `permission`.`id` = ". $id;
   // $sql1 = "DELETE FROM permission WHERE `permission`.`user` = " . $data["user"] . " AND `permission`.`function` = " . $data["id"];
    $result1 = $conn->query($sql1);
   
} else {
    $sql1 = "INSERT INTO `permission` (`id`, `user`, `function`, `cud`) VALUES (NULL, '" . $data["user"] . "', '". $data["id"]."', 1)";
    $result1 = $conn->query($sql1);
}

//print_r($data);
//echo $pres;
echo $result1;

$conn->close();
