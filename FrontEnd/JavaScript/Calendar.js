import { employee } from "./EmployeeCreator.js";
import { calendar,calendarHelper } from "./CalendarCreator.js";
import {updateDBArr} from "../AJAX/AjaxUpdateEmployeeLeaves.js";

//Export class Calendar.js is used by:
//1.calendarCreator.js
export class Calendar {
	
	constructor(showing, caption, numDays, firstDayOfMonth, hasFirstDay, hasLastDay, head, tail, selectedDayIndexArr, selectedALDayIndexArr) {
	  
		this.showing = showing;
		this.caption = caption;
		this.numDays = numDays;
		this.firstDayOfMonth = firstDayOfMonth;
		this.hasFirstDay= hasFirstDay;
	  	this.hasLastDay = hasLastDay;
		this.head = head;
		this.tail = tail;
		this.selectedDayIndexArr = [];
		this.selectedALDayIndexArr = [];

		
	}

    increCalendarMonth(){

		this.showing = calendarHelper.setNextMonth(this.showing);
		this.caption = calendarHelper.getMonthCaption(this.showing);
		this.numDays = calendarHelper.getDaysInMonth(this.showing);
		this.firstDayOfMonth = calendarHelper.getFirstDayMonth(this.showing);
		this.hasFirstDay = calendarHelper.checkHasFirstDay(employee.startDate, this.showing);
		this.hasLastDay = calendarHelper.checkHasLastDay(calendarHelper.get365thDay(employee.startDate), this.showing);
	}
	
	decreCalendarMonth(){

		this.showing = calendarHelper.setPreviousMonth(this.showing);
		this.caption = calendarHelper.getMonthCaption(this.showing);
		this.numDays = calendarHelper.getDaysInMonth(this.showing);
		this.firstDayOfMonth = calendarHelper.getFirstDayMonth(this.showing);
		this.hasFirstDay = calendarHelper.checkHasFirstDay(employee.startDate, this.showing);
		this.hasLastDay = calendarHelper.checkHasLastDay(calendarHelper.get365thDay(employee.startDate), this.showing);
	}

	fillCalendarCaption(){
		const caption = document.querySelector(".caption-box");
		caption.textContent = this.caption;

	}

	insertCalendarCells(table){
		
		let dataRow = document.createElement("tr");
		
		//Insert filler cells if 1st doesn't fall on Sun
		if(this.firstDayOfMonth != 0){
		
			for(let i = 0; i < this.firstDayOfMonth; i++){
				
				const dateCell = document.createElement("td");
				dateCell.textContent = "";
				
				dataRow.appendChild(dateCell);
			}
		}

		for (let i = 1; i <= this.numDays; i++){
			const dateCell = document.createElement("td");
			dateCell.textContent = i;
			dataRow.appendChild(dateCell);

			if(dataRow.cells.length == 7){
					
				table.appendChild(dataRow);
				dataRow = document.createElement("tr");

			}

		}

		table.appendChild(dataRow);

	}

	dimStartMonthCells(table){
		
		let firstDay = (this.head).getDate();
		

		if(this.hasFirstDay && firstDay != 1){
			const cells = table.querySelectorAll('td');
			const mover = -1 + this.firstDayOfMonth;
			 
			//onsole.log('goin to dim from ' + cells[1 + mover].textContent + ' till ' + cells[(firstDay-1) + mover].textContent);

			for(let i=1; i<=(firstDay-1); i++){

                cells[i+mover].style.opacity = "0.4";
			}
		}
	}

	dimLastMonthCells(table){
		
		let lastDay = (this.tail).getDate();
		

		if(this.hasLastDay && lastDay != this.numDays){
			const cells = table.querySelectorAll('td');
			const mover = -1 + this.firstDayOfMonth;
			 
			//onsole.log('goin to dim from ' + cells[1 + mover].textContent + ' till ' + cells[(firstDay-1) + mover].textContent);

			for(let i= lastDay + 1; i<= this.numDays; i++){

                cells[i+mover].style.opacity = "0.4";
			}
		}
	}

	setTenureDayCellsRole(table){
		
		//Tag role "tenureDay"
		
		// Get all cells from the table
		const cells = table.querySelectorAll('td');

		// Filter cells with opacity equal to 1 and has value
		const nonDimmedCells = Array.from(cells).filter(cell => getComputedStyle(cell).opacity === '1' && cell.textContent != "" );

		// Loop through each non-dimmed cell and do something
		nonDimmedCells.forEach(cell => {
  			// Perform operations on each non-dimmed cell
  			cell.setAttribute('role',"tenureDay");
			
		});


		
	}

	setTenureDayCellsTabIndex(table){
		
		// Set tabindex for 1st cell to 0
		// Set tabindex for rest of the cells to -1
		
		const tenureDaycells = table.querySelectorAll('td[role="tenureDay"]');

		let cellCounter  = -1;
		
		tenureDaycells.forEach(cell => {
  			
			cellCounter++;
			
			if(cellCounter===0){tenureDaycells[0].setAttribute('tabindex','0');}
			
			else{tenureDaycells[cellCounter].setAttribute('tabindex','-1');}

			//console.log( cellCounter + ' ' + cell.textContent + ' ' + cell.getAttribute('role') + ' ' + cell.getAttribute('tabindex'));
		});
		
	}

	colorAnnualLeaveCells(table,leaveArr){

		const tenureDaycells = table.querySelectorAll('td[role="tenureDay"]');

		for(let i = 0; i < tenureDaycells.length; i++){

			const cellDateObj = new Date(tenureDaycells[i].textContent + " " + this.caption);
			
			//Get tenured day
			const daysBetween = calendarHelper.getDaysBetweenStartDate(this.head, cellDateObj);

			
			if(leaveArr[daysBetween-1] === 1){

				//console.log("index " + i +  " day:" + daysBetween + " is an AL!" );

				tenureDaycells[i].classList.toggle('tdAL');

				//tenureDaycells[i].setAttribute('role,','leaveday');
			}
			
		}
	}

	colorSelectedCells(table,selectedDayIndexArr){

		const tenureDaycells = table.querySelectorAll('td[role="tenureDay"]');

		for(let i = 0; i < tenureDaycells.length; i++){

			const cellDateObj = new Date(tenureDaycells[i].textContent + " " + this.caption);
			
			//Get tenured day
			const daysBetween = calendarHelper.getDaysBetweenStartDate(this.head, cellDateObj);

			
			if(selectedDayIndexArr.includes(daysBetween-1)){

				
				tenureDaycells[i].classList.add('clickedTD');;
			}
			
		}
	}

	colorSelectedAnnualLeaveCells(table,selectedALDayIndexArr){

		const tenureDaycells = table.querySelectorAll('td[role="tenureDay"]');

		for(let i = 0; i < tenureDaycells.length; i++){

			const cellDateObj = new Date(tenureDaycells[i].textContent + " " + this.caption);
			
			//Get tenured day
			const daysBetween = calendarHelper.getDaysBetweenStartDate(this.head, cellDateObj);

			
			if(selectedALDayIndexArr.includes(daysBetween-1)){

				
				tenureDaycells[i].classList.add('clickedAL');;
			}
			
		}
	}

	addTableKeyEvents(table){
		// Get all the cells in the table
		const cells = table.querySelectorAll('td[role="tenureDay"]');

	// Add event listeners to the table to handle arrow key navigation
		table.addEventListener('keydown', (event) => {
		const index = Array.from(cells).indexOf(event.target);
		if (event.key === 'ArrowRight') {
			// Move focus to the cell on the right
			if (index < cells.length - 1) {
			cells[index + 1].focus();
			
			
			}
		} else if (event.key === 'ArrowLeft') {
			// Move focus to the cell on the left
			if (index > 0 ) {
			cells[index - 1].focus();
			
			
			}
		} else if (event.key === 'ArrowDown') {
			// Move focus to the cell below
			if (index < cells.length - 7) {
			cells[index + 7].focus();
			
			
			}
		} else if (event.key === 'ArrowUp') {
			// Move focus to the cell above
			if (index > 6 ) {
			cells[index - 7].focus();
			
			
			}
		}
		});

	}

	//Displaying tenure day and leave earned in tooltip
	addTTipTableCellFocusEvents(table) {
		const tableCells = table.querySelectorAll('td[role="tenureDay"]');
		const caption = this.caption;
		const head = this.head;
		const tooltip = document.createElement('div');
		tooltip.classList.add('tooltip');
	  
		tableCells.forEach(function (cell) {
		  
			
			cell.addEventListener('focus', function (event) {
			const dateString = event.target.textContent + " " + caption;
			const selectedDateObj = new Date(dateString);//here time is set to 0,0,0 for some reason which is fine(not always the case).If it isnt it will get wonky.
			
			//Get tenured day
			const daysBetween = calendarHelper.getDaysBetweenStartDate(head, selectedDateObj);

			//Get earned leave
			const leavesEarned = calendarHelper.getLeaveEarned(employee.entitlement,employee.balance,employee.leaveArr,daysBetween);
			
			//Put above values into the tooltip
			tooltip.innerText = "Tenure Day: " + daysBetween + "\nLeaves Earned: " +  leavesEarned ;
			event.target.appendChild(tooltip);

			//console.log("focused: "),'\u200c';
			//console.log( event.target);

			
		  });

		
		  cell.addEventListener('blur',function(event){

			event.target.removeChild(tooltip);
			//console.log("blurred: "),'\u200c';
			//console.log( event.target);

		  });

		
		});
	}

	addTableCellClickEvents(table){

		const tableCells = table.querySelectorAll('td[role="tenureDay"]');
		const ApplyButton = document.getElementById('calendar-AL-button');
		const removeButton = document.getElementById('calendar-Remove-button');
		const caption = this.caption;
		const head = this.head;
		var selectedDayIndexArr = this.selectedDayIndexArr;
		var selectedALDayIndexArr = this.selectedALDayIndexArr;
		const self = this;

		function isSelected(date,selectedCellArray) {
			
			return selectedCellArray.includes(date);
		}
		  
		function addSelectedDate(date,selectedCellArray) {
			
			selectedCellArray.push(date);
		}
		  
		function removeSelectedDate(date,selectedCellArray) {
			
			var index = selectedCellArray.indexOf(date);
			if (index > -1) {
			  selectedCellArray.splice(index, 1);
			}
		}

		tableCells.forEach(function(cell) {

			cell.addEventListener('click',function(){
				
				const dateString = cell.textContent.match(/^\d+/)[0] + " " + caption;
				const selectedDateObj = new Date(dateString);//here time is set to 0,0,0 for some reason which is fine(not always the case).If it isnt it will get wonky.
				

				//Get tenured day
				const daysBetween = calendarHelper.getDaysBetweenStartDate(head, selectedDateObj);
				const dayIndex = daysBetween - 1;

				if(!cell.classList.contains('tdAL')){

					console.log(cell.classList.contains('tdAL') + window.getComputedStyle(cell).getPropertyValue('background-color'));

					if(isSelected(dayIndex,selectedDayIndexArr)){
						removeSelectedDate(dayIndex,selectedDayIndexArr);
						cell.classList.remove('clickedTD');
						self.checkAndFreezeApplyButton(ApplyButton);
						//self.clearCalendarTable();
						//self.loadCalendarTable();
					}

					else{
						addSelectedDate(dayIndex,selectedDayIndexArr);
						cell.classList.add('clickedTD');
						self.checkAndFreezeApplyButton(ApplyButton);
						//self.clearCalendarTable();
						//self.loadCalendarTable();
					}

					console.log("Normal "+ selectedDayIndexArr);

				}

				else if(cell.classList.contains('tdAL')){

					if(isSelected(dayIndex,selectedALDayIndexArr)){
						removeSelectedDate(dayIndex,selectedALDayIndexArr);
						cell.classList.remove('clickedAL');
						self.checkAndFreezeRemoveButton(removeButton);
						//self.clearCalendarTable();
						//self.loadCalendarTable();
					}

					else{
						addSelectedDate(dayIndex,selectedALDayIndexArr);
						cell.classList.add('clickedAL');
						self.checkAndFreezeRemoveButton(removeButton);
						//self.clearCalendarTable();
						//self.loadCalendarTable();
					}

					console.log("AL " + selectedALDayIndexArr);

				}

					

			});



		});
	}

	clearCalendarTable() {
  
		const table = document.getElementById('employee-calendar-table');
		const rows = table.getElementsByTagName('tr');
	  
		 // Start from the last row, to avoid issues with index changes
		for (let i = rows.length - 1; i > 0; i--) 
		{
		  table.deleteRow(i);
		}
	}

	checkAndFreezeBFButtons(backwardButton,forwardButton){
		
		if(this.hasFirstDay){

			backwardButton.disabled = true;

		}

		if( !(this.hasFirstDay)	)
		{
			backwardButton.disabled = false;
		}
		
		if(this.hasLastDay)
		{
			forwardButton.disabled = true;
		}
		
		if(!(this.hasLastDay))
		{
			forwardButton.disabled = false;
		}

	}

	checkAndFreezeApplyButton(applyButton){

		if(this.selectedDayIndexArr.length === 0){

			applyButton.disabled = true;

		}

		else if(this.selectedDayIndexArr.length != 0){
			applyButton.disabled = false;
		}

	}

	checkAndFreezeRemoveButton(removeButton){

		if(this.selectedALDayIndexArr.length === 0){

			removeButton.disabled = true;

		}

		else if(this.selectedALDayIndexArr.length != 0){
			removeButton.disabled = false;
		}
		
	}


	loadCalendarTable(){
		
		console.log('just loaded');
		
		const table = document.getElementById("employee-calendar-table");
		const backwardButton = document.getElementById('calendar-backward-button');
		const forwardButton = document.getElementById('calendar-forward-button');
		const ApplyButton = document.getElementById('calendar-AL-button');
		const removeButton = document.getElementById('calendar-Remove-button');
		
		this.fillCalendarCaption();
		this.insertCalendarCells(table);
		this.dimStartMonthCells(table);
		this.dimLastMonthCells(table);
		this.setTenureDayCellsRole(table);
		this.setTenureDayCellsTabIndex(table);
		this.colorAnnualLeaveCells(table,employee.leaveArr);
		//this.colorSelectedCells(table,this.selectedDayIndexArr);
		//this.colorSelectedAnnualLeaveCells(table,this.selectedALDayIndexArr);
		this.addTableKeyEvents(table);
		this.addTTipTableCellFocusEvents(table);
		this.addTableCellClickEvents(table);
		this.checkAndFreezeBFButtons(backwardButton,forwardButton);
		this.checkAndFreezeApplyButton(ApplyButton);
		this.checkAndFreezeRemoveButton(removeButton);
		
		
	}

	loadCalendarButtonsListener(){

		const backwardButton = document.getElementById('calendar-backward-button');
		const forwardButton = document.getElementById('calendar-forward-button');
		const applyButton = document.getElementById('calendar-AL-button');
		const removeButton = document.getElementById('calendar-Remove-button');

		backwardButton.addEventListener('click', () => {
			this.clearCalendarTable();
			this.decreCalendarMonth();
			//console.log(calendar);
			this.selectedDayIndexArr = [];
			this.selectedALDayIndexArr = [];
			this.loadCalendarTable();
			
		});
		
		forwardButton.addEventListener('click', () => {
			this.clearCalendarTable();
			this.increCalendarMonth();
			//console.log(calendar);
			this.selectedDayIndexArr = [];
			this.selectedALDayIndexArr = [];
			this.loadCalendarTable();
			
		});

		applyButton.addEventListener('click',() =>{

			this.selectedDayIndexArr.forEach((element,index) => {

				console.log("Applying for  " +element);
				employee.leaveArr[element] = 1;
			});

			updateDBArr(employee.ID,employee.leaveArr);
			this.selectedDayIndexArr = [];
			this.clearCalendarTable();
			this.loadCalendarTable();
			//console.log(employee.leaveArr);
			document.getElementById('employee-applied').textContent = employee.getTotalLeavesApplied() + " days";
			
		});

		removeButton.addEventListener('click',() =>{

			this.selectedALDayIndexArr.forEach((element,index) => {

				console.log("Cancel for  " +element);
				employee.leaveArr[element] = 0;
			});

			updateDBArr(employee.ID,employee.leaveArr);
			this.selectedALDayIndexArr = [];
			this.clearCalendarTable();
			this.loadCalendarTable();
			//console.log(employee.leaveArr);
			document.getElementById('employee-applied').textContent = employee.getTotalLeavesApplied() + " days";
			
		});
									  
	}

	
	
	

}

