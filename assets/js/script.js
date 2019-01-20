
//$(document).ready(function(event){ 

//Setup

//Clicked on charms
$('.charms').on('click', function(event){
	$('.inventory').fadeIn('slow', function(event){});
});

$('.inventory').on('click', function(event){
	$('.inventory').fadeOut('slow', function(event){});
});

//});