//Export class Employee.js is used by:
//1.EmployeeCreator.js

export class Employee {
    constructor(name, ID, startDate, entitlement, leaveArr, balance) {
        this.name = name;
        this.ID = ID;
        this.startDate = startDate;
        this.entitlement = entitlement;
        this.leaveArr = leaveArr;
        this.balance = balance;
    }

    setName(name) {
        this.name = name;
    }

    setID(ID) {
        this.ID = ID;
    }

    setStartDate(startDate) {
        this.startDate = startDate;
    }

    setEntitlement(entitlement) {
        this.entitlement = entitlement;
    }

    applyLeave(day,leaveArr) {
        this.leaveArr[day-1] = 1;
    }

    cancelLeave(day,leaveArr) {
        this.leaveArr[day-1] = 0;
    }

    setBalance(balance) {
        this.balance = balance;
    }

    getTotalLeavesApplied() {
        
        let count = 0
        
        for(let i =0; i < this.leaveArr.length; i++){
    
          if(this.leaveArr[i] !== 0){
            count += this.leaveArr[i];
            
          }
        }

         
          return count;
          
    }
    
    getLeaveEarned(entitlement, balance, leaveArr,employmentDay) {
        let dailyEarning = entitlement / 365;
      
        for (let i = 1; i <= employmentDay; i++) {
          balance += (dailyEarning - leaveArr[i - 1]);
        }
      
        return Number(balance.toFixed(2));
    }
}
