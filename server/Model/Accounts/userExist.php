<?php

require_once __DIR__."/../../global.php";

function usernameExist(string $username): bool{
    global $conn;
    
    $query = "SELECT id FROM `accounts` WHERE username = ?";

    $result = statement($query, [$username], "s");

    $exist = mysqli_fetch_assoc($result) !== null;
    
    return $exist;
}