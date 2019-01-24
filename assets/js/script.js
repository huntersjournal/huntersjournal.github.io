
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
//$('.inventory').fadeIn('slow', function(event){});

var health = getHealth();
var nail;
var nailDamage;

var red = "#DB4244";
var white = "#fff";

var grayChevron = false;

var glow = "radial-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 70%)";

setup();

//Show/hide charms
$('.charms').on('click', function(event){
	$('.inventory').fadeIn('slow', function(event){});
});

$('.inventory').on('click', function(event){
	var classes = event.target.classList;
	if(classes.contains("flex-center")){
		$('.inventory').fadeOut('slow', function(event){});
	}else if(classes.contains("nail-img")){

		$('.nail-img').parent().css({
			backgroundImage: 'none'
		});

		$(event.target).parent().css({
			backgroundImage: glow
		});

		var str = classes.item(classes.length - 1);
		localStorage.setItem("nail", str + "-nail");
		updateDamage();
	}else if(classes.contains("spell-img")){
		toggleSpell(event.target);
	}
});

$('.charm-row > div > img').on('click', function(event){
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

//Hover over charm
$('.charm-row > div > img').hover(
	function(){
		var html = $(event.target).parent().html();
		var charm = html.substring(html.indexOf("charms/") + 7, html.indexOf(".png"));

		$(this).parent().addClass("hover");
		
	}, function(){
		var html = $(event.target).parent().html();
		var charm = html.substring(html.indexOf("charms/") + 7, html.indexOf(".png"));

		$(this).parent().removeClass("hover");
	}
);

//Chanage current page marker
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

//Hover over nail
$('.nail-img').hover(
	function(){
		var shortNail = nail.substring(0, nail.indexOf("-nail"));
		if(!this.classList.contains(shortNail)){
			$(this).parent().css({
				"background-image" : glow
			});
		}
		$(this).parent().css({
			"bottom" : "5px"
		});
	}, function(){
		var shortNail = nail.substring(0, nail.indexOf("-nail"));
		if(!this.classList.contains(shortNail)){
			$(this).parent().css({
				"background-image" : "none"
			});
		}
		$(this).parent().css({
			"bottom" : "0"
		});
	}
);

$('.spell-img').hover(
	function(){
		$(this).parent().css({
			"background-image" : glow,
			"bottom" : "5px"
		});
	}, function(){
		$(this).parent().css({
			"background-image" : "none",
			"bottom" : "0"
		});
	}
);

function addCharm(charm){
	localStorage.setItem("charmlist", localStorage.getItem("charmlist") + charm + ",");
}

function removeCharm(charm){
	localStorage.setItem("charmlist", localStorage.getItem("charmlist").replace(charm + ",", ""));
}

function toggleSpell(target){
	var classes = target.classList;
	var str = $(target).parent().html();

	console.log($(target).parent());

	if(classes.contains("fireball-img")){
		if(localStorage.getItem("fireball") == "vengeful-spirit"){
			localStorage.setItem("fireball", "shade-soul");
			$(target).parent().html(str.replace("vengeful-spirit", "shade-soul").replace("Vengeful Spirit", "Shade Soul"));
		}else{
			localStorage.setItem("fireball", "vengeful-spirit");
			$(target).parent().html(str.replace("shade-soul", "vengeful-spirit").replace("Shade Soul", "Vengeful Spirit"));
		}
		updateFireball();
	}else if(classes.contains("dive-img")){
		if(localStorage.getItem("dive") == "desolate-dive"){
			localStorage.setItem("dive", "descending-dark");
			$(target).parent().html(str.replace("desolate-dive", "descending-dark").replace("Desolate Dive", "Descending Dark"));
		}else{
			localStorage.setItem("dive", "desolate-dive");
			$(target).parent().html(str.replace("descending-dark", "desolate-dive").replace("Descending Dark", "Desolate Dive"));
		}
		updateDive();
	}else{
		if(localStorage.getItem("scream") == "howling-wraiths"){
			localStorage.setItem("scream", "abyss-shriek");
			$(target).parent().html(str.replace("howling-wraiths", "abyss-shriek").replace("Howling Wraiths", "Abyss Shriek"));
		}else{
			localStorage.setItem("scream", "howling-wraiths");
			$(target).parent().html(str.replace("abyss-shriek", "howling-wraiths").replace("Abyss Shriek", "Howling Wraiths"));
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

	$('.' + shortNail).parent().css({
		backgroundImage: glow
	});
}

function correctSpells(){
	if(localStorage.getItem("fireball") == "shade-soul"){
		$('.fireball-img').parent().html($('.fireball-img').parent().html().replace("vengeful-spirit", "shade-soul").replace("Vengeful Spirit", "Shade Soul"));
	}
	if(localStorage.getItem("dive") == "descending-dark"){
		$('.dive-img').parent().html($('.dive-img').parent().html().replace("desolate-dive", "descending-dark").replace("Desolate Dive", "Descending Dark"));
	}
	if(localStorage.getItem("scream") == "abyss-shriek"){
		$('.scream-img').parent().html($('.scream-img').parent().html().replace("howling-wraiths", "abyss-shriek").replace("Howling Wraiths", "Abyss Shriek"));
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
