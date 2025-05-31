<?php

require_once __DIR__ . "/connect_db.php";

function statement(string $query, array $parameters = [], string $types = "") {
    global $conn;

    // Prepare the statement
    $stmt = mysqli_prepare($conn, $query);
    
    if (!$stmt) {
        die("Preparation failed: " . mysqli_error($conn));
    }

    // Bind parameters if there are any
    if (!empty($parameters)) {
        // Ensure types string matches number of parameters
        if (strlen($types) !== count($parameters)) {
            die("Parameter types count does not match parameters count.");
        }

        // You have to pass by reference for mysqli_stmt_bind_param
        $refs = [];
        foreach ($parameters as $key => $value) {
            $refs[$key] = &$parameters[$key];
        }

        array_unshift($refs, $types); // prepend type string

        call_user_func_array([$stmt, 'bind_param'], $refs);
    }

    // Execute the statement
    $success = mysqli_stmt_execute($stmt);

    // Execution failed
    if (!$success) {
        return false; 
    }

    // Return result set (or true/false for non-SELECT)
    $result = mysqli_stmt_get_result($stmt);

    if ($result === false) {
        // It's a non-SELECT query like INSERT/UPDATE
        return true;
    }

    return $result;
}

function getTypes(array $params): string {
    $types = '';
    foreach ($params as $param) {
        if (is_int($param)) {
            $types .= 'i';
        } elseif (is_float($param)) {
            $types .= 'd';
        } elseif (is_string($param)) {
            $types .= 's';
        } else {
            $types .= 'b'; // fallback to blob
        }
    }
    return $types;
}
