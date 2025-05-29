<?php

require_once __DIR__."../../global.php";

// Request Body
$req = getJsonBody();

$firstName = $req['firstName'];
$lastName = $req["lastName"];
$gender = $req["gender"];
$clientProfile = $req["clientProfile"];
$address = $req["address"];
$telNo = $req["telephoneNum"];
$cellNo = $req["celphoneNum"];
$occupation = $req["occupation"];
$position = $req["position"];
$institution = $req["institution"];
$email = $req["email"];

if(!$firstName || !$lastName || !$gender || $clientProfile === "default" || !$address || !$occupation || !$position || !$institution || !$email){
    sendResponse(404, "Bad Request", [], "All inputs are required");
    exit();
}

// Add the account to the database
