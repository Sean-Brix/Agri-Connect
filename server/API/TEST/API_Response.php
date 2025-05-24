<?php

// UTILS
require_once '../../Utils/request.php';
require_once '../../Utils/response.php';

// Request Body
$req = getJsonBody();

$data1 = $req['data1'];
$data2 = $req['data2'];

// Response
sendResponse(200, "Success", [$data1, $data2], "Successfully recieved the data");