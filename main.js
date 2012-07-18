// Activity 2
// Visual Frameworks 1207
// Abraham Kowitz

// Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){

	// getElementById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

	// Create select field element and populate with options.
	function makeCats(){
		var formTag = document.getElementsByTagName("form"),
			selectLi = $('familySelect'),
			makeSelect = document.createElement('familySelect');
			makeSelect.setAttribute("id", "family");
		for(var i=0, j=familyMemberGroup.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = familyMemberGroup[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}

	// Find value of selected radio button.
	function getSelectedRadio(){
		var radios = document.forms[0].eatHabits;
		for(var i = 0; i<radios.length; i++){
			if(radios[i].checked){
				eatHabitsValue = radios[i].value;
			}
		}
	}

	function getSelectedRadio(){
		var radios = document.forms[0].exerciseHabits;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				exerciseHabitsValue = radios[i].value;
			}
		}
	}

	function getCheckboxValue(){
		if($('diabetes').checked){
			diabetesValue = $('diabetes').value;
		}else{
			diabetesValue = "No"
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				$('contactForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('contactForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;
		}
	}

	function storeData(key){
	// if there is no key, this means this is a brand new item and we need a new key.
	if (!key){
		var id				= Math.floor(Math.random()*100000001);
	}else{
	// set the id to the existing key we're editing so that it will save over the data.
	// the key is the same key that has been passed along from the edit submit event handler
	// to the validate function, and then passed here, into the storeData function.
		id = key;
	}
		// Gather up all our form field values and store in an object.
		// Object properties contain array with the form label and input value.
		getSelectedRadio();
		getCheckboxValue();
		var item				= {};
			item.familySelect	= ["Side of Family:", $('familySelect').value];
			item.firstName		= ["First Name:", $('firstName').value];
			item.lastName		= ["Last Name:", $('lastName').value];
			item.age			= ["Age:", $('age').value];
			item.sex			= ["Sex:", $('sex').value];
			item.eatHabits		= ["Eating Habits:", eatHabitsValue];
			item.exerciseHabits	= ["Exercising Habits:", exerciseHabitsValue];
			item.diabetes		= ["Diabetes:", $('diabetes').value];
			item.docVisit		= ["Last Checkup:", $('docVisit').value];
			item.comments		= ["Doctor's Comments:", $('comments').value];

		// Save data into Local Storage: Use Stringify to convert our object to a string
		localStorage.setItem(id, JSON.stringify(item));
		alert("Data Saved!");

	}

	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in Local Storage.")
		}
		// Write Data from Local Storage to the browser.
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeLi = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			// Convert the string from local storage value back to an object by using JSON.parse()
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); // Create our edit and delete buttons/link for each item in data
		}
	}

	// Make Item Links
	// Create the edit and delete links for each stored item when displayed
	function makeItemLinks(key, linksLi){
		// add edit single item link
		var editLink = document.createElement('a');
		editLink.href = '#';
		editLink.key = key;
		var editText = "Edit Record";
		//editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		// add line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		//add delete single item link
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Record";
		//deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);	
	}
	
	function editItem(){
		// Grab the data from out item from local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);

		// Show the form
		toggleControls("off");
		
		// populate the form fields with current local storage values
		$('familySelect').value = item.familySelect[1];
		$('firstName').value = item.firstName[1];
		$('lastName').value = item.lastName[1];
		var radios = document.forms[0].eatHabits;
		var radios = document.forms[0].exerciseHabits;
		for (var i=0; i<radios.length; i++){
			if(radios(i.value == "a5" && obj.eatHabits[1]) == "a5"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "a4" && item.eatHabits[1] == "a4"){
				radios[i].setAttribute("checked", "checked");			
			}else if(radios[i].value == "a3" && item.eatHabits[1] == "a3"){
				radios[i].setAttribute("checked", "checked");			
			}else if(radios[i].value == "a2" && item.eatHabits[1] == "a2"){
				radios[i].setAttribute("checked", "checked");			
			}else if(radios[i].value == "a1" && item.eatHabits[1] == "a1"){
				radios[i].setAttribute("checked", "checked");
			}					
		}
		for (var i=0; i<radios.length; i++){
			if(radios(i.value == "b5" && obj.eatHabits[1]) == "b5"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "b4" && item.exerciseHabits[1] == "b4"){
				radios[i].setAttribute("checked", "checked");			
			}else if(radios[i].value == "b3" && item.exerciseHabits[1] == "b3"){
				radios[i].setAttribute("checked", "checked");			
			}else if(radios[i].value == "b2" && item.exerciseHabits[1] == "b2"){
				radios[i].setAttribute("checked", "checked");			
			}else if(radios[i].value == "b1" && item.exerciseHabits[1] == "b1"){
				radios[i].setAttribute("checked", "checked");
			}
		}				
		$('age').value = item.age[1];
		$('sex').value = item.sex[1];
		$('diabetes').value = item.diabetes[1];
		$('docVisit').value = item.docVisit[1];
		$('comments').value = item.comments[1];
		
		// Remove the inital listener fromt he input 'save contact' button.
		save.removeEventListener("click", storeData);
		// Change Submit Button to Edit Button.
		$('submit').value = "Edit Record";
		var editSubmit = $('submit');
		// Save the key value established in this function as a property of editSubmit event
		// so we can use that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.")
		}else{
			localStorage.clear();
			alert("All Data is deleted!");
			window.location.reload();
			return false;
		}
	}
	
	function validate(e){
		// Define the elements we want to check
		var getFamilySelect = $('familySelect');
		var getFirstName = $('firstName');
		var getLastName = $('lastName');
		
		// Reset Error Messages
		errMsg.innerHTML = "";
		getFirstName.style.border = "1px solid black;"
		getLastName.style.border = "1px solid black;"
		
		
		// Get Error Messages
		var messageAry = [];
		
		// First Name Validation
		if(getFirstName.value === ""){
			var fNameError = "Please enter a first name."
			getFirstName.style.border = "1px solid red;"
			messageAry.push(fNameError);
		}
		
		// Last Name Validation
		if(getLastName.value === ""){
			var lNameError = "Please enter a last name."
			getLastName.style.border = "1px solid red;"
			messageAry.push(lNameError);
		}	
	
		// If there were errors, display them on the screen
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
		e.preventDefault();
		return false;
		}else{
			// If all is okay, save data! Send the key value (which came from the editData function).
			// this key value was passed throught the editSubmit event listener as a property.
			storeData(this.key);
		} 		
	}
	
	// Variable Defaults
	var familyMemberGroup = ["Paternal", "Maternal", "Immediate"],
		sexValue,
		diabetesValue = "No",
		errMsg = $('errors');
	;
	makeCats();
	
	// Set Link and Click Events

	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);

	var save = $('submit');
	save.addEventListener("click", validate);
	
});