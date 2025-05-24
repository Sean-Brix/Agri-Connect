<?php

function getJsonBody() {
    
    $input = file_get_contents("php://input");
    $decoded = json_decode($input, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        header("Content-Type: application/json; charset=UTF-8");
        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => "Invalid JSON"
        ]);
        exit;
    }

    return $decoded;
}

