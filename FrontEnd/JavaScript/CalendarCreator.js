import { Calendar } from "./Calendar.js";
import { employee } from "./EmployeeCreator.js";
import { CalendarHelper } from "./CalendarHelper.js";



//Use by Calendar.js
export const calendarHelper = new CalendarHelper();

let startDate = calendarHelper.getDateInString(employee.startDate);

let showing = new Date(startDate);//Preventive measure of accidently altering employee.StartDate
let caption = calendarHelper.getMonthCaption(showing);
let numDays = calendarHelper.getDaysInMonth(showing);
let firstDayOfMonth = calendarHelper.getFirstDayMonth(showing);
let hasFirstDay = calendarHelper.checkHasFirstDay(employee.startDate, showing);
let hasLastDay = calendarHelper.checkHasLastDay(calendarHelper.get365thDay(employee.startDate), showing);
let head = employee.startDate;
let tail = calendarHelper.get365thDay(employee.startDate);

//Use by Calendar.html,Calendar.js
export var calendar  = new Calendar(
                               showing,
                               caption,
                               numDays,
                               firstDayOfMonth,
                               hasFirstDay,
                               hasLastDay,
                               head,
                               tail
                              ); 
                           