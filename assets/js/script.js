
//setup
if(localStorage.getItem("nail") == null){
	reset();
}

function reset(){
	localStorage.setItem("nail", "pure-nail");
	localStorage.setItem("charm-notches", 3);
	localStorage.setItem("fireball", false);
	localStorage.setItem("dive", false);
	localStorage.setItem("scream", false);
	localStorage.setItem("charmlist", "strength,");
}

var health = getHealth();
var nail;
var nailDamage;

var red = "#DB4244";
var white = "#fff";

updateDamage();

//Clicked on charms
$('.charms').on('click', function(event){
	$('.inventory').fadeIn('slow', function(event){});

	// localStorage.setItem("integer", localStorage.getItem("integer") + 1);
	// $('#demo').html(localStorage.getItem("integer"));
});

$('.inventory').on('click', function(event){
	$('.inventory').fadeOut('slow', function(event){});
	reset();
	updateDamage();
});


function getHealth(){
	var str = $('.health').text();
	str = str.substring(8, str.length);

	return parseInt(str);
}

function updateDamage() {
	updateNail();

	//NEED TO CONSIDER FLUKENEST, DEFENDERS CREST, SHAMAN STONE!!!!!
	//Fury of the fallen????
	//Strength
}

function updateNail() {
	var damage = 0;
	nail = localStorage.getItem("nail");

	switch(nail){
		case "old-nail":
			damage = 5;
			break;
		case "sharpened-nail":
			damage = 9;
			break;
		case "channelled-nail":
			damage = 13;
			break;
		case "coiled-nail":
			damage = 17;
			break;
		case "pure-nail":
			damage = 21;
			break;
		default:
			damage = 0;
	}

	nailDamage = damage;
	if(hasCharm("strength")){
		damage *= 1.5;
	}
	if(hasCharm("fury")){
		damage *= 1.75;

		$('.col-1-5').css("border-color", red);
		$('.col-1-5').css("color", red);
	}else{
		$('.col-1-5').css("border-color", white);
		$('.col-1-5').css("color", white);
	}

	var txt = '<img src="../assets/images/gear/' + nail + '-tilt.png" alt=""> x ' + Math.ceil(health / damage);;
	$('.nail').html(txt);

	damage *= 2.5;
	damage = Math.ceil(damage);

	txt = '<img src="../assets/images/gear/great-slash.png" alt=""> x ';

	var plusNail = extraHit(damage);

	if(plusNail){
		txt += Math.floor(health / damage) + ' + <img src="../assets/images/gear/' + nail + '-tilt.png" alt="">';
	}else{
		txt += Math.ceil(health / damage);
	}

	$('.nail-art').html(txt);
}

function hasCharm(charm){
	return localStorage.getItem("charmlist").indexOf(charm + ",") != -1;
}

function extraHit(damage){
	if(health % damage == 0) {
		return false;
	}

	//Min hits w/ spell or other set to one by checking health > damage
	if(health % damage <= nailDamage && health > damage) {
		return true;
	}

	return false;
}
