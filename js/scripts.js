$(document).ready(()=>{
	var google = window.google;
	var zipcode = [];
	var autoComplete;

	function initAutocomplete() {
		// Create the autocomplete object, restricting the search to geographical
		// location types.
		autocomplete = new google.maps.places.Autocomplete(
			/** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
			{types: ['geocode']});
	}
	function initAutocompleteEnd() {
		// Create the autocomplete object, restricting the search to geographical
		// location types.
		autocomplete = new google.maps.places.Autocomplete(
			/** @type {!HTMLInputElement} */(document.getElementById('autocomplete-end')),
			{types: ['geocode']});
	}



	$("#log-in").click(()=>{
		$('#myModal').modal('show');
	});






	initAutocomplete();
	initAutocompleteEnd();
})