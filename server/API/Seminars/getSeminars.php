<?php

require_once __DIR__.'/../../global.php';

// Authentication
$token = $_SESSION['token'];
$user = verify_token($token, ACCESS_KEY);

if(!$user){
    sendResponse(
            401,
            "Unauthorize",
            ["Error"=>"Token failed to verify"],
            "invalid token"
        );
        exit();
}

// Get all results
$query = "SELECT * FROM seminars";
$result = $conn->query($query);

$seminars = [];
while($row = $result->fetch_assoc()) {
    $seminars[] = $row;
}

sendResponse(
    200,
    "Success",
    [
        "seminars" => $seminars
    ],
    "Seminars retrieved successfully"
);