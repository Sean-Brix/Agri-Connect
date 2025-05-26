

# MySQL Schema Definitions

This document contains SQL `CREATE TABLE` statements used to define the structure of the database for the project. Each table is carefully designed to store specific sets of data with appropriate data types, constraints, and relationships where needed.

Use these definitions to:
- Initialize your database schema.
- Reference column names, types, and rules during backend development.
- Ensure consistency across database operations and migrations.


---------------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,

    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,

    client_profile ENUM(
        'Fishfolk',
        'Rural Based Org',
        'Student',
        'Agricultural/Fisheries Technician',
        'Youth',
        'Women',
        "Gov't Employee",
        'PWD',
        'Indigenous People'
    ) NOT NULL,

    address VARCHAR(255),
    telephone_no VARCHAR(20),
    cellphone_no VARCHAR(20),
    occupation VARCHAR(100),
    position VARCHAR(100),
    institution VARCHAR(150),
    email_address VARCHAR(150),
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Store encrypted/hash

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

---------------------------------------------------------------------------------------------------------------------------------------------------------
