$(document).ready(function(){
	var google = window.google;
	var myLatLng = {
		lat: 40.0000,
		lng: -98.0000
	}
	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 4,
		center: myLatLng
	});
});