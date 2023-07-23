<?php


// Connect to the database
$conn = mysqli_connect("localhost", "root", "H0l1dayz", "leave_buddy");

// Check the database connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}


// Get the employee ID and indexes from the query parameters
$employeeId = $_GET['id'];
$updatedLeaveArr = json_decode($_GET['indexes']);

//echo $indexes;
echo $employeeId .  " Updated array: " . json_encode($updatedLeaveArr);

// Perform the query to get the employee data
$result = mysqli_query($conn, "SELECT leaveArr FROM employees WHERE id = '$employeeId'");


// Check if the query was successful
if ($result) {
    // Fetch the row from the result object
    $row = mysqli_fetch_assoc($result);

    // Extract the leaveArr column value
    $leaveArr = $row['leaveArr'];

    // Display the leaveArr value
    echo "Existing Leave Arr: " . $leaveArr;

    
    // Perform the update query
    $query = "UPDATE employees SET leaveArr = '" . mysqli_real_escape_string($conn, json_encode($updatedLeaveArr)) . "' WHERE id = '$employeeId'";
    $updateResult = mysqli_query($conn, $query);

    // Check if the update was successful
    if ($updateResult) {
        // Update successful
        echo "leaveArr updated successfully.";
    } else {
        // Update failed
        echo "Failed to update leaveArr: " . mysqli_error($conn);
    }
    
} 

else {
    // Query failed
    echo "Failed to fetch employee data: " . mysqli_error($conn);
}

// Close the database connection
mysqli_close($conn);


?>