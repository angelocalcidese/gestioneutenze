<?php 
require_once "../cors.php";
require_once "../config.php";

$sql = "SELECT * FROM `user`";
$result = $conn->query($sql);
$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $object = new stdClass(); 
        $object->id = $row["id"]; 
        $object->nome = $row["nome"]; 
        $object->cognome = $row["cognome"]; 
        $object->company = $row["company"]; 
        $object->firstaccess = $row["firstaccess"]; 
        $object->active = $row["active"]; 
        $object->email = $row["email"]; 
        $object->telefono = $row["telefono"];
        $object->view = $row["view"]; 
        array_push($data, $object);
    }
  } else {
    echo "0 results";
  }

  //print_r($data);
 echo json_encode($data);

$conn->close();
?>