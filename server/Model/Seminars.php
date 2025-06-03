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
            'status' => $this->status,
            'speaker' => $this->speaker,
            'registration_deadline' => $this->registration_deadline,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }

    public function getParticipants(){
        $query = "SELECT * FROM `seminars` JOIN `seminar_participants` ON seminars.id = seminar_participants.seminar_id";
        $result = statement($query);

        var_dump(mysqli_fetch_assoc($result));

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
        
        $types = getTypes($params);
        $result = statement($query, $params, $types);

        return $result;
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