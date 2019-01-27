
//setup
if(localStorage.getItem("nail") == null){
	reset();
}

function reset(){
	localStorage.setItem("nail", "old-nail");
	localStorage.setItem("charm-notches", "0");
	localStorage.setItem("fireball", "vengeful-spirit");
	localStorage.setItem("dive", "desolate-dive");
	localStorage.setItem("scream", "howling-wraiths");
	//stored as csv's, all charms MUST be followed by a comma!
	localStorage.setItem("charmlist", "");
}

//Uncomment below to set values to default on loading the page.
reset();

//Uncomment below to show charms on loading the page
$('.inventory').fadeIn('slow', function(event){});

var health = getHealth();
var nail;
var nailDamage;

var red = "#DB4244";
var white = "#fff";

var grayChevron = false;

var glow = "radial-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 70%)";

var charms = [
	{name:"wayward-compass", notches:1},
	{name:"gathering-swarm", notches:1},
	{name:"stalwart-shell", notches:2},
	{name:"soul-catcher", notches:2},
	{name:"shaman-stone", notches:3},
	{name:"soul-eater", notches:4},
	{name:"dashmaster", notches:2},
	{name:"thorns-of-agony", notches:1},
	{name:"fury-of-the-fallen", notches:2},
	{name:"unbreakable-heart", notches:2},
	{name:"unbreakable-greed", notches:2},
	{name:"unbreakable-strength", notches:3},
	{name:"spell-twister", notches:2},
	{name:"steady-body", notches:1},
	{name:"heavy-blow", notches:2},
	{name:"quick-slash", notches:3},
	{name:"longnail", notches:2},
	{name:"mark-of-pride", notches:3},
	{name:"baldur-shell", notches:2},
	{name:"flukenest", notches:3},
	{name:"defenders-crest", notches:1},
	{name:"glowing-womb", notches:2},
	{name:"quick-focus", notches:3},
	{name:"deep-focus", notches:4},
	{name:"lifeblood-heart", notches:2},
	{name:"lifeblood-core", notches:3},
	{name:"jonis-blessing", notches:4},
	{name:"grubsong", notches:1},
	{name:"grubberflys-elegy", notches:3},
	{name:"hiveblood", notches:4},
	{name:"spore-shroom", notches:1},
	{name:"sharp-shadow", notches:2},
	{name:"shape-of-unn", notches:2},
	{name:"nailmasters-glory", notches:1},
	{name:"dream-wielder", notches:1},
	{name:"kingsoul", notches:5},
	{name:"dreamshield", notches:3},
	{name:"weaversong", notches:2},
	{name:"sprintmaster", notches:1},
	{name:"carefree-melody", notches:3},
	{name:"grimmchild", notches:2}
];

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
		equipCharm(charm);
	}

	updateDamage();
});

// ON HOVER //

$('.detection').hover(
	function(){
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

function toggleSpell(target){
	var classes = target.classList;

	if(classes.contains("fireball-img")){
		if(localStorage.getItem("fireball") == "vengeful-spirit"){
			localStorage.setItem("fireball", "shade-soul");

			$('.vengeful-spirit').hide();
			$('.shade-soul').show();

			$(target).prop("title", "Shade Soul");
		}else{
			localStorage.setItem("fireball", "vengeful-spirit");

			$('.shade-soul').hide();
			$('.vengeful-spirit').show();

			$(target).prop("title", "Vengeful Spirit");
		}
		updateFireball();
	}else if(classes.contains("dive-img")){
		if(localStorage.getItem("dive") == "desolate-dive"){
			localStorage.setItem("dive", "descending-dark");

			$('.desolate-dive').hide();
			$('.descending-dark').show();

			$(target).prop("title", "Descending Dark");
		}else{
			localStorage.setItem("dive", "desolate-dive");

			$('.descending-dark').hide();
			$('.desolate-dive').show();

			$(target).prop("title", "Desolate Dive");
		}
		updateDive();
	}else{
		if(localStorage.getItem("scream") == "howling-wraiths"){
			localStorage.setItem("scream", "abyss-shriek");

			$('.howling-wraiths').hide();
			$('.abyss-shriek').show();

			$(target).prop("title", "Abyss Shriek");
		}else{
			localStorage.setItem("scream", "howling-wraiths");

			$('.abyss-shriek').hide();
			$('.howling-wraiths').show();

			$(target).prop("title", "Howling Wraiths");
		}
		updateScream();
	}
}

function equipCharm(charm) {
	//if has < 11 charm notches unused, the equip charm
	var notches = parseInt(localStorage.getItem("charm-notches"));

	if(notches < 11){
		notches += getNotches(charm);

		localStorage.setItem("charm-notches", notches);

		$(event.target).parent().addClass("select");
		localStorage.setItem("charmlist", localStorage.getItem("charmlist") + charm + ",");

		updateNotches();
	}
}

function removeCharm(charm){
	localStorage.setItem("charm-notches", parseInt(localStorage.getItem("charm-notches")) - getNotches(charm));

	localStorage.setItem("charmlist", localStorage.getItem("charmlist").replace(charm + ",", ""));

	updateNotches();
}

function getNotches(charm){
	var notches = 0;
	charms.forEach(function(element) {
		if(element.name === charm){
			notches = element.notches;
		}
	});
	return notches;
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
	$('.' + charm).addClass("select");
}

function highlightNail(){
	var shortNail = nail.substring(0, nail.indexOf("-nail"));

	$('.' + shortNail).parent().addClass("select");
}

function correctSpells(){
	if(localStorage.getItem("fireball") == "shade-soul"){
		$('.vengeful-spirit').hide();
		$('.fireball-img').prop("title", "Shade Soul");
	}else{
		$('.shade-soul').hide();
	}
	if(localStorage.getItem("dive") == "descending-dark"){
		$('.desolate-dive').hide();
		$('.dive-img').prop("title", "Descending Dark");
	}else{
		$('.descending-dark').hide();
	}
	if(localStorage.getItem("scream") == "abyss-shriek"){
		$('.howling-wraiths').hide();
		$('.scream-img').prop("title", "Abyss Shriek");
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
	updateNotches();
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

function updateNotches(){
	var i = parseInt(localStorage.getItem("charm-notches"));

	console.log(i);

	if(i > 11){
		i = 11;
	}

	var j = i + 1;
	while(j < 12){
		console.log("j: " + j);
		$('.charm-notches div:nth-child(' + j + ')').removeClass("used");
		j++;
	}

	while(i > 0){
		console.log("i: " + i);
		$('.charm-notches div:nth-child(' + i + ')').addClass("used");
		i--;
	}
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
