//export function getEmployeeData(employeeId) is used by:
//1.EmployeeCreator.js

export function getEmployeeData(employeeId) {
  // Return a Promise that resolves with the employee data
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `../../BackEnd/getEmployeeProp.php?id=${employeeId}`);
    xhr.onload = () => {
      if (xhr.status === 200) {
        // Parse the JSON response
        const employeeData = JSON.parse(xhr.responseText);
        resolve(employeeData);
      } else {
        reject(`Error retrieving employee data: ${xhr.statusText}`);
      }
    };
    xhr.onerror = () => {
      reject(`Error retrieving employee data: ${xhr.statusText}`);
    };
    xhr.send();
  });
}
