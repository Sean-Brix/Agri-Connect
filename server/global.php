<?php

define("UTIL", __DIR__ . "/Utils/");
define("MODEL", __DIR__."/Model/");

// UTIL
require_once UTIL."request.php";
require_once UTIL."response.php";
require_once UTIL."connect_db.php";
require_once UTIL."statement.php";

// MODEL
require_once MODEL."Account.php";
