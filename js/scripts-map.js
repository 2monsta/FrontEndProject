
function mapfunction(){
	var addressStart  =localStorage.getItem("addressStart");
	var addressEnd  =localStorage.getItem("addressEnd");
	var lat = [];
	var lng = [];
	var latA = 40.0000;
	var latB = -98.0000;
	var myLatLng = {
		lat: latA,
		lng: latB
	}
	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 4,
		center: myLatLng
	});

	var onChangeHandler = function() {
		calculateAndDisplayRoute(directionsService, directionsDisplay);
	};
	var geocoder = new google.maps.Geocoder();

	function geocodeAddress(geocoder, resultsMap, addressStartEnd) {
		lat = [];
		lng = [];
		geocoder.geocode({'address': addressStartEnd}, function(results, status) {
			if(status === 'OK') {
				resultsMap.setCenter(results[0].geometry.location);
				// this coresponds with setTimeOut
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
		latA = (lat[0] + lat[1])/2;
		latB = (lng[0] + lng[1])/2;
		var center = {
			lat:latA,
			lng:latB
		}

		var latFromGoogleStart = Math.floor(lat[0] * 100) / 100;
		var lngFromGoogleStart = Math.floor(lng[0] * 100) / 100;
		var latFromGoogleEnd = Math.floor(lat[1] * 100) / 100;
		var lngFromGoogleEnd = Math.floor(lng[1] * 100) / 100;
		console.log(latFromGoogleStart);
		console.log(lngFromGoogleStart);
		console.log(latFromGoogleEnd);
		console.log(lngFromGoogleEnd);

		var weatherUrlStart = `https://api.openweathermap.org/data/2.5/weather?lat=${latFromGoogleStart}&lon=${lngFromGoogleStart}&units=imperial&appid=ee13ecc0df34704b22cb350459ec341b`;
		var weatherUrlEnd = `https://api.openweathermap.org/data/2.5/weather?lat=${latFromGoogleEnd}&lon=${lngFromGoogleEnd}&units=imperial&appid=ee13ecc0df34704b22cb350459ec341b`;
		console.log(weatherUrlStart);
		console.log(weatherUrlEnd);

		$.getJSON(weatherUrlStart, function(weatherInfo){
			console.log(weatherInfo);
			console.log(weatherUrlStart);
			var temp = {
				current: weatherInfo.main.temp,
				max: weatherInfo.main.temp_max,
				min: weatherInfo.main.temp_min,
			}
			var icon = weatherInfo.weather[0].icon;
			$(".current-temp-start").text(temp.current);
			$(".max-temp-start").text(temp.max);
			$(".min-temp-start").text(temp.min);
			$('.icon-start').html(`<div class="col-sm-6 icon-start"><img src="http://openweathermap.org/img/w/${icon}.png"></div>`);
		})

		$.getJSON(weatherUrlEnd, function(weatherInfo){
			console.log(weatherInfo);
			console.log(weatherUrlEnd);
			var temp = {
				current: weatherInfo.main.temp,
				max: weatherInfo.main.temp_max,
				min: weatherInfo.main.temp_min,
			}
			var icon = weatherInfo.weather[0].icon;
			$(".current-temp-end").text(temp.current);
			$(".max-temp-end").text(temp.max);
			$(".min-temp-end").text(temp.min);
			$('.icon-end').html(`<div class="col-sm-6 icon-end"><img src="http://openweathermap.org/img/w/${icon}.png"></div>`);
		})



		map.setCenter(center);
		function calcRoute() {
			var start = new google.maps.LatLng(lat[0], lng[0]);
			//var end = new google.maps.LatLng(38.334818, -181.884886);
			var end = new google.maps.LatLng(lat[1], lng[1]);
			var bounds = new google.maps.LatLngBounds();
			bounds.extend(start);
			bounds.extend(end);
			map.fitBounds(bounds);
		}
		calcRoute();

		function calculateAndDisplayRoute(directionsService, directionsDisplay) {
			var routeMapStart = {
				lat: lat[0],
				lng: lng[0]
			}
			var routeMapEnd = {
				lat: lat[1],
				lng: lng[1]
			}
			var directionsService = new google.maps.DirectionsService;
			var directionsDisplay = new google.maps.DirectionsRenderer;
			directionsDisplay.setMap(map);
			directionsService.route({
				origin: routeMapStart,
				destination: routeMapEnd,
				travelMode: 'DRIVING'
			},function(response, status) {
				if (status === 'OK') {
					   directionsDisplay.setDirections(response);
				  } else {
					   window.alert('Directions request failed due to ' + status);
				  }
			});

			// PRINT address to the right
			directionsDisplay.setMap(map);
			directionsDisplay.setPanel(document.getElementById('info-box'));
	   
			var request = {
			  	origin: routeMapStart, 
			  	destination: routeMapEnd,
			  	travelMode: google.maps.DirectionsTravelMode.DRIVING
			};
	   
			directionsService.route(request, function(response, status) {
			  	if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
			 	}
			});
		}
		calculateAndDisplayRoute();

		// JASON
		$(".search-for-your-food").submit((e)=>{
			$(".loading-image").addClass("loader");
			e.preventDefault();
			infoWindow = new google.maps.InfoWindow;
			$(".food-search-button").click(()=>{
				infoWindow.close();
			})	
			var currentLocationLat;
			var currentLocationLng;
					// Try HTML5 geolocation.
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					var pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					currentLocationLat = pos.lat;
					currentLocationLng = pos.lng;
					var url = `https://developers.zomato.com/api/v2.1/geocode?apikey=5c177e0bff7c66946fd19276c7ce4de6&lat=${currentLocationLat}&lon=${currentLocationLng}`
					$.getJSON(url, function(foodData){
						// console.log(foodData);
						// var cusID = foodData.location.city_id;
						var inputData = $("#food-search").val().toLowerCase();
						$("#food-search").val("");
						var foodHTML = ``;
						if(inputData == ``){
							foodHTML = "You didn't search!"
							map.setZoom(12);
							infoWindow.setPosition(pos);
							$(".loading-image").removeClass("loader");
							infoWindow.setContent(foodHTML);
							infoWindow.open(map);
							map.setCenter(pos);
						}else{
							foodHTML += `<h3>Here's what you searched for</h3><ul>`
							foodData.nearby_restaurants.map((rest)=>{
								var restaurantCuisine = rest.restaurant.cuisines.toLowerCase();
								if(restaurantCuisine.indexOf(inputData) != -1){
									foodHTML += `<a href="${rest.restaurant.url}"><li>${rest.restaurant.name}</li></a>`
								}
							});
							foodHTML +=`</ul>`
							map.setZoom(12);
							infoWindow.setPosition(pos);
							$(".loading-image").removeClass("loader");
							infoWindow.setContent(foodHTML);
							infoWindow.open(map);
							map.setCenter(pos);
						}
					});

				},function() {
					handleLocationError(true, infoWindow, map.getCenter());
				});
			}else{
				// Browser doesn't support Geolocation
				handleLocationError(false, infoWindow, map.getCenter());
			}
			function handleLocationError(browserHasGeolocation, infoWindow, pos) {
				infoWindow.setPosition(pos);
				infoWindow.setContent(browserHasGeolocation ?
									'Error: The Geolocation service failed.' :
									'Error: Your browser doesn\'t support geolocation.');
				infoWindow.open(map);
			}
		})
	}, 1000);



	geocodeAddress(geocoder, map, addressStart);
	geocodeAddress(geocoder, map, addressEnd);

	$("#log-in").click(()=>{
		$('#myModal').modal('show');
	});
}
