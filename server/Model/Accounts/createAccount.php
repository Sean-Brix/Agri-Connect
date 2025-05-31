<?php

require_once __DIR__.'/../../global.php'; 

function createAccount($params){

    $query = "INSERT INTO `accounts` (
        `firstname`, `lastname`, `gender`, 
        `client_profile`, `address`, 
        `telephone_no`, `cellphone_no`, 
        `occupation`, `position`, 
        `institution`, `email_address`, 
        `username`, `password`) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    
    $types = getTypes($params);
    
    $result = statement($query, $params, $types);

    return $result;
}