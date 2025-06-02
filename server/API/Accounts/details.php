<?php

require_once __DIR__."/../../global.php";

// Cookie Token
$token = $_SESSION["token"];

// Authenticate
$decoded = verify_token($token, ACCESS_KEY);

// No Account Response
if(!$decoded){  
    sendResponse(
        401,
        "Unauthorize",
        ["Error"=>"Token failed to verify"],
        "User Does not have an account yet"
    );
    exit();
}

$Account = new Account($decoded["ID"]);

$details = $Account->getDetails();

// Remove data
unset($details["password"]);
unset($details["updated_at"]);

sendResponse(
    200,
    "success",
    $details,
    "Account Details Retrieved - ". $details["username"]
);