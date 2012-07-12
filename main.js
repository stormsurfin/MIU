// Activity 2
// Visual Frameworks 1207
// Abraham Kowitz

// Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){
	alert(localStorage.value(0));

	// getElementById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	// Create select field element and populate with options.
	function makeCats(){
		var formTag = document.getElementsByTagName("form"), // formTag is an array of all the form tags.
			selectLi = $('select'),
			makeSelect = document.createElement('select');
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
	
	//Find value of selected radio button.
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
		for(var i = 0; i<radios.length; i++){
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
				
	function storeData(){
		var id				= Math.floor(Math.random()*100000001);
		// Gather up all our form field values and store in an object.
		// Object properties contain array with the form label and input value.
		getSelectedRadio();
		getCheckboxValue();
		var item			= {};
			item.family		= ["Side of Family:", $('family').value];
			item.firstName	= ["First Name:", $('firstName').value];
			item.lastName	= ["Last Name:", $('lastName').value];
			item.age		= ["Age:", $('age').value];
			item.sex		= ["Sex:", $('sex').Value];
			item.diabetes	= ["Diabetes:", diabetesValue];

		// Save data into Local Storage: Use Stringify to convert our object to a string
		localStorage.setItem(id, JSON.stringify(item));
		alert("Data Saved!");
		
	}

	// Variable Defaults
	var familyMemberGroup = ["--Choose A Group--", "Paternal", "Maternal", "Immediate"],
		sexValue,
		diabetesValue = "No"
	;
	makeCats();
	
	// Set Link and Submit Click Events
	/*
var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);*/
	var save = $('submit');
	save.addEventListener("click", storeData);
