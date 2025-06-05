<?php

require_once __DIR__.'/../../global.php';
require_once __DIR__.'/../../Controller/Seminars/searchSeminar.php';

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

$find = $_GET['find'];
$filter = $_GET['filter'];

$validFilters = ['all', 'speaker', 'title', 'location', 'status'];
$filter = strtolower($filter);

if (!in_array($filter, $validFilters)) {
    sendResponse(
        400,
        "Bad Request",
        ["Error" => "Invalid filter value"],
        "invalid filter"
    );
    exit();
}

$result = searchSeminars($find, $filter);

echo json_encode($result);