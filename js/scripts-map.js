$(document).ready(function(){
	//get local storage information

	var addressStart  =localStorage.getItem("addressStart");
	var addressEnd  =localStorage.getItem("addressEnd");

	var myLatLng = {
		lat: 40.0000,
		lng: -98.0000
	}
	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 4,
		center: myLatLng
	});

	// convert addressStart to a lat and long
	var geocoder = new google.maps.Geocoder();
	geocodeAddress(geocoder, map);
	

	function geocodeAddress(geocoder, resultsMap) {
		geocoder.geocode({'address': addressStart}, function(results, status) {
		 	if(status === 'OK') {
				resultsMap.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: resultsMap,
			  		position: results[0].geometry.location
				});
		  	}else{
				alert('Geocode was not successful for the following reason: ' + status);
		  	}
		});
	  }

});