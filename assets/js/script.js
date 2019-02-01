
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
	{id:"wayward-compass", name:"Wayward Compass", notches:1, info:"Whispers its location to the bearer whenever a map is open, allowing wanderers to pinpoint their current location."},
	{id:"gathering-swarm", name:"Gathering Swarm", notches:1, info:"A swarm will follow the bearer and gather up any loose Geo.<br /><br />Useful for those who can't bear to leave anything behind, no matter how insignificant."},
	{id:"stalwart-shell", name:"Stalwart Shell", notches:2, info:"Builds resilience. When recovering from damage, the bearer will remain invulnerable for longer.<br /><br />Makes it easier to escape from dangerous situations."},
	{id:"soul-catcher", name:"Soul Catcher", notches:2, info:"Used by shamans to draw more SOUL from the world around them.<br /><br />Increases the amount of SOUL gained when striking an enemy with the nail."},
	{id:"shaman-stone", name:"Shaman Stone", notches:3, info:"Said to contain the knowledge of past generations of shaman.<br /><br />Increases the power of spells, dealing more damage to foes."},
	{id:"soul-eater", name:"Soul Eater", notches:4, info:"Forgotten shaman artifact, used to draw SOUL from still-living creatures.<br /><br />Greatly increases the amount of SOUL gained when striking an enemy with the nail."},
	{id:"dashmaster", name:"Dashmaster", notches:2, info:"Bears the likeness of an eccentric bug known only as 'The Dashmaster'.<br /><br />The bearer will be able to dash more often as well as dash downwards. Perfect for those who want to move around as quickly as possible."},
	{id:"thorns-of-agony", name:"Thorns of Agony", notches:1, info:"Senses the pain of its bearer and lashes out at the world around them.<br /><br />When taking damage, sprout thorny vines that damage nearby foes."},
	{id:"fury-of-the-fallen", name:"Fury of the Fallen", notches:2, info:"Embodies the fury and heroism that comes upon those who are about to die.<br /><br />When close to death, the bearer's strength will increase."},
	{id:"unbreakable-heart", name:"Unbreakable Heart", notches:2, info:"Increases the health of the bearer, allowing them to take more damage.<br /><br />This charm is unbreakable."},
	{id:"unbreakable-greed", name:"Unbreakable Greed", notches:2, info:"Causes the bearer to find more Geo when defeating enemies.<br /><br />This charm is unbreakable."},
	{id:"unbreakable-strength", name:"Unbreakable Strength", notches:3, info:"Strengthens the bearer, increasing the damage they deal to enemies with their nail.<br /><br />This charm is unbreakable."},
	{id:"spell-twister", name:"Spell Twister", notches:2, info:"Reflecting the desires of the Soul Sanctum for mastery over SOUL, it improves the bearer's ability to cast spells.<br /><br />Reduces the SOUL cost of casting spells."},
	{id:"steady-body", name:"Steady Body", notches:1, info:"Keeps its bearer from recoiling backwards when they strike an enemy with a nail.<br /><br />Allows one to stay steady and keep attacking."},
	{id:"heavy-blow", name:"Heavy Blow", notches:2, info:"Formed from the nails of fallen warriors.<br /><br />Increases the force of the bearer's nail, causing enemies to recoil further when hit."},
	{id:"quick-slash", name:"Quick Slash", notches:3, info:"Born from imperfect, discarded nails that have fused together. The nails still long to be wielded.<br /><br />Allows the bearer to slash much more rapidly with their nail."},
	{id:"longnail", name:"Longnail", notches:2, info:"Increases the range of the bearer's nail, allowing them to strike foes from further away."},
	{id:"mark-of-pride", name:"Mark of Pride", notches:3, info:"Freely given by the Mantis Tribe to those they respect.<br /><br />Greatly increases the range of the bearer's nail, allowing them to strike foes from further away."},
	{id:"baldur-shell", name:"Baldur Shell", notches:2, info:"Protects its bearer with a hard shell while focusing SOUL.<br /><br />The shell is not indestructible and will shatter if it absorbs too much damage."},
	{id:"flukenest", name:"Flukenest", notches:3, info:"Living charm born in the gut of a Flukemarm.<br /><br />Transforms the Vengeful Spirit and Shade Soul spells into a horde of volatile baby flukes."},
	{id:"defenders-crest", name:"Defender's Crest", notches:1, info:"Unique charm bestowed by the King of Hallownest to his most loyal knight. Scratched and dirty, but still cared for.<br /><br />Causes the bearer to emit a heroic odour."},
	{id:"glowing-womb", name:"Glowing Womb", notches:2, info:"Drains the SOUL of its bearer and uses it to birth hatchlings.<br /><br />The hatchlings have no desire to eat or live, and will sacrifice themselves to protect their parent."},
	{id:"quick-focus", name:"Quick Focus", notches:3, info:"A charm containing a crystal lens.<br /><br />Increases the speed of focusing SOUL, allowing the bearer to heal damage faster."},
	{id:"deep-focus", name:"Deep Focus", notches:4, info:"Naturally formed within a crystal over a long period. Draws in SOUL from the surrounding air.<br /><br />The bearer will focus SOUL at a slower rate, but the healing effect will double."},
	{id:"lifeblood-heart", name:"Lifeblood Heart", notches:2, info:"Contains a living core that seeps precious lifeblood.<br /><br />When resting, the bearer will gain a coating of lifeblood that protects from a modest amount of damage."},
	{id:"lifeblood-core", name:"Lifeblood Core", notches:3, info:"Contains a living core that bleeds precious lifeblood.<br /><br />When resting, the bearer will gain a coating of lifeblood that protects from a large amount of damage."},
	{id:"jonis-blessing", name:"Joni's Blessing", notches:4, info:"Blessed by Joni, the kindly heretic. Transfigures vital fluids into blue lifeblood.<br /><br />The bearer will have a healthier shell and can take more damage, but they will not be able to heal themselves by focusing SOUL."},
	{id:"grubsong", name:"Grubsong", notches:1, info:"Contains the gratitude of freed grubs.<br /><br />Gain SOUL when taking damage."},
	{id:"grubberflys-elegy", name:"Grubberfly's Elegy", notches:3, info:"Contains the gratitude of grubs who will move to the next stage of their lives. Imbues weapons with a holy strength.<br /><br />When the bearer is at full health, they will fire beams of white-hot energy from their nail."},
	{id:"hiveblood", name:"Hiveblood", notches:4, info:"Golden nugget of the Hive's precious hardened nectar.<br /><br />Heals the bearer's wounds over time, allowing them to regain health without focusing SOUL."},
	{id:"spore-shroom", name:"Spore Shroom", notches:1, info:"Composed of living fungal matter. Scatters spores when exposed to SOUL.<br /><br />When focusing SOUL, emit a spore cloud that slowly damages enemies."},
	{id:"sharp-shadow", name:"Sharp Shadow", notches:2, info:"Contains a forbidden spell that transforms shadows into deadly weapons.<br /><br />When using Shadow Dash, the bearer's body will sharpen and damage enemies."},
	{id:"shape-of-unn", name:"Shape of Unn", notches:2, info:"Reveals the form of Unn within the bearer.<br /><br />While focusing SOUL, the bearer will take on a new shape and can move freely to avoid enemies."},
	{id:"nailmasters-glory", name:"Nailmaster's Glory", notches:1, info:"Contains the passion, skill and regrets of a Nailmaster.<br /><br />Increases the bearer's mastery of Nail Arts, allowing them to focus their power faster and unleash arts sooner."},
	{id:"dream-wielder", name:"Dream Wielder", notches:1, info:"Transient charm created for those who wield the Dream Nail and collect Essence.<br /><br />Allows the bearer to charge the Dream Nail faster and collect more SOUL when striking foes."},
	{id:"kingsoul", name:"Kingsoul", notches:5, info:"Holy charm symbolising a union between higher beings. The bearer will slowly absorb the limitless SOUL contained within.<br /><br />Opens the way to a birthplace."},
	{id:"dreamshield", name:"Dreamshield", notches:3, info:"Defensive charm once wielded by a tribe that could shape dreams.<br /><br />Conjures a shield that follows the bearer and attempts to protect them.	"},
	{id:"weaversong", name:"Weaversong", notches:2, info:"Silken charm containing a song of farewell, left by the Weavers who departed Hallownest for their old home.<br /><br />Summons weaverlings to give the lonely bearer some companionship and protection."},
	{id:"sprintmaster", name:"Sprintmaster", notches:1, info:"Bears the likeness of a strange bug known only as 'The Sprintmaster'.<br /><br />Increases the running speed of the bearer, allowing them to avoid danger or overtake rivals."},
	{id:"carefree-melody", name:"Carefree Melody", notches:3, info:"Token commemorating the start of a friendship.<br /><br />Contains a song of protection that may defend the bearer from damage.	"},
	{id:"grimmchild", name:"Grimmchild", notches:2, info:"Symbol of a completed ritual.<br /><br />Contains a living, scarlet flame."}
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
			updateCharmInfo($(this).prop("title"));
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

			if($(this).parent().parent().hasClass("charm-row")){
				updateCharmInfo($(this).prop("title"));
			}
		}
	}, function(){
		if(!$(this).hasClass("no-hover")){
			$(this).parent().removeClass("hover");

			if($(this).parent().parent().hasClass("charm-row")){
				updateCharmInfo("");
			}
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

//Swaps the selected spell between upgraded and un-upgraded variant
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

//Takes in a charm, and adds it to the equipped charms if space is available.
function selectCharm(charm) {
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
	var notch = 0;
	charms.forEach(function(element) {
		if(element.id == charm){
			notch = element.notches;
		}
	});
	return notch;
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

	setOvercharmed(i > 11);

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

function updateCharmInfo(charmTitle){
	if(charmTitle == ""){
		$('.charm-info').addClass("hide-charm-info");
	}else{
		var charm = getId(charmTitle);
		var notches = getNotches(charm);
		var info = getInfo(charm);

		$('.charm-info > h3').html(charmTitle);

		$('.charm-info > img').attr('src', "../assets/images/charms/" + charm + ".png");

		var cost = "<h4>Cost</h4>";

		while(notches > 0){
			cost += '<img src="../assets/images/gear/charm-notch-used.png" alt="">';
			notches--;
		}

		$('.cost').html(cost);
		$('.charm-info > p').html(info);

		$('.charm-info').removeClass("hide-charm-info");
	}
}

function setOvercharmed(isOvercharmed){
	if(isOvercharmed){
		$('.equipped-title').addClass('show-overcharmed');
	}else{
		$('.equipped-title').removeClass('show-overcharmed');
	}
}

function equipCharm(charm, location, canHover){
	var row;

	if(location < 7){
		row = '.active-charms:eq(0) > div:nth-child(' + location + ')';
	}else{
		row = '.active-charms:eq(1) > div:nth-child(' + (location - 6) + ')';
	}

	var img = $(row + ' > img').attr('src');
	img = img.substring(0, img.indexOf('charms/') + 7) + charm + img.substring(img.indexOf('.png'), img.length);

	$(row + ' > img').attr('src', img);

	if(canHover){
		$(row + ' > div').removeClass("no-hover");
		$(row + ' > div').prop("title", getTitle(charm));
	}else{
		$(row + ' > div').addClass("no-hover").removeAttr("title");
		$(row).removeClass("hover");
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
	var title = "";
	charms.forEach(function(element) {
		if(element.id == charm){
			title = element.name;
		}
	});
	return title;
}

function getId(title){
	var charm = "";
	charms.forEach(function(element) {
		if(element.name == title){
			charm = element.id;
		}
	});
	return charm;
}

function getInfo(charm){
	var info = "";
	charms.forEach(function(element) {
		if(element.id == charm){
			info = element.info;
		}
	});
	return info;
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

				<div class="charm-info hide-charm-info">
					<h3></h3>
					<div class="cost">
						<h4>Cost</h4>
					</div>
					<img class="charm" src="" alt=""></img>
					<p></p>
				</div>

				<div class="misc-inventory">
					<section class="nail-selection">
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

					<div class="equipped-title">
						<h2 class="equip">Equipped</h2>
						<h2 class="over">Overcharmed</h2>
						<img src="../assets/images/gear/overcharmed.png" alt="">
					</div>

					<section class="charm-row active-charms">
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
					</section>
					<section class="charm-row active-charms">
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
				</div>

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
				<section class="charm-row cf charm-offset">
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
