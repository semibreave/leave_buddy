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

echo connectToDatabase($host, $username, $password, $database);


// Check if the request method is POST (for form submission)
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the submitted username and password from the POST data
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Perform your authentication logic here (e.g., checking against a database)
    // For this example, let's assume the correct username and password are "ola"
    if ($username === "ola" && $password === "ola") {
        // If authentication is successful, redirect the user to the calendar page
        header("Location:../frontend/html/calendar.html");
        exit; // Always exit after using header to prevent further execution
    } else {
        // If authentication fails, you can display an error message or take appropriate action
        echo "Invalid username or password. Please try again.";
    }
} else {
    // If the login form is accessed directly without a POST request, handle it accordingly
    // (e.g., display an error message or redirect to an error page)
    echo "Please submit the login form.";
}
?>
