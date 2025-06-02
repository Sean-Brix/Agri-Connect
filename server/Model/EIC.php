<?php
require_once __DIR__."/../Utils/statement.php";

class EIC {

    private $id = null;
    private $name = null;
    private $description = null;
    private $quantity = 0;
    private $status = null;
    private $category = null;
    private $created_at = null;
    private $updated_at = null;

    public function __construct($item_id = null){

        $this->id = $item_id;

        if($item_id) $this->initialize();
    }

    // Get all details of an account
    public function getDetails(){
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'quantity' => $this->quantity,
            'status' => $this->status,
            'category' => $this->category,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    public function initialize(){

        // Initialized all fields
        $query = "SELECT * FROM `eic` WHERE id= ?";
        $result = statement($query, [$this->id], "s");

        while($row = mysqli_fetch_assoc($result)){
            $this->name = $row["Name"];
            $this->quantity = $row["quantity"];
            $this->description = $row["description"];
            $this->status = $row["status"];
            $this->category = $row["category"];
            $this->created_at = $row["created_at"];
            $this->updated_at = $row["updated_at"];
        }
    }

    // Creates a new EIC Item
    public function createItem($params){

        if (count($params) > 5) {
            return false;
        }

        $query = "INSERT INTO `eic` (
            `Name`, `description`, `quantity`, 
            `status`, `category`, 
            ) 
            VALUES (?,?,?,?,?)";
        
        $types = getTypes($params);
        
        $result = statement($query, $params, $types);

        return $result;
    }

    // Save the EIC Item to the database
    public function save(){
        $query = "UPDATE `eic` SET 
            Name = ?, description = ?, quantity = ?, status = ?, category = ?
            WHERE id = ?";

        $params = [
            $this->name, $this->description, $this->quantity,
            $this->status, $this->category,
            $this->id
        ];

        $result = statement($query, $params, getTypes($params));

        return $result !== false;
    }
}