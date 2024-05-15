<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";

$sql = "SELECT * FROM `addon` ORDER BY `tipologia`";
$result = $conn->query($sql);
$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $object = new stdClass();
        $object->id = $row["id"];
        $object->name = $row["voce"];
        $object->tipologia = $row["tipologia"];
        array_push($data, $object);
    }
} else {
    echo "0 results";
}

//print_r($data);
echo json_encode($data);

$conn->close();
