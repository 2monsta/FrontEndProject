$(document).ready(function(){
	//get local storage information

	var addressStart  =localStorage.getItem("addressStart");
	var addressEnd  =localStorage.getItem("addressEnd");
	// convert addressStart to a lat and long
	var myLatLng = {
		lat: 40.0000,
		lng: -98.0000
	}
	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 4,
		center: myLatLng
	});









	function createMakrer(){
		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
		});
		// google.maps.event.addListener(marker, "click", ()=>{
		// 	infoWindow.setContent(`<h2>${city.city}</h2><h4>City Population: ${city.yearEstimate}`);
		// 	infoWindow.open(map, marker);
		// });
		// markers.push(marker);
	}




	createMakrer();
});