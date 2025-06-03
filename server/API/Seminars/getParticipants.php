<?php

require_once __DIR__."/../../global.php";

$query = $_GET['seminar_id'];

echo json_encode($query);

// TRY THE JOIN

/*

    SELECT * 
    FROM `seminars` JOIN `seminar_participants`
    ON seminars.id = seminar_participants.seminar_id;

*/