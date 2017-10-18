$(document).ready(()=>{
	var google = window.google;
	var zipcode = [];
	var autoComplete;


	$("#log-in").click(()=>{
		$('#myModal').modal('show');
	});

	function initAutocomplete() {
		// Create the autocomplete object, restricting the search to geographical
		// location types.
		autocomplete = new google.maps.places.Autocomplete(
			/** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
			{types: ['geocode']});

		// When the user selects an address from the dropdown, populate the address
		// fields in the form.
		autocomplete.addListener('place_changed', fillInAddress);
	}


	// var b = localStorage.getItem("watchList");
	// console.log(b);


	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA484XJs4GCEbGtIIJnnDKyVBpfbWkcOy4&libraries=places"
	async defer></script>
})