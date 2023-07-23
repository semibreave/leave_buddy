// Import the getEmployeeData function from employeeAjax.js
import { getEmployeeData } from '../AJAX/AjaxGetEmployeeProp.js';

//Import Employee class from Employee.js
import { Employee } from '../JavaScript/Employee.js';

// Define the employee ID
const employeeId = 54321;  //24898 LAM


function getEmployeeFromDB(employeeId){

    return new Promise(

                            function(resolve,reject){
                            
                                try{
                                    let empData = getEmployeeData(employeeId);

                                    

                                    resolve(empData);
                                }

                                catch(error){

                                    reject(error);
                                }

                            }


                        );

}


export const myPromise = getEmployeeFromDB(employeeId);

