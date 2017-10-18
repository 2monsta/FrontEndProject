
function mapfunction(){
	var addressStart  =localStorage.getItem("addressStart");
	var addressEnd  =localStorage.getItem("addressEnd");
	var lat = [];
	var lng = [];
	var a = 40.0000;
	var b = -98.0000;

	var myLatLng = {
		lat: a,
		lng: b
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

	setTimeout(function() {
		a = (lat[0] + lat[1])/2;
		b = (lng[0] + lng[1])/2;
		var center = {
			lat:a,
			lng:b
		}
		map.setCenter(center);
	}, 500);


	console.log(a);
	console.log(b);
	geocodeAddress(geocoder, map, addressStart);
	geocodeAddress(geocoder, map, addressEnd);
}
