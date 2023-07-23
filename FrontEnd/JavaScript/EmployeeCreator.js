// Import the getEmployeeData function from employeeAjax.js
import { getEmployeeData } from '../AJAX/AjaxGetEmployeeProp.js';

//Import Employee class from Employee.js
import { Employee } from './Employee.js';

// Define the employee ID
const employeeId = 54321;  //24898 LAM

// Create a function to instantiate the Employee object

//Version 1

async function retrieveEmployeeData(employeeId) {
  try {
        const employeeData = await getEmployeeData(employeeId);
	   
        return employeeData;
        
    } 
    
    catch (error) {
        console.error(error);
    }
}

const employeeData =  await retrieveEmployeeData(employeeId);


//Version 2
/*
function retrieveEmployeeData(employeeId) {
    try {
          const employeeData =  getEmployeeData(employeeId);
         
          return employeeData;
          
      } 
      
      catch (error) {
          console.error(error);
      }
}
const employeeData =  await retrieveEmployeeData(employeeId);
*/
//Data fetched from databse are all in string.Parsing action required

//convert ID to int
const ID = parseInt(employeeData.ID);

//convert to date object and set the hour to 00:00
const startDate = new Date(employeeData.startDate);
startDate.setHours(0,0,0);

//convert entitlement to int
const entitlement = parseInt(employeeData.entitlement);

//convert JSON to array
const leaveArr = JSON.parse(employeeData.leaveArr);

//conver string to float
const balance = parseFloat(employeeData.balance);

//export let employee use by
//1.CalendarCreator.js
//2.Calendar.html
export let employee = new Employee(employeeData.name,ID,startDate,entitlement,leaveArr,balance);



