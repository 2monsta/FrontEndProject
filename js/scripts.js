$(document).ready(()=>{
	var google = window.google;
	var address = [];
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





	$(".search-form").submit((e)=>{
		e.preventDefault();
		var start = $(".start-location").val();
		console.log(start);
		var end = $(".end-location").val();
		var oldAddress = localStorage.getItem("address")
		var info = JSON.parse(oldAddress);
		if(info == null){
			info = [];
		}
		info.push(start);
		info.push(end);
		var infoAsString = JSON.stringify(info);
		localStorage.setItem("address", infoAsString);
		
	});

	$("#go-button").click(()=>{
		var start = $(".start-location").val();
		console.log(start);
		var end = $(".end-location").val();
		var oldAddress = localStorage.getItem("address")
		var info = JSON.parse(oldAddress);
		if(info == null){
			info = [];
		}
		info.push(start);
		info.push(end);
		var infoAsString = JSON.stringify(info);
		localStorage.setItem("address", infoAsString);
	})
	initAutocomplete();
	initAutocompleteEnd();
})