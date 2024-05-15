<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";
require_once "../createPassword.php";
require_once "sendMailMessage.php";
//require_once "userExist.php";

$data = getRequestDataBody();

$ut_sql = "SELECT * FROM `user` WHERE `email` = '".$data["email"]."'";
    $ut_result = $conn->query($ut_sql);
   
    if ($ut_result->num_rows > 0) {
        $exist = false;
        $respData = (object) array('error' => "E-mail già esistente");
    } else {
        $exist = true;     
    }

if($exist){
    $password = random_str(10);
    $hash = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO `user` (`id`, `nome`, `cognome`, `email`, `telefono`, `active`, `password`, `company`, `firstaccess`) 
    VALUES (NULL, '" . $data["nome"] . "', '" . $data["cognome"] . "', '" . $data["email"] . "', '" . $data["telefono"] . "', '1', '" . $hash . "', '" . $data["company"] . "', '1');";
    $result = $conn->query($sql);

    $title = "Benvenuto nel Portale EasySw";
    $message = "Il suo account EasySW &egrave; stato cretato con successo. <br><br> 
    Puoi accedere al seguente <a href='https://www.easysw.it/login.php'><b>Link</b></a> per modificare la password e accedere al Portale.<br><br>
    La sua utenza &egrave; la seguente, <br> Login: ".$data["email"]."<br> Password Provvisoria: ".$password. "<br> Grazie.";

    sendEmail($data["email"], $message, $title);
    echo $result;
} else {
    echo json_encode($respData);
}


?>