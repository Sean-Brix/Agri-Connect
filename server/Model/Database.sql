
CREATE TABLE accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    access ENUM('User', 'Admin', 'Super Admin') NOT NULL,

    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    profile_picture LONGBLOB,

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

    commodity VARCHAR(255),
    address VARCHAR(255),
    telephone_no VARCHAR(20),
    cellphone_no VARCHAR(20),
    occupation VARCHAR(100),
    position VARCHAR(100),
    institution VARCHAR(150),
    email_address VARCHAR(150),
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE EIC (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INT NOT NULL,
    status ENUM('Available', 'Borrowed', 'Maintenance', 'Damaged', 'Returned', 'Reserved') NOT NULL,
    category ENUM('Farming Equipment', 'Harvesting Tools', 'Irrigation Systems', 'Storage Equipment', 'Processing Equipment', 'Safety Gear', 'Pest Control', 'Livestock Equipment', 'Measuring Tools', 'Fisheries', 'Machinery') NOT NULL,
    photo LONGBLOB,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE seminars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255) NOT NULL,

    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,

    capacity INT,
    status ENUM('Upcoming', 'Ongoing', 'Completed', 'Cancelled') NOT NULL,
    speaker VARCHAR(255),
    registration_deadline DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);





CREATE TABLE seminar_participants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    seminar_id INT NOT NULL,
    status ENUM('Registered', 'Attended', 'Cancelled', 'No Show') NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (account_id) REFERENCES accounts(id),
    FOREIGN KEY (seminar_id) REFERENCES seminars(id),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);