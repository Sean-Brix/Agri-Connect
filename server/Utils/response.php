<?php
function sendResponse(int $statusCode = 200, string $status = "success", array $payload = [], string $message = ""): void {
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

    if (!empty($payload)) {
        $response["payload"] = $payload;
    }

    // Output JSON and stop script execution
    echo json_encode($response);
    exit;
}


function sendImageResponse(string $imageBlob): void {
    // Create finfo object to detect MIME type
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mimeType = $finfo->buffer($imageBlob);
    
    // Set appropriate headers for image response
    header("Content-Type: " . $mimeType);
    header("Content-Length: " . strlen($imageBlob));
    
    // Output the image data
    echo $imageBlob;
    exit();
}