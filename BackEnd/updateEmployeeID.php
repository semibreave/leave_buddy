<?php

// Connect to the database
$conn = mysqli_connect("localhost", "root", "H0l1dayz", "leave_buddy");

// Get the employee ID and new ID from the query parameters
$employeeId = $_GET['id'];
$newEmployeeId = $_GET['new_id'];

// Perform the update query
$query = "UPDATE employees SET id = '$newEmployeeId' WHERE id = '$employeeId'";
mysqli_query($conn, $query);

// Check if the update was successful
if (mysqli_affected_rows($conn) > 0) {
    // Update successful
    echo "Employee ID updated successfully.";
} else {
    // No rows affected, update failed
    echo "Failed to update employee ID.";
}

// Close the database connection
mysqli_close($conn);

?>
