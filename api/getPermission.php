<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";

$data = getRequestDataBody();

$sql = "SELECT * FROM `permission` WHERE `user` = " . $data["id"];
$result = $conn->query($sql);
$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $object = new stdClass();
        $object->id = $row["id"];
        $object->user = $row["user"];
        $object->func = $row["function"];
        $object->cud = $row["cud"];
        array_push($data, $object);
    }
} else {
    echo "0 results";
}

//print_r($data);
echo json_encode($data);

$conn->close();
?>