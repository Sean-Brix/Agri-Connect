<?php

require_once __DIR__.'/../../global.php'; 

function createAccount($data){
    global $conn;

    $query = "INSERT INTO 'accounts'";


    $result = mysqli_query($conn, $query);

    return $result;
}