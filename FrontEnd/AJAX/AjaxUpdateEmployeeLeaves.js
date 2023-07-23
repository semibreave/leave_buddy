//export function updateDBArr(employeeId, indexes) is used by:
//1.Calendar.js
export function updateDBArr(employeeId, indexes) {
  // Create an XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the PHP script URL
  var url = "../../BackEnd/updateEmployeeLeaves.php";

  // Create a data string with the parameters
  var data = "id=" + encodeURIComponent(employeeId) + "&indexes=" + encodeURIComponent(JSON.stringify(indexes));

  // Configure the AJAX request
  xhr.open("GET", url + "?" + data, true);

  // Set the response type
  xhr.responseType = "text";

  // Define the callback function to handle the AJAX response
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Request was successful
        console.log(xhr.responseText);
      } else {
        // Request failed
        console.error("Request failed. Status: " + xhr.status);
      }
    }
  };

  // Send the AJAX request
  xhr.send();
}