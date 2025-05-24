<?php
function sendResponse(int $statusCode = 200, string $status = "success", array $data = [], string $message = ""): void {
    // Set HTTP status code
    http_response_code($statusCode);

    // Set JSON headers
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Origin: *"); // Optional, add if you want CORS enabled

    // Prepare response array
    $response = [
        "status" => $status
    ];

    if ($message !== "") {
        $response["message"] = $message;
    }

    if (!empty($data)) {
        $response["data"] = $data;
    }

    // Output JSON and stop script execution
    echo json_encode($response);
    exit;
}
