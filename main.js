// Activity 2
// Visual Frameworks 1207
// Abraham Kowitz
window.addEventListener('load', function() {
    setTimeout(scrollTo, 0, 0, 1);
}, false);
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
	function getSelectedEatRadio(){
		var radios = document.forms[0].eatHabits;
		for(var i = 0; i<radios.length; i++){
			if(radios[i].checked){
				eatHabitsValue = radios[i].value;
			}
		}
	}

	function getSelectedExerciseRadio(){
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
		getSelectedEatRadio();
		getSelectedExerciseRadio();
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
			alert("There is no data in Local Storage so the default data was added.")
			autoFillData();
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
			getImage(obj.familySelect[1], makeSubList);
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
	
	// Get the image for the right category
 	function getImage(catName, makeSubList){
		var imageLi = document.createElement('li');
 		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/"+ catName + ".jpg");
		imageLi.appendChild(newImg);
	}

	//Auto Populate Storage 
	function autoFillData(){
		// The actual JSON object data required for this to work is coming form the json.js file which is loaded from our HTML page.
		// Store the JSON object into Local Storage.
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
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
		editLink.addEventListener("click", editItem);
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
		deleteLink.addEventListener("click", deleteItem);
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
			if(radios[i].value === item.eatHabits[1]);
			}
						
		for (var i=0; i<radios.length; i++){
			if(radios[i].value === item.exerciseHabits[1]);
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
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this record?");
		if(ask){
			localStorage.removeItem(this.key);
			window.location.reload();
		}else{
			alert("Record was not deleted!");
		}
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
		var getFirstName = $('firstName');
		var getLastName = $('lastName');
		var getAge = $('age');
		var getEatHabits = $('eatHabits');
		var getExerciseHabits = $('exerciseHabits');
		var getDocVisit = $('docVisit');
		var getComments = $('comments');
		
		// Reset Error Messages
		errMsg.innerHTML = "";
		getFirstName.style.border = "1px solid black";
		getLastName.style.border = "1px solid black";
		
		
		// Get Error Messages
		var messageAry = [];
		
		// First Name Validation
		if(getFirstName.value === ""){
			var fNameError = "Please enter a first name."
			getFirstName.style.border = "1px solid red";
			messageAry.push(fNameError);
		}	

		// Last Name Validation
		if(getLastName.value === ""){
			var lNameError = "Please enter a last name."
			getLastName.style.border = "1px solid red";
			messageAry.push(lNameError);
		}

		// Age Validation
		if(getAge.value === ""){
			var ageError = "Please enter your age."
			getAge.style.border = "1px solid red";
			messageAry.push(ageError);
		}
		
		if(getEatHabits === "checked"){
			var eatHabitsError = "Please select your eating habits."
			getEatHabits.style.border = "1px solid red";
			messageAry.push(eatHabitsError);
		}

		if(getExerciseHabits === ""){
			var exerciseHabitsError = "Please select your exercise habits."
			getExerciseHabits.style.border = "1px solid red";
			messageAry.push(exerciseHabitsError);
		}
				
		// Doctor's Visit Validation
		if(getDocVisit.value === ""){
			var docVisitError = "Please enter the date of your last doctor's visit."
			getDocVisit.style.border = "1px solid red;"
			messageAry.push(docVisitError);
		}
		
		// Comments Validation
		if(getComments.value === "What did the doctor say?"){
			var commentsError = "Please enter info about your medical checkup."
			getComments.style.border = "1px solid red;"
			messageAry.push(commentsError);
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
		age,
		sexValue,
		eatHabitsValue,
		exerciseHabitsValue,
		diabetesValue = "No",
		comments,
		firstName,
		lastName,
		docVisit,
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
