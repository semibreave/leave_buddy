//Export class CalendarHelper.js is used by:
//1.calendarCreator.js


export class CalendarHelper {
  
  getDateInString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }
  
  getMonthCaption(date) {
    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }

  getDaysInMonth(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    return lastDayOfMonth;
  }
  

  getFirstDayMonth(date) {
    const sampleDate = new Date(date);
    sampleDate.setDate(1);
    const dayOfWeek = sampleDate.getDay();
    return dayOfWeek;
  }

  setPreviousMonth(date) {
		
	  // Subtract one month from the current date
		date.setMonth(date.getMonth() - 1);
	  
		// Set the date to the 1st day of the month
		date.setDate(1);
	  
    return date;
	}
  
  setNextMonth(date) {
		
	  // Add one month from the current date
		date.setMonth(date.getMonth() + 1);
	  
		// Set the date to the 1st day of the month
		date.setDate(1);

    return date;
	  
	}

  getDaysBetweenStartDate(startDate, selectedDate) {
    
   // Convert the difference to days and return it
    let spannedDays = (selectedDate -startDate)/ (1000 * 60 * 60 * 24);
    let tenureDay = spannedDays + 1;
    //let ola = selectedDate-startDate;
    return tenureDay;
  }

  get365thDay(startDate) {
    // Create a new Date object based on the provided startDate
    const dateObj = new Date(startDate);
  
    // Add 364 days to the date to get the day before the 365th day
    dateObj.setDate(dateObj.getDate() + 364);
  
    // Create a new Date object based on the result of setDate() method
    const day365Obj = new Date(dateObj);
  
    // Return the 365th day as a Date object
    return day365Obj;
  }


  checkHasFirstDay(startDate, showing) {
    const startMonth = startDate.getMonth();
    const startYear = startDate.getFullYear();
    const showingMonth = showing.getMonth();
    const showingYear = showing.getFullYear();
  
    return startMonth === showingMonth && startYear === showingYear;
  }

  checkHasLastDay(endDate, showing) {
    const endMonth = endDate.getMonth();
    const endYear = endDate.getFullYear();
    const showingMonth = showing.getMonth();
    const showingYear = showing.getFullYear();
  
    return endMonth === showingMonth && endYear === showingYear;
  }

  getLeaveEarned(entitlement,balance,leaveArr,employmentDay){

    let dailyEarning = entitlement/365;
  
    for(let i=1;i<=employmentDay;i++){

        balance += (dailyEarning - leaveArr[i-1]);
    }
    
      return Number(balance.toFixed(2));
    
  }
  
  
}


