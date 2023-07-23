<?php

// Connect to the database
$conn = mysqli_connect("localhost", "root", "H0l1dayz", "leave_buddy");

// Get the employee ID from the query parameter
$employeeId = $_GET['id'];

// Perform the query to get the employee data
$result = mysqli_query($conn, "SELECT * FROM employees WHERE id = '$employeeId'");

// Get the employee data as an associative array
$employeeData = mysqli_fetch_assoc($result);

// Close the database connection
mysqli_close($conn);

// Output the employee data as JSON
echo json_encode($employeeData);

?>