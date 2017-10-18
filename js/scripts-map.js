
function mapfunction(){
	var addressStart  =localStorage.getItem("addressStart");
	var addressEnd  =localStorage.getItem("addressEnd");
	var lat = [];
	var lng = [];

	var myLatLng = {
		lat: 40.0000,
		lng: -98.0000
	}

	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 4,
		center: myLatLng
	});
	
	var geocoder = new google.maps.Geocoder();


	function geocodeAddress(geocoder, resultsMap, addressStartEnd) {
		lat = [];
		lng = [];
		geocoder.geocode({'address': addressStartEnd}, function(results, status) {
			if(status === 'OK') {
				resultsMap.setCenter(results[0].geometry.location);
				lat.push(results[0].geometry.location.lat());
				lng.push(results[0].geometry.location.lng());

				var marker = new google.maps.Marker({
					map: resultsMap,
					position: results[0].geometry.location
				});
			}else{
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});
	}

	geocodeAddress(geocoder, map, addressStart);
	geocodeAddress(geocoder, map, addressEnd);
}
