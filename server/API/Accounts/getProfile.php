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

$Account = new Account($user['ID']);

$details = $Account->getDetails(false);

if($details['profile_picture'] != null){
    sendImageResponse($details['profile_picture']);
    exit();
}

sendResponse(
    404,
    "Not Found",
    [
        "error" => "Resource not found or User has no profile picture",
        "value" => "None"
    ],
    "Profile picture defaulting"
);
