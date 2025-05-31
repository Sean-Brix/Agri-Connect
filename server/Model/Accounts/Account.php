<?php
require_once __DIR__."/../../Utils/statement.php";

class Account {

    private $id = null;
    private $firstname = null;
    private $lastname = null;
    private $gender = null;
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

        if($account_id) $this->initialized($account_id);
    }

    public function print($key){
        if(property_exists($this, $key)) {
            echo $this->$key ?? '';
        }
    }

    public function initialized($account_id){

        $query = "SELECT * FROM `accounts` WHERE id= ?";
        $result = statement($query, [$account_id], "s");

        while($row = mysqli_fetch_assoc($result)){
            $this->firstname = $row["firstname"];
            $this->lastname = $row["lastname"];
            $this->gender = $row["gender"];
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
}