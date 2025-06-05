<?php

require_once __DIR__."/../../Model/Seminars.php";
require_once __DIR__."/../../global.php";

function searchSeminars($searchTerm, $filter = 'all') {
    $searchTerm = trim($searchTerm);
    $baseQuery = "SELECT * FROM seminars WHERE ";
    $params = [];
    $conditions = [];

    if ($filter === 'all') {
        $conditions[] = "title REGEXP ?";
        $conditions[] = "location REGEXP ?";
        $conditions[] = "speaker REGEXP ?";
        $pattern = "[[:<:]]" . $searchTerm;
        $params = array_merge($params, [$pattern, $pattern, $pattern]);
    } else {
        $conditions[] = "$filter REGEXP ?";
        $pattern = "[[:<:]]" . $searchTerm;
        $params[] = $pattern;
    }

    $query = $baseQuery . implode(" OR ", $conditions);
    $result = statement($query, $params, getTypes($params));

    $seminars = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $seminar = new Seminars($row['id']);
        $seminars[] = $seminar->getDetails();
    }

    return $seminars;
}
