// Eric Garcia
// MIU 1305
// Project 3


$('#home').on('pageinit', function(){
	//code needed for home page goes here
});

	$('#addItem').on('pageinit', function(){

		var myForm = $('#newMemForm'),
			errorLink = $('#errorLink');

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
				storeData(data);
			}
		});

	//any other code needed for addItem page goes here

});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){

};

var getData = function(){
	console.log(data);
};

var storeData = function(data){

};

var	deleteItem = function (){

};

var clearLocal = function(){

};


