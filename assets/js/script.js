
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

var charms = [
	{id:"wayward-compass", notches:1},
	{id:"gathering-swarm", notches:1},
	{id:"stalwart-shell", notches:2},
	{id:"soul-catcher", notches:2},
	{id:"shaman-stone", notches:3},
	{id:"soul-eater", notches:4},
	{id:"dashmaster", notches:2},
	{id:"thorns-of-agony", notches:1},
	{id:"fury-of-the-fallen", notches:2},
	{id:"unbreakable-heart", notches:2},
	{id:"unbreakable-greed", notches:2},
	{id:"unbreakable-strength", notches:3},
	{id:"spell-twister", notches:2},
	{id:"steady-body", notches:1},
	{id:"heavy-blow", notches:2},
	{id:"quick-slash", notches:3},
	{id:"longnail", notches:2},
	{id:"mark-of-pride", notches:3},
	{id:"baldur-shell", notches:2},
	{id:"flukenest", notches:3},
	{id:"defenders-crest", notches:1},
	{id:"glowing-womb", notches:2},
	{id:"quick-focus", notches:3},
	{id:"deep-focus", notches:4},
	{id:"lifeblood-heart", notches:2},
	{id:"lifeblood-core", notches:3},
	{id:"jonis-blessing", notches:4},
	{id:"grubsong", notches:1},
	{id:"grubberflys-elegy", notches:3},
	{id:"hiveblood", notches:4},
	{id:"spore-shroom", notches:1},
	{id:"sharp-shadow", notches:2},
	{id:"shape-of-unn", notches:2},
	{id:"nailmasters-glory", notches:1},
	{id:"dream-wielder", notches:1},
	{id:"kingsoul", notches:5},
	{id:"dreamshield", notches:3},
	{id:"weaversong", notches:2},
	{id:"sprintmaster", notches:1},
	{id:"carefree-melody", notches:3},
	{id:"grimmchild", notches:2}
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
	if(!$(this).hasClass("no-hover")){
		var html = $(event.target).parent().html();
		var charm = html.substring(html.indexOf("charms/") + 7, html.indexOf(".png"));

		if(hasCharm(charm)){
			$(event.target).parent().removeClass("select");
			removeCharm(charm);

			if($(event.target).parent().parent().hasClass("active-charms")){
				$('.' + charm).removeClass("select");
			}
		}else{
			selectCharm(charm);
		}

		updateDamage();
	}
});

// ON HOVER //

$('.detection').hover(
	function(){
		if(!$(this).hasClass("no-hover")){
			$(this).parent().addClass("hover");
		}
	}, function(){
		if(!$(this).hasClass("no-hover")){
			$(this).parent().removeClass("hover");
		}
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

function selectCharm(charm) {
	//if has < 11 charm notches unused, the equip charm
	var notches = parseInt(localStorage.getItem("charm-notches"));

	if(notches < 11){
		notches += getNotches(charm);

		localStorage.setItem("charm-notches", notches);

		$(event.target).parent().addClass("select");
		localStorage.setItem("charmlist", localStorage.getItem("charmlist") + charm + ",");

		updateNotches();
		updateEquipped();
	}
}

function removeCharm(charm){
	localStorage.setItem("charm-notches", parseInt(localStorage.getItem("charm-notches")) - getNotches(charm));

	localStorage.setItem("charmlist", localStorage.getItem("charmlist").replace(charm + ",", ""));

	updateNotches();
	updateEquipped();
}

function getNotches(charm){
	var notches = 0;
	charms.forEach(function(element) {
		if(element.id == charm){
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
	fillHTML();

	updateDamage();
	highlightNail();
	correctSpells();
	highlightCharms();
	updateNotches();
	updateEquipped();
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

function updateEquipped(){
	var charms = localStorage.getItem("charmlist");
	var index = charms.indexOf(",");
	var counter = 1;
	while(index != -1){
		console.log('inside' + counter);
		equipCharm(charms.substring(0, index), counter, true);

		charms = charms.substring(index + 1, charms.length);
		index = charms.indexOf(",");
		counter++;
	}

	if(counter < 12 && parseInt(localStorage.getItem("charm-notches")) < 11){
		equipCharm("next", counter, false);
		counter++;
	}

	if(counter < 12){
		equipCharm("blank", counter, false);
	}
}

function updateNotches(){
	var i = parseInt(localStorage.getItem("charm-notches"));

	if(i > 11){
		i = 11;
	}

	var j = i + 1;
	while(j < 12){
		$('.charm-notches div:nth-child(' + j + ')').removeClass("used");
		j++;
	}

	while(i > 0){
		$('.charm-notches div:nth-child(' + i + ')').addClass("used");
		i--;
	}
}

function equipCharm(charm, location, canHover){
	var img = $('.active-charms div:nth-child(' + location + ') > img').attr('src');
	console.log(img);
	img = img.substring(0, img.indexOf('charms/') + 7) + charm + img.substring(img.indexOf('.png'), img.length);
	console.log(img);
	$('.active-charms div:nth-child(' + location + ') > img').attr('src', img);

	if(canHover){
		$('.active-charms div:nth-child(' + location + ') > div').removeClass("no-hover");
		$('.active-charms div:nth-child(' + location + ') > div').prop("title", getTitle(charm));
	}else{
		$('.active-charms div:nth-child(' + location + ') > div').addClass("no-hover");
		$('.active-charms div:nth-child(' + location + ')').removeClass("hover");
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

function getTitle(charm){
	charm = charm.replace("-", " ");

	var ret = "";

	while(charm.indexOf(" ") != -1){
		 ret += charm.charAt(0).toUpperCase();
		 ret += charm.substring(1, charm.indexOf(" ") + 1);

		 charm = charm.substring(charm.indexOf(" ") + 1, charm.length);
	}

	return ret + charm.charAt(0).toUpperCase() + charm.substring(1, charm.length);
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

function fillHTML(){
	$('.inventory').html(`
		<div class = "flex-center">
			<div class="cf centered"><!-- Centered element -->

				<section class="nail-selection"><!-- holds nails, floated left? -->
					<div>
						<img src="../assets/images/gear/old-nail.png" alt="">
						<div class="detection nail-img old" title="Old Nail" >
						</div>
					</div>
					<div>
						<img src="../assets/images/gear/sharpened-nail.png" alt="">
						<div class="detection nail-img sharpened" title="Sharpened Nail" >
						</div>
					</div>
					<div>
						<img src="../assets/images/gear/channelled-nail.png" alt="">
						<div class="detection nail-img channelled" title="Channelled Nail">
						</div>
					</div>
					<div>
						<img src="../assets/images/gear/coiled-nail.png" alt="">
						<div class="detection nail-img coiled" title="Coiled Nail">
						</div>
					</div>
					<div>
						<img src="../assets/images/gear/pure-nail.png" alt="">
						<div class="detection nail-img pure" title="Pure Nail">
						</div>
					</div>
				</section>

				<section class="spell-selection"><!-- holds spells, floated left? -->
					<div>
						<img class="vengeful-spirit" src="../assets/images/gear/vengeful-spirit.png" alt="">
						<img class="shade-soul" src="../assets/images/gear/shade-soul.png" alt="">
						<div class="detection spell-img fireball-img" title="Vengeful Spirit">
						</div>
					</div>
					<div>
						<img class="desolate-dive" src="../assets/images/gear/desolate-dive.png" alt="">
						<img class="descending-dark" src="../assets/images/gear/descending-dark.png" alt="">
						<div class="detection spell-img dive-img" title="Desolate Dive">
						</div>
					</div>
					<div>
						<img class="howling-wraiths" src="../assets/images/gear/howling-wraiths.png" alt="">
						<img class="abyss-shriek" src="../assets/images/gear/abyss-shriek.png" alt="">
						<div class="detection spell-img scream-img" title="Howling Wraiths">
						</div>
					</div>
				</section>
				<h2>Equipped</h2><!-- May need to wrap with div to get overcharmed image -->

				<section class="charm-row active-charms"><!-- row? of charms -->
					<div>
						<img src="../assets/images/charms/next.png" alt="">
						<div class="detection no-hover" title="">
						</div>
					</div>
					<div>
						<img src="../assets/images/charms/blank.png" alt="">
						<div class="detection no-hover" title="">
						</div>
					</div>
					<div>
						<img src="../assets/images/charms/blank.png" alt="">
						<div class="detection no-hover" title="">
						</div>
					</div>
					<div>
						<img src="../assets/images/charms/blank.png" alt="">
						<div class="detection no-hover" title="">
						</div>
					</div>
					<div>
						<img src="../assets/images/charms/blank.png" alt="">
						<div class="detection no-hover" title="">
						</div>
					</div>
					<div>
						<img src="../assets/images/charms/blank.png" alt="">
						<div class="detection no-hover" title="">
						</div>
					</div>
					<div>
						<img src="../assets/images/charms/blank.png" alt="">
						<div class="detection no-hover" title="">
						</div>
					</div>
					<div>
						<img src="../assets/images/charms/blank.png" alt="">
						<div class="detection no-hover" title="">
						</div>
					</div>
					<div>
						<img src="../assets/images/charms/blank.png" alt="">
						<div class="detection no-hover" title="">
						</div>
					</div>
					<div>
						<img src="../assets/images/charms/blank.png" alt="">
						<div class="detection no-hover" title="">
						</div>
					</div>
					<div>
						<img src="../assets/images/charms/blank.png" alt="">
						<div class="detection no-hover" title="">
						</div>
					</div>
				</section>

				<h2>Notches</h2>

				<section class="charm-notches"><!-- row? of notches -->
					<div>
						<img src="../assets/images/gear/charm-notch-used.png" alt="">
					</div>
					<div>
						<img src="../assets/images/gear/charm-notch-used.png" alt="">
					</div>
					<div>
					  <img src="../assets/images/gear/charm-notch-used.png" alt="">
					</div>
					<div>
					  <img src="../assets/images/gear/charm-notch-used.png" alt="">
					</div>
					<div>
					  <img src="../assets/images/gear/charm-notch-used.png" alt="">
					</div>
					<div>
					  <img src="../assets/images/gear/charm-notch-used.png" alt="">
					</div>
					<div>
					  <img src="../assets/images/gear/charm-notch-used.png" alt="">
					</div>
					<div>
					  <img src="../assets/images/gear/charm-notch-used.png" alt="">
					</div>
					<div>
					  <img src="../assets/images/gear/charm-notch-used.png" alt="">
					</div>
					<div>
					  <img src="../assets/images/gear/charm-notch-used.png" alt="">
					</div>
					<div>
					  <img src="../assets/images/gear/charm-notch-used.png" alt="">
					</div>
				</section>

				<section class="charm-row cf">
					<div class="wayward-compass">
						<img src="../assets/images/charms/wayward-compass.png" alt="">
						<div class="detection" title="Wayward Compass">
						</div>
					</div>
					<div class="gathering-swarm">
						<img src="../assets/images/charms/gathering-swarm.png" alt="">
						<div class="detection" title="Gathering Swarm">
						</div>
					</div>
					<div class="stalwart-shell">
						<img src="../assets/images/charms/stalwart-shell.png" alt="">
						<div class="detection" title="Stalwart Shell">
						</div>
					</div>
					<div class="soul-catcher">
						<img src="../assets/images/charms/soul-catcher.png" alt="">
						<div class="detection" title="Soul Catcher">
						</div>
					</div>
					<div class="shaman-stone">
						<img src="../assets/images/charms/shaman-stone.png" alt="">
						<div class="detection" title="Shaman Stone">
						</div>
					</div>
					<div class="soul-eater">
						<img src="../assets/images/charms/soul-eater.png" alt="">
						<div class="detection" title="Soul Eater">
						</div>
					</div>
					<div class="dashmaster">
						<img src="../assets/images/charms/dashmaster.png" alt="">
						<div class="detection" title="Dashmaster">
						</div>
					</div>
					<div class="sprintmaster">
						<img src="../assets/images/charms/sprintmaster.png" alt="">
						<div class="detection" title="Sprintmaster">
						</div>
					</div>
					<div class="grubsong">
						<img src="../assets/images/charms/grubsong.png" alt="">
						<div class="detection" title="Grubsong">
						</div>
					</div>
					<div class="grubberflys-elegy">
						<img src="../assets/images/charms/grubberflys-elegy.png" alt="">
						<div class="detection" title="Grubberfly's Elegy">
						</div>
					</div>
					<div class="unbreakable-heart">
						<img src="../assets/images/charms/unbreakable-heart.png" alt="">
						<div class="detection" title="Unbreakable Heart">
						</div>
					</div>
					<div class="unbreakable-greed">
						<img src="../assets/images/charms/unbreakable-greed.png" alt="">
						<div class="detection" title="Unbreakable Greed">
						</div>
					</div>
					<div class="unbreakable-strength">
						<img src="../assets/images/charms/unbreakable-strength.png" alt="">
						<div class="detection" title="Unbreakable Strength">
						</div>
					</div>
					<div class="spell-twister">
						<img src="../assets/images/charms/spell-twister.png" alt="">
						<div class="detection" title="Spell Twister">
						</div>
					</div>
				</section>
				<section class="charm-row cf">
					<div class="steady-body">
						<img src="../assets/images/charms/steady-body.png" alt="">
						<div class="detection" title="Steady Body">
						</div>
					</div>
					<div class="heavy-blow">
						<img src="../assets/images/charms/heavy-blow.png" alt="">
						<div class="detection" title="Heavy Blow">
						</div>
					</div>
					<div class="quick-slash">
						<img src="../assets/images/charms/quick-slash.png" alt="">
						<div class="detection" title="Quick Slash">
						</div>
					</div>
					<div class="longnail">
						<img src="../assets/images/charms/longnail.png" alt="">
						<div class="detection" title="Longnail">
						</div>
					</div>
					<div class="mark-of-pride">
						<img src="../assets/images/charms/mark-of-pride.png" alt="">
						<div class="detection" title="Mark of Pride">
						</div>
					</div>
					<div class="fury-of-the-fallen">
						<img src="../assets/images/charms/fury-of-the-fallen.png" alt="">
						<div class="detection" title="Fury of the Fallen">
						</div>
					</div>
					<div class="thorns-of-agony">
						<img src="../assets/images/charms/thorns-of-agony.png" alt="">
						<div class="detection" title="Thorns of Agony">
						</div>
					</div>
					<div class="baldur-shell">
						<img src="../assets/images/charms/baldur-shell.png" alt="">
						<div class="detection" title="Baldur Shell">
						</div>
					</div>
					<div class="flukenest">
						<img src="../assets/images/charms/flukenest.png" alt="">
						<div class="detection" title="Flukenest">
						</div>
					</div>
					<div class="defenders-crest">
						<img src="../assets/images/charms/defenders-crest.png" alt="">
						<div class="detection" title="Defender's Crest">
						</div>
					</div>
					<div class="glowing-womb">
						<img src="../assets/images/charms/glowing-womb.png" alt="">
						<div class="detection" title="Glowing Womb">
						</div>
					</div>
					<div class="quick-focus">
						<img src="../assets/images/charms/quick-focus.png" alt="">
						<div class="detection" title="Quick Focus">
						</div>
					</div>
					<div class="deep-focus">
						<img src="../assets/images/charms/deep-focus.png" alt="">
						<div class="detection" title="Deep Focus">
						</div>
					</div>
				</section>
				<section class="charm-row cf">
					<div class="lifeblood-heart">
						<img src="../assets/images/charms/lifeblood-heart.png" alt="">
						<div class="detection" title="Lifeblood Heart">
						</div>
					</div>
					<div class="lifeblood-core">
						<img src="../assets/images/charms/lifeblood-core.png" alt="">
						<div class="detection" title="Lifeblood Core">
						</div>
					</div>
					<div class="jonis-blessing">
						<img src="../assets/images/charms/jonis-blessing.png" alt="">
						<div class="detection" title="Joni's Blessing">
						</div>
					</div>
					<div class="hiveblood">
						<img src="../assets/images/charms/hiveblood.png" alt="">
						<div class="detection" title="Hiveblood">
						</div>
					</div>
					<div class="spore-shroom">
						<img src="../assets/images/charms/spore-shroom.png" alt="">
						<div class="detection" title="Spore Shroom">
						</div>
					</div>
					<div class="sharp-shadow">
						<img src="../assets/images/charms/sharp-shadow.png" alt="">
						<div class="detection" title="Sharp Shadow">
						</div>
					</div>
					<div class="shape-of-unn">
						<img src="../assets/images/charms/shape-of-unn.png" alt="">
						<div class="detection" title="Shape of Unn">
						</div>
					</div>
					<div class="nailmasters-glory">
						<img src="../assets/images/charms/nailmasters-glory.png" alt="">
						<div class="detection" title="Nailmaster's Glory">
						</div>
					</div>
					<div class="weaversong">
						<img src="../assets/images/charms/weaversong.png" alt="">
						<div class="detection" title="Weaversong">
						</div>
					</div>
					<div class="dream-wielder">
						<img src="../assets/images/charms/dream-wielder.png" alt="">
						<div class="detection" title="Dream Wielder">
						</div>
					</div>
					<div class="dreamshield">
						<img src="../assets/images/charms/dreamshield.png" alt="">
						<div class="detection" title="Dreamshield">
						</div>
					</div>
					<div class="carefree-melody">
						<img src="../assets/images/charms/carefree-melody.png" alt="">
						<div class="detection" title="Carefree Melody">
						</div>
					</div>
					<div class="grimmchild">
						<img src="../assets/images/charms/grimmchild.png" alt="">
						<div class="detection" title="Grimmchild">
						</div>
					</div>
					<div class="kingsoul">
						<img src="../assets/images/charms/kingsoul.png" alt="">
						<div class="detection" title="Kingsoul">
						</div>
					</div>
				</section>
			</div>
		</div>
	`);
}
