// Eric Garcia
// MIU 1305
// Project 4
// Gold app


$('#home').on('pageinit', function(){
	//code needed for home page goes here
});

var currentTime = new Date();

$("#date").value(currentTime);

$('#addItem').on('pageinit', function(){

	var myForm = $('#newMemForm'),
		errorLink = $('#errorLink'),
		currentTime = new Date();

	myForm.validate({
		invalidHandler: function(form, validator) {
			errorLink.click();
			html = '';
			for(key in validator.submitted){
				var label = $('label[for^="'+ key +'"]').not('[generated]');
				var legend = label.closest('fildset').find('.ui-controlgroup-lable');
				var fieldName = legend.length ? legend.text() : label.text();
				html += '<li>'+ fieldName +'</li>';
			}
			$("#errorLink ul").html(html);
		},
		submitHandler: function() {
			var data = myForm.serializeArray();
			console.log(data)
			storeData(data);
		}
	});

// $("#date").value(currentTime);
//any other code needed for addItem page goes here

});

// 
$('#recentMem').on('pageinit', function(){
	//code needed for recentMem page goes here
	
};
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){

};

var getData = function(){
	console.log(data);

var storeData = function(data){
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

