<?php
require_once __DIR__."/../Utils/statement.php";

class Account {

    private $id = null;
    private $access = "User";
    private $firstname = null;
    private $lastname = null;
    private $gender = null;

    private $profile_picture = null;
    private $client_profile = null;
    private $address = null;
    private $telephone_no = null;
    private $cellphone_no = null;
    private $occupation = null;
    private $position = null;
    private $institution = null;
    private $email_address = null;
    private $username = null;
    private $password = null;
    private $created_at = null;
    private $updated_at = null;

    public function __construct($account_id = null){

        $this->id = $account_id;

        if($account_id) $this->initialize();
    }

    // Get all details of an account
    public function getDetails($unset = true){
        $details = [
            'id' => $this->id,
            'access' => $this->access,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'gender' => $this->gender,
            'profile_picture' => $this->profile_picture,
            'client_profile' => $this->client_profile,
            'address' => $this->address,
            'telephone_no' => $this->telephone_no,
            'cellphone_no' => $this->cellphone_no,
            'occupation' => $this->occupation,
            'position' => $this->position,
            'institution' => $this->institution,
            'email_address' => $this->email_address,
            'username' => $this->username,
            'password' => $this->password,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];

        if ($unset) {
            unset($details["password"]);
            unset($details["profile_picture"]);
            unset($details["updated_at"]);
        }

        return $details;
    }

    public function initialize(){

        // Initialized all fields
        $query = "SELECT * FROM `accounts` WHERE id= ?";
        $result = statement($query, [$this->id], "s");

        while($row = mysqli_fetch_assoc($result)){
            $this->access = $row["access"];
            $this->firstname = $row["firstname"];
            $this->lastname = $row["lastname"];
            $this->gender = $row["gender"];
            $this->profile_picture = $row["profile_picture"];
            $this->client_profile = $row["client_profile"];
            $this->address = $row["address"];
            $this->telephone_no = $row["telephone_no"];
            $this->cellphone_no = $row["cellphone_no"];
            $this->occupation = $row["occupation"];
            $this->position = $row["position"];
            $this->institution = $row["institution"];
            $this->email_address = $row["email_address"];
            $this->username = $row["username"];
            $this->password = $row["password"];
            $this->created_at = $row["created_at"];
            $this->updated_at = $row["updated_at"];
        }

    }

    public function setProfilePicture($image) {
        if (!$this->id) {
            return false;
        }

        if (isset($image['tmp_name']) && is_uploaded_file($image['tmp_name'])) {
            $imageData = file_get_contents($image['tmp_name']);
            
            $query = "UPDATE accounts SET profile_picture = ? WHERE id = ?";
            $params = [$imageData, $this->id];
            $types = "bs"; // b for blob, s for string (id)
            
            $result = statement($query, $params, $types);
            
            if ($result) {
                $this->profile_picture = $imageData;
                return true;
            }
        }
        
        return false;
    }

    public function getProfile(){
        return $this->profile_picture;
    }

    // Creates a new account
    public function createAccount($params){

        $query = "INSERT INTO `accounts` (
            `firstname`, `lastname`, `gender`, 
            `client_profile`, `address`, 
            `telephone_no`, `cellphone_no`, 
            `occupation`, `position`, 
            `institution`, `email_address`, 
            `username`, `password`) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
        
        $types = getTypes($params);
        
        $result = statement($query, $params, $types);

        return $result;
    }

    // Save the account to the database
    public function save(){
        $query = "UPDATE `accounts` SET 
            access = ?, firstname = ?, lastname = ?, gender = ?, client_profile = ?, address = ?, 
            telephone_no = ?, cellphone_no = ?, occupation = ?, position = ?, institution = ?, email_address = ? 
            WHERE id = ?";

        $params = [
            $this->access, $this->firstname, $this->lastname,
            $this->gender, $this->client_profile, $this->address,
            $this->telephone_no, $this->cellphone_no, $this->occupation,
            $this->position, $this->institution, $this->email_address,
            $this->id
        ];

        $result = statement($query, $params, getTypes($params));

        return $result !== false;
    }

    public function __toString(){
        return "Account Owner: {$this->username}";
    }
}