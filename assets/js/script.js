
//setup
if(localStorage.getItem("nail") == null){
	reset();
}

function reset(){
	localStorage.setItem("nail", "old-nail");
	localStorage.setItem("charm-notches", "3");
	localStorage.setItem("fireball", "vengeful-spirit");
	localStorage.setItem("dive", "desolate-dive");
	localStorage.setItem("scream", "howling-wraiths");
	//stored as csv's, all charms MUST be followed by a comma!
	localStorage.setItem("charmlist", "");
}

//Uncomment below to set values to default on loading the page.
//reset();

//Uncomment below to show charms on loading the page
$('.inventory').fadeIn('slow', function(event){});

var health = getHealth();
var nail;
var nailDamage;

var red = "#DB4244";
var white = "#fff";

var grayChevron = false;

var glow = "radial-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 70%)";

setup();

$(document).ready(function() {
	$('.detection').each(function() {
		$(this).width($(this).parent().children('img').first().width());
		$(this).height($(this).parent().children('img').first().height());
	});
});

// ON CLICK //

$('.charms').on('click', function(event){
	$('.inventory').fadeIn('slow', function(event){});
});

$('.inventory').on('click', function(event){
	var classes = event.target.classList;
	if(classes.contains("flex-center")){
		$('.inventory').fadeOut('slow', function(event){});
	}else if(classes.contains("nail-img")){

		$('.nail-img').parent().removeClass("select");

		$(event.target).parent().addClass("select");

		var str = classes.item(classes.length - 1);
		localStorage.setItem("nail", str + "-nail");
		updateDamage();
	}else if(classes.contains("spell-img")){
		toggleSpell(event.target);
	}
});

$('.charm-row > div > div').on('click', function(event){
	var html = $(event.target).parent().html();
	var charm = html.substring(html.indexOf("charms/") + 7, html.indexOf(".png"));

	if(hasCharm(charm)){
		$(event.target).parent().removeClass("select");
		removeCharm(charm);
	}else{
		$(event.target).parent().addClass("select");
		addCharm(charm);
	}

	calculateDamage();
});

// ON HOVER //

$('.detection').hover(
	function(){
		console.log($(this));
		$(this).parent().addClass("hover");
	}, function(){
		$(this).parent().removeClass("hover");
	}
);


$('.current-page').hover(
	function(){
		if(!grayChevron){
			setChevron(true, this);
			grayChevron = true;
		}
	}, function(){
		if(grayChevron){
			setChevron(false, this);
			grayChevron = false;
		}
	}
);

// FUNCTIONS //

function addCharm(charm){
	localStorage.setItem("charmlist", localStorage.getItem("charmlist") + charm + ",");
}

function removeCharm(charm){
	localStorage.setItem("charmlist", localStorage.getItem("charmlist").replace(charm + ",", ""));
}

function toggleSpell(target){
	var classes = target.classList;

	if(classes.contains("fireball-img")){
		if(localStorage.getItem("fireball") == "vengeful-spirit"){
			localStorage.setItem("fireball", "shade-soul");

			$('.vengeful-spirit').hide();
			$('.shade-soul').show();
		}else{
			localStorage.setItem("fireball", "vengeful-spirit");

			$('.shade-soul').hide();
			$('.vengeful-spirit').show();
		}
		updateFireball();
	}else if(classes.contains("dive-img")){
		if(localStorage.getItem("dive") == "desolate-dive"){
			localStorage.setItem("dive", "descending-dark");

			$('.desolate-dive').hide();
			$('.descending-dark').show();
		}else{
			localStorage.setItem("dive", "desolate-dive");

			$('.descending-dark').hide();
			$('.desolate-dive').show();
		}
		updateDive();
	}else{
		if(localStorage.getItem("scream") == "howling-wraiths"){
			localStorage.setItem("scream", "abyss-shriek");

			$('.howling-wraiths').hide();
			$('.abyss-shriek').show();
		}else{
			localStorage.setItem("scream", "howling-wraiths");

			$('.abyss-shriek').hide();
			$('.howling-wraiths').show();
		}
		updateScream();
	}
}

function highlightCharms(){
	var charms = localStorage.getItem("charmlist");
	var charm;

	while(charms.length > 0){
		charm = charms.substring(0, charms.indexOf(","));
		highlightCharm(charm);
		charms = charms.substring(charms.indexOf(",") + 1, charms.length);
	}
}

function highlightCharm(charm){
	$('#' + charm).addClass("select");
}

function highlightNail(){
	var shortNail = nail.substring(0, nail.indexOf("-nail"));

	$('.' + shortNail).parent().addClass("select");
}

function correctSpells(){
	if(localStorage.getItem("fireball") == "shade-soul"){
		$('.vengeful-spirit').hide();
	}else{
		$('.shade-soul').hide();
	}
	if(localStorage.getItem("dive") == "descending-dark"){
		$('.desolate-dive').hide();
	}else{
		$('.descending-dark').hide();
	}
	if(localStorage.getItem("scream") == "abyss-shriek"){
		$('.howling-wraiths').hide();
	}else{
		$('.abyss-shriek').hide();
	}
}

function setChevron(gray, target){
	var str = $(target).html();

	if(gray){
		str = str.replace("chevron", "chevron-gray");
	}else{
		str = str.replace("-gray", "");
	}

	$(target).html(str);
}

function getHealth(){
	var str = $('.health').text();
	str = str.substring(8, str.length);

	return parseInt(str);
}

function setup(){
	updateDamage();
	highlightNail();
	correctSpells();
	highlightCharms();

	$();
}

function updateDamage() {
	updateNail();
	updateFireball();
	updateDive();
	updateScream();
	//NEED TO CONSIDER SHAMAN STONE!!!!!
}

function updateScream() {
	var damage = 0;

	if(localStorage.getItem("scream") == "howling-wraiths"){
		damage = 30;
	}else{
		damage = 80;
	}

	if(hasCharm("shaman-stone")){
		damage *= 1.5;
	}

	$('.scream').html(setUpTxt(localStorage.getItem("scream"), damage));
}

function updateDive() {
	var damage = 0;

	if(localStorage.getItem("dive") == "desolate-dive"){
		if(hasCharm("shaman-stone")){
			damage = 53;
		}else{
			damage = 35;
		}
	}else{
		if(hasCharm("shaman-stone")){
			damage = 88;
		}else{
			damage = 60;
		}
	}

	$('.dive').html(setUpTxt(localStorage.getItem("dive"), damage));
}

function updateFireball() {
	var damage = 0;

	//get damage of current fireball selection
	var str = "";
	if(localStorage.getItem("fireball") == "shade-soul"){
		str = "shade";
	}else{
		str = "vengeful";
	}
	if(hasCharm("shaman-stone")){
		str += "-shaman";
	}
	if(hasCharm("flukenest")){
		str += "-fluke";
		if(hasCharm("defenders-crest")){
			str += "-crest";
		}
	}

	switch(str){
		case "vengeful":
			damage = 15;
			break;
		case "vengeful-shaman":
			damage = 20;
			break;
		case "shade":
			damage = 30;
			break;
		case "shade-shaman":
			damage = 40;
			break;
		case "vengeful-fluke":
			damage = 36;
			break;
		case "vengeful-shaman-fluke":
			damage = 45;
			break;
		case "shade-fluke":
			damage = 64;
			break;
		case "shade-shaman-fluke":
			damage = 80;
			break;
		case "vengeful-fluke-crest":
		case "shade-fluke-crest":
			damage = 44;
			break;
		case "vengeful-shaman-fluke-crest":
		case "sbade-shaman-fluke-crest":
			damage = 58;
			break;
		default:
			damage = 0;
	}

	$('.fireball').html(setUpTxt(localStorage.getItem("fireball"), damage));
}

function updateNail() {
	var damage = 0;
	nail = localStorage.getItem("nail");

	//get base nail damage
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

	//Calculate base nail damage
	nailDamage = damage;
	if(hasCharm("unbreakable-strength")){
		damage *= 1.5;
	}
	if(hasCharm("fury-of-the-fallen")){
		damage *= 1.75;

		$('.col-1-5').css("border-color", red);
		$('.col-1-5').css("color", red);
	}else{
		$('.col-1-5').css("border-color", white);
		$('.col-1-5').css("color", white);
	}

	//Set nail image
	var txt = '<img src="../assets/images/gear/' + nail + '-tilt.png" alt=""> x ' + Math.ceil(health / damage);
	$('.nail').html(txt);

	//Calculate great slash damage
	damage *= 2.5;
	damage = Math.ceil(damage);

	$('.nail-art').html(setUpTxt("great-slash", damage));
}

function setUpTxt(filename, damage){
	var txt = '<img src="../assets/images/gear/' + filename + '.png" alt=""> x ';

	if(extraHit(damage)){
		txt += Math.floor(health / damage) + ' + <img src="../assets/images/gear/' + nail + '-tilt.png" alt="">';
	}else{
		txt += Math.ceil(health / damage);
	}

	return txt;
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
