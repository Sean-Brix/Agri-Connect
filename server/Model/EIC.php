<?php

require_once __DIR__."/../Utils/statement.php";
class EIC{

    private $id = null;
    private $Name = null;
    private $description = null;
    private $quantity = null;
    private $status = null;
    private $category = null;
    private $added_by = null;
    private $photo = null;
    private $created_at = null;
    private $updated_at = null;

    /**
     * What it Does: Constructor for the EIC class.  Initializes an EIC object, optionally loading data if an ID is provided.
     * Returns What: void
     */
    public function __construct($eic_id = null)
    {
        $this->id = $eic_id;
        if($eic_id) $this->initialize();
    }

    /**
     * What it Does: Retrieves all details of the EIC object.
     * Returns What: An associative array containing all the EIC's details.
     */
    public function getDetails(){
        return [
            'id' => $this->id,
            'Name' => $this->Name,
            'description' => $this->description,
            'quantity' => $this->quantity,
            'status' => $this->status,
            'category' => $this->category,
            'added_by' => $this->added_by,
            'photo' => $this->photo,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }

    /**
     * What it Does: Finds an EIC ID by its name.
     * Returns What: The ID of the EIC if found, otherwise null.
     */
    public static function findEICID($Name){
        $query = "SELECT id FROM `EIC` WHERE Name = ?";
        $result = statement($query, [$Name], "s");
        if($row = mysqli_fetch_assoc($result)){
            return $row["id"];
        }
        return null;
    }


    /**
     * What it Does: Initializes the EIC object with data from the database based on the object's ID.
     * Returns What: void
     */
    public function initialize(){
        $query = "SELECT * FROM `EIC` WHERE id = ?";
        $result = statement($query, [$this->id], "i");
        while($row = mysqli_fetch_assoc($result)){
            $this->Name = $row["Name"];
            $this->description = $row["description"];
            $this->quantity = $row["quantity"];
            $this->status = $row["status"];
            $this->category = $row["category"];
            $this->added_by = $row["added_by"];
            $this->photo = $row["photo"];
            $this->created_at = $row["created_at"];
            $this->updated_at = $row["updated_at"];
        }
    }

    /**
     * What it Does: Creates a new EIC record in the database.
     * Returns What: The result of the statement execution.
     */
    public function create($params){
        $query = "INSERT INTO `EIC` (
            `Name`, `description`, `quantity`,
            `status`, `category`, `added_by`
            )
            VALUES (?,?,?,?,?,?)";
        $param_array = [
            $params['Name'],
            $params['description'],
            $params['quantity'],
            $params['status'],
            $params['category'],
            $params['added_by']
        ];
        $types = getTypes($param_array);
        $result = statement($query, $param_array, $types);
        return $result;
    }

    /**
     * What it Does: Sets the photo for the EIC object in the database.
     * Returns What: True if the photo was successfully set, false otherwise.
     */
    public function setPhoto($image) {
        if (!$this->id) {
            return false;
        }
        if (isset($image['tmp_name']) && is_uploaded_file($image['tmp_name'])) {
            $imageData = file_get_contents($image['tmp_name']);
            $query = "UPDATE EIC SET photo = ? WHERE id = ?";
            $params = [$imageData, $this->id];
            $types = "bi";
        $result = statement($query, $params, $types);
            if ($result) {
                $this->photo = $imageData;
                return true;
    }
        }
        return false;
    }

    /**
     * What it Does: Sets the details of the EIC object.
     * Returns What: void
     */
    public function setDetails($params) {
        $this->Name = $params['Name'] ?? $this->Name;
        $this->description = $params['description'] ?? $this->description;
        $this->quantity = $params['quantity'] ?? $this->quantity;
        $this->status = $params['status'] ?? $this->status;
        $this->category = $params['category'] ?? $this->category;
        $this->added_by = $params['added_by'] ?? $this->added_by;
    }

    /**
     * What it Does: Saves the updated details of the EIC object to the database.
     * Returns What: True if the save operation was successful, false otherwise.
     */
    public function save(){
        $query = "UPDATE `EIC` SET
            Name = ?, description = ?, quantity = ?,
            status = ?, category = ?, added_by = ?
            WHERE id = ?";
        $params = [
            $this->Name, $this->description, $this->quantity,
            $this->status, $this->category, $this->added_by,
            $this->id
        ];
        $types = getTypes($params);
        $result = statement($query, $params, $types);
        return $result !== false;
    }

    /**
     * What it Does: Returns a string representation of the EIC object.
     * Returns What: A string representation of the EIC object, including its name.
     */
    public function __toString(){
        return "EIC: {$this->Name}";
    }

    /**
     * What it Does: Reads all EIC items from the database.
     * Returns What: An array of associative arrays, where each array represents an EIC item.
     */
    public static function readAll()
    {
        $query = "SELECT * FROM EIC";
            $result = statement($query);
        $eic_items = array();

        while ($row = mysqli_fetch_assoc($result)) {
                $eic_items[] = $row;
            }
        return $eic_items;
    }

    /**
     * What it Does: Deletes an EIC item from the database based on its ID.
     * Returns What: The result of the statement execution.
     */
    public static function deleteStatic($id)
    {
        $query = "DELETE FROM EIC WHERE id = ?";
        $params = [$id];
        $types = "i";
        $result = statement($query, $params, $types);

        return $result;
    }

    /**
     * What it Does: Searches and filters EIC items based on a search term and filters.
     * Returns What: An array of associative arrays representing the matching EIC items.
     */
    public static function searchAndFilter($searchTerm = '', $filters = [], $include_zeroQuantity = false)
    {
        $whereClauses = [];
        $params = [];
        $types = '';

        $query = "SELECT id, Name, description, quantity, status, category, added_by, created_at, updated_at FROM EIC";
        if (!$include_zeroQuantity) {
            $whereClauses[] = "quantity != 0";
        }

        if (!empty($searchTerm)) {
            $whereClauses[] = "(Name LIKE ? OR description LIKE ?)";
            $params[] = "%" . $searchTerm . "%";
            $params[] = "%" . $searchTerm . "%";
            $types .= 'ss';
        }

        foreach ($filters as $field => $value) {
            if (!empty($value) && in_array($field, ['status', 'category', 'quantity'])) { //Whitelist
                
                if($field == 'quantity'){
                    $whereClauses[] = "quantity = ?";
                    $params[] = $value;
                    $types .= 'i';
                }

                else{
                    $whereClauses[] = "$field = ?";
                    $params[] = $value;
                    $types .= 's';
                }


            }
        }

        if (!empty($whereClauses)) {
            $query .= " WHERE " . implode(" AND ", $whereClauses);
        }


        if (!empty($params)) {
            $result = statement($query, $params, $types);
        }else{
            $result = statement($query);
        }


        $eic_items = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $eic_items[] = $row;
        }

        return $eic_items;
    }

}
