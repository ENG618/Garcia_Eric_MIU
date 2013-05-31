// Eric Garcia
// MIU 1305
// Project 4
// Gold app


// #home page ready function
$('#home').on('pageinit', function(){
	//code needed for home page goes here
}); // End: #home page ready function

// #addItem page ready function
// $('#addItem').on('pageinit', function(){
	$(document).ready(function(){
	// var decloration for #addItem
	var myForm = $('#newMemForm'),
		errorLink = $('#errorLink');
		// End: var decloration

	// Form validation
	myForm.validate({
		// invalidHandler funciton
		invalidHandler: function(form, validator) {
			errorLink.click();
			html = '';
			for(key in validator.submitted){
				var label = $('label[for^="'+ key +'"]').not('[generated]');
				var legend = label.closest('fildset').find('.ui-controlgroup-lable');
				var fieldName = legend.length ? legend.text() : label.text();
				html += '<li>'+ fieldName +'</li>';
			} // End: for in loop
			$("#errorLink ul").html(html);
		}, // End: invalidHandler function
		// submitHandler function
		submitHandler: function() {
			var data = myForm.serializeArray();
			console.log(data);
			storeData(data);
		} // End: submitHandler function
	}); // End: Form validation

//any other code needed for addItem page goes here

}); // End: #addItem page ready function

// 
$('#recentMem').on('pageinit', function(){
	//code needed for recentMem page goes here

});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){

};

var getData = function(){
	console.log(data);
};

// Get checked values
function getCheckedValues(){
	var checkboxes = $("#checkboxes").sharedWith,
		checkedValues = [];
	for (i=0; i<checkboxes.length; i++){
		if(checkboxes[i].checked ){
			checkedValues.push(checkboxes[i].val());
		}
	}
	console.log($("#checkboxes"));
	console.log(checkedValues);
	return checkedValues;
}

var storeData = function(data, key){
		if(!key){
			var id	= Math.floor(Math.random()*12345678);
		}else{
			id = key;
		}
		var memory = {};
		memory.occasion = ['Occasion: ', $('#occasion').val()];
		memory.date = ['Date: ', $('#date').val()];
		memory.importance = ['Importance: ', $('#importance').val()];
		memory.eventMood = ['Mood: ', $('#mood').value];
		memory.including = ['Shared With: ', $("#checkboxes").val()];
		// memory.including = ['Shared With: ', getCheckedValues()];
		memory.notes = ['Notes: ', $('#notes').val()];
		// Save data to local Storage
		localStorage.setItem(id, JSON.stringify(memory));
		alert('Your memory is safe!!');
};

var	deleteItem = function (){

};

var clearLocal = function(){
	// Clear Local Storage Function
	if(localStorage.length === 0){
		alert('There are no memories to clear');
	}else{
		var ask = confirm('This will cause you to forget all memories...Are you sure you want to continue?');
		if(ask){
		localStorage.clear();
		alert('All memories have been forgotten');
		return false;
		}else{
			alert('All your memories are still safe!!');
		}
	}
};

getData();

