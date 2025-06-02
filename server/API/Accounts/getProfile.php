<?php

require_once __DIR__.'/../../global.php';

$token = $_SESSION['token'];
$user = verify_token($token, ACCESS_KEY);

if(!$user){  
    sendResponse(
        401,
        "Unauthorize",
        ["Error"=>"Token failed to verify"],
        "User Does not have an account yet"
    );
    exit();
}

//! ERROR NOT RECEIVING ANY JSON ON DETAILS.PHP

$Account = new Account($user['ID']);

$details = $Account->getDetails();

if($details['profile_picture'] != null){
    sendImageResponse($details['profile_picture']);
    exit();
}

echo "No Image Found";
