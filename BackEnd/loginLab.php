<?php
// Replace these with your MySQL database credentials
$host = 'localhost';
$username = 'root';
$password = 'H0l1dayz';
$database = 'leave_buddy';

// Function to connect to the database
function connectToDatabase($host, $username, $password, $database)
{
    $conn = mysqli_connect($host, $username, $password, $database);
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    return $conn;
}

// Function to perform the MySQL query
function runQuery($conn, $id, $password)
{
    $id = mysqli_real_escape_string($conn, $id); // Sanitize input to prevent SQL injection
    $password = mysqli_real_escape_string($conn, $password);

    // Assuming your table name is 'users'
    $query = "SELECT * FROM employees WHERE id='$id' AND password='$password'";
    $result = mysqli_query($conn, $query);

    if (!$result) {
        die("Query failed: " . mysqli_error($conn));
    }

    // Check if any rows were returned
    if (mysqli_num_rows($result) > 0) {
        // User credentials are correct
        // Perform further actions here if needed
        echo "Login successful!";
    } else {
        echo "Invalid ID or password.";
    }

    mysqli_close($conn);
}

// Check if both ID and password were provided
if (isset($_GET['id']) && isset($_GET['password'])) {
    $id = $_GET['id'];
    $password = $_GET['password'];

    $conn = connectToDatabase($host, $username, $password, $database);
    runQuery($conn, $id, $password);
} else {
    echo "Please provide both ID and password as arguments.";
}
?>
