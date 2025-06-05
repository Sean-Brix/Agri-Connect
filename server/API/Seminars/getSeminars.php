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

// Get pagination parameters
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 12;
$start = ($page - 1) * $limit;

// Get total count
$countQuery = "SELECT COUNT(*) as total FROM seminars";
$totalResult = $conn->query($countQuery);
$total = $totalResult->fetch_assoc()['total'];

// Get paginated results
$query = "SELECT * FROM seminars LIMIT $start, $limit";
$result = $conn->query($query);

$seminars = [];
while($row = $result->fetch_assoc()) {
    $seminars[] = $row;
}

// Prepare pagination info
$totalPages = ceil($total / $limit);

sendResponse(
    200,
    "Success",
    [
        "seminars" => $seminars,
        "pagination" => [
            "page" => $page,
            "limit" => $limit,
            "total" => $total,
            "totalPages" => $totalPages
        ]
    ],
    "Seminars retrieved successfully"
);