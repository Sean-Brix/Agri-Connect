<?php
require_once __DIR__."/../Utils/statement.php";

class Seminars {
    private $id = null;
    private $title = null;
    private $description = null;
    private $location = null;
    private $start_date = null;
    private $end_date = null;
    private $start_time = null;
    private $end_time = null;
    private $capacity = null;
    private $photo = "";
    private $status = null;
    private $speaker = null;
    private $registration_deadline = null;
    private $created_at = null;
    private $updated_at = null;

    public function __construct($seminar_id = null){
        $this->id = $seminar_id;
        if($seminar_id) $this->initialize();
    }

    public function getDetails(){
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'location' => $this->location,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'capacity' => $this->capacity,
            'photo' => $this->photo,
            'status' => $this->status,
            'speaker' => $this->speaker,
            'registration_deadline' => $this->registration_deadline,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }

    public static function findSeminarID($title){
        $query = "SELECT id FROM `seminars` WHERE title = ?";
        $result = statement($query, [$title], "s");

        if($row = mysqli_fetch_assoc($result)){
            return $row["id"];
        }

        return null;
    }

    public function getParticipants(){

        $query = "SELECT account_id, seminar_participants.status, registration_date FROM `seminars` JOIN `seminar_participants` ON seminars.id = seminar_participants.seminar_id WHERE seminars.id = ?";
        $result = statement($query, [$this->id], getTypes([$this->id]));

        $participants = [];
        while($row = mysqli_fetch_assoc($result)){
            $participants[] = $row;
        }

        return $participants;
    }

    public function initialize(){
        $query = "SELECT * FROM `seminars` WHERE id = ?";
        $result = statement($query, [$this->id], "s");

        while($row = mysqli_fetch_assoc($result)){
            $this->title = $row["title"];
            $this->description = $row["description"];
            $this->location = $row["location"];
            $this->start_date = $row["start_date"];
            $this->end_date = $row["end_date"];
            $this->start_time = $row["start_time"];
            $this->end_time = $row["end_time"];
            $this->capacity = $row["capacity"];
            $this->status = $row["status"];
            $this->speaker = $row["speaker"];
            $this->registration_deadline = $row["registration_deadline"];
            $this->created_at = $row["created_at"];
            $this->updated_at = $row["updated_at"];
        }
    }

    public function createSeminar($params){
        $query = "INSERT INTO `seminars` (
            `title`, `description`, `location`, 
            `start_date`, `end_date`, `start_time`, 
            `end_time`, `capacity`, `status`,
            `speaker`, `registration_deadline`) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        
        $param_array = [
            $params['title'],
            $params['description'],
            $params['location'],
            $params['start_date'],
            $params['end_date'],
            $params['start_time'],
            $params['end_time'],
            $params['capacity'],
            $params['status'],
            $params['speaker'],
            $params['registration_deadline']
        ];
        $types = getTypes($param_array);
        $result = statement($query, $param_array, $types);
        
        return $result;
    }

    public function setPhoto($image) {
        if (!$this->id) {
            return false;
        }

        if (isset($image['tmp_name']) && is_uploaded_file($image['tmp_name'])) {
            $imageData = file_get_contents($image['tmp_name']);
            
            $query = "UPDATE seminars SET photo = ? WHERE id = ?";
            $params = [$imageData, $this->id];
            $types = "bs"; // b for blob, s for string (id)
            
            $result = statement($query, $params, $types);
            
            if ($result) {
                $this->photo = $imageData;
                return true;
            }
        }
        
        return false;
    }

    public function save(){
        $query = "UPDATE `seminars` SET 
            title = ?, description = ?, location = ?, 
            start_date = ?, end_date = ?, start_time = ?, 
            end_time = ?, capacity = ?, status = ?,
            speaker = ?, registration_deadline = ? 
            WHERE id = ?";

        $params = [
            $this->title, $this->description, $this->location,
            $this->start_date, $this->end_date, $this->start_time,
            $this->end_time, $this->capacity, $this->status,
            $this->speaker, $this->registration_deadline,
            $this->id
        ];

        $result = statement($query, $params, getTypes($params));
        return $result !== false;
    }

    public function __toString(){
        return "Seminar: {$this->title}";
    }
}