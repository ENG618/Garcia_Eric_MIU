// Eric Garcia
// MIU 1305
// Project 1

window.addEventListener('DOMContentLoaded', function(){

	//Variables
	var eventMood = ['--Choose Mood--', 'Fun', 'Memorable', 'Sad'];
	var	sharedWith;
	var loadSavedData = gebid('loadSavedData');
	var clearSavedData = gebid('clearSavedData');
	var save = gebid('save');
	var errorMsg = gebid('errors');

	// getElementById Function
	function gebid(x){
		var elementRequested = document.getElementById(x);
		return elementRequested;
	}

	// Load default data from json.js
	function loadDefault () {
		for(var x in json){
			var id	= Math.floor(Math.random()*12345678);
			localStorage.setItem(id, JSON.stringify(json[x]));
		}
		alert('Your defaults have been loaded');
	}

	// Create mood field element and populate with options
	function creatMoodField(){
		var formTag = document.getElementsByTagName('form'),
			moodLi = gebid('addHTML'),
			makeMood = document.createElement('select');
			// Need to correct this element
			makeMood.setAttribute('id', 'mood');
		for (var i=0; i<eventMood.length; i++){
			var makeOption = document.createElement('option');
			var optText = eventMood[i];
			makeOption.setAttribute('value', optText);
			makeOption.innerHTML = optText;
			makeMood.appendChild(makeOption);
		}
		moodLi.appendChild(makeMood);
	}

	// Get checked values
	function getCheckedValues(){
		var checkboxes = gebid('form').sharedWith,
			checkedValues = [];
		for (i=0; i<checkboxes.length; i++){
			if(checkboxes[i].checked ){
				checkedValues.push(checkboxes[i].value);
			}
		}
		return checkedValues;
	}

	// Change nav links when on different pages
	function toggleNav(x){
		switch(x){
			case 'on':
				gebid('form').style.display = 'none';
				gebid('clearSavedData').style.display = 'inline';
				gebid('loadSavedData').style.display = 'none';
				gebid('addNewMemory').style.display = 'block';
				break;
			case 'off':
				gebid('form').style.display = 'block';
				gebid('clearSavedData').style.display = 'inline';
				gebid('loadSavedData').style.display = 'inline';
				gebid('addNewMemory').style.displa = 'none';
				gebid('memories').style.display = 'none';
				break;
			default:
				return false;
		}
	}

	// Save Data Functions (Store memory button)
	function saveForm(key){
		if(!key){
			var id	= Math.floor(Math.random()*12345678);
		}else{
			id = key;
		}
		var memory = {};
		memory.occasion = ['Occasion: ', gebid('occasion').value];
		memory.date = ['Date: ', gebid('date').value];
		memory.importance = ['Importance: ', gebid('importance').value];
		memory.eventMood = ['Mood: ', gebid('mood').value];
		memory.including = ['Shared With: ', getCheckedValues()];
		memory.notes = ['Notes: ', gebid('notes').value];
		// Save data to local Storage
		localStorage.setItem(id, JSON.stringify(memory));
		alert('Your memory is safe!!');
		window.location.reload();
	}

	// Load image for category selected
	function loadImg (makeSubList, moodName) {
		var imgLi = document.createElement('li');
		makeSubList.appendChild(imgLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute('src',  'img/'+ moodName +'.png');
		imgLi.appendChild(newImg);
	}

	// Load Data Function
	function loadData(){
		if(localStorage.length === 0){
			alert('There are no memories to display');
			loadDefault();
		}else{
			toggleNav('on');
			// Load from local storage
			var makeDiv = document.createElement('div');
			makeDiv.setAttribute('id', 'memories');
			var makeList = document.createElement('ul');
			makeDiv.appendChild(makeList);
			document.body.appendChild(makeDiv);
			gebid('memories').style.display = 'block';
			for (var i=0; i<localStorage.length; i++){
				var makeLi = document.createElement('li');
				var linksLi = document.createElement('li');
				makeList.appendChild(makeLi);
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				// Convert sting from local storage to object
				var obj = JSON.parse(value);
				// Creating another list for each memory
				var makeSubList = document.createElement('ul');
				makeLi.appendChild(makeSubList);
				loadImg(makeSubList, obj.eventMood[1]);
				for (var n in obj){
					var makeSubLi = document.createElement('li');
					makeSubList.appendChild(makeSubLi);
					var optSubText = obj[n][0]+' '+obj[n][1];
					makeSubLi.innerHTML = optSubText;
					makeSubList.appendChild(linksLi);
				}
				makeItemLinks(localStorage.key(i), linksLi);
			}
		}
	}

	// Clear Local Storage Function
	function clearData(){
		if(localStorage.length === 0){
			alert('There are no memories to clear');
		}else{
			var ask = confirm('This will cause you to forget all memories...Are you sure you want to do this?');
			if(ask){
			localStorage.clear();
			alert('All memories have been forgotten');
			window.location.reload();
			return false;
			}else{
				alert('All your memories are still safe!!');
			}
		}
	}

	// Function creates links to edit or delete items from local storage
	function makeItemLinks(key, linksLi){
		// Edit individual memory link
		var editMemLink = document.createElement('a');
		editMemLink.href = '#';
		editMemLink.key = key;
		var editMemText = 'Edit Memory';
		editMemLink.addEventListener('click', editMem);
		editMemLink.innerHTML = editMemText;
		linksLi.appendChild(editMemLink);

		// Add line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);

		// Delete individual memory link
		var deleteMemLink = document.createElement('a');
		deleteMemLink.href = '#';
		deleteMemLink.key = key;
		var deleteText = 'Erase From Memory';
		deleteMemLink.addEventListener('click', deleteMem);
		deleteMemLink.innerHTML = deleteText;
		linksLi.appendChild(deleteMemLink);
	}

	// Edit individual memory in local storage
	function editMem(){
		var value = localStorage.getItem(this.key);
		var memory = JSON.parse(value);

		// Show the form
		toggleNav('off');

		// Populate form fields
		gebid('occasion').value = memory.occasion[1];
		gebid('date').value = memory.date[1];
		gebid('importance').value = memory.importance[1];
		gebid('mood').value = memory.eventMood[1];
		var checkboxes = gebid('form').sharedWith;
		var y = memory.including[1];
		for(var x=0; x<y.length; x++){
			if(y.length >= 1){
				for(var i=0; i<checkboxes.length; i++){
					if(checkboxes[i].value === y[x]){
						checkboxes[i].setAttribute('checked', 'checked');
					}
				}
			}
		}
		gebid('notes').value = memory.notes[1];

		// Remove save event listener
		save.removeEventListener('click', validate);

		// Change save button to edit button
		save.innerHTML = 'Edit Memory';
		var editSave = save;

		// Save key value of memory selected to edit so it can be overwrote by the new info.
		editSave.addEventListener('click', validate);
		editSave.key = this.key;
	}

	// Delete individual memory
	function deleteMem(){
		var ask = confirm('Are you sure you want to forget this memory?');
		if(ask){
			localStorage.removeItem(this.key);
			alert('Memory has been forgotten');
			window.location.reload();
		}else{
			alert('Your memory is intact!!');
		}
	}

	// Validate form fields function
	function validate(e){
		// Define elements that need to be validated
		var getOccasion = gebid('occasion'),
			getDate = gebid('date'),
			getMood = gebid('mood');

		// Reset error message
		errorMsg.innerHTML = '';
		getOccasion.style.border = 'none';
		getMood.style.border = 'none';

		// Error messages array
		var errorMsgAry = [];

		// Occasion validation
		if(getOccasion.value === ''){
			var ocationError = 'Whats a memory with out an Occasion?';
			getOccasion.style.border = '1px solid red';
			errorMsgAry.push(ocationError);
		}

		// // Date validation
		// if(){

		// };

		// Mood validation
		if(getMood.value === '--Choose Mood--' ){
			var moodError = 'Setting the mood makes memories better!!';
			getMood.style.border = '1px solid red';
			errorMsgAry.push(moodError);
		}

		// If there are error messages display on screen
		if(errorMsgAry.length >= 1){
			for (var i=0; i<errorMsgAry.length; i++){
				var txt = document.createElement('li');
				txt.innerHTML = errorMsgAry[i];
				errorMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
			// If no errors save memory
			// Send key value with function call. Passed through editSave event listener as a property
			saveForm(this.key);
		}
	}

	// // Create mood field element and populate with options
	// function creatMoodSearch(){
	// 	var formTag = document.getElementsByTagName('form'),
	// 		moodLi = gebid('addCategories'),
	// 		makeMood = document.createElement('select');
	// 		// Need to correct this element
	// 		makeMood.setAttribute('id', 'mood');
	// 	for (var i=0; i<eventMood.length; i++){
	// 		var makeOption = document.createElement('option');
	// 		var optText = eventMood[i];
	// 		makeOption.setAttribute('value', optText);
	// 		makeOption.innerHTML = optText;
	// 		makeMood.appendChild(makeOption);
	// 	}
	// 	moodLi.appendChild(makeMood);
	// } // End createMoodSearch


	// // Search
	// var searchBtn = gebid('searchBtn');
	// var getMood = gebid('mood');
	// var searchField = gebid('searchField');

	// // Search
	// function getSearch () {
	// 	// No selections
	// 	console.log(getMood.value);
	// 	if (getMood.value == '--Choose Mood--' && searchField.value === ""){
	// 		alert('Please enter a category or term to search.');
	// 	}

	// 	// Search by mood only

	// 	// Search by text only

	// 	// Search by mood and text

	// } // End getSearch

	// Display/Clear data & Submit links
	loadSavedData.addEventListener('click', loadData);
	clearSavedData.addEventListener('click', clearData);
	if (save){
		save.addEventListener('click', validate);
		creatMoodField();
	}
	if (searchBtn){
		searchBtn.addEventListener('click', getSearch);
		creatMoodSearch();
	}
});

