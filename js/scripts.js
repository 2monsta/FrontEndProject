$(document).ready(()=>{
	var google = window.google;
	$("#log-in").click(()=>{
		$('#myModal').modal('show');
	})
	var b = $(".start-location").val();
	var a = `<a href="map.html?zip=${b}" target="blank" class="btn btn-primary btn-block">GO!</a>`;
	$(".search-link").html(a);
})