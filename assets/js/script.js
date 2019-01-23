
//setup
if(localStorage.getItem("nail") == null){
	reset();
}

function reset(){
	localStorage.setItem("nail", "pure-nail");
	localStorage.setItem("charm-notches", "3");
	localStorage.setItem("fireball", "vengeful-spirit");
	localStorage.setItem("dive", "desolate-dive");
	localStorage.setItem("scream", "howling-wraiths");
	localStorage.setItem("charmlist", "strength,");
}

//Uncomment below to set values to default on loading the page.
//reset();

var health = getHealth();
var nail;
var nailDamage;

var red = "#DB4244";
var white = "#fff";

updateDamage();

//Show/hide charms
$('.charms').on('click', function(event){
	$('.inventory').fadeIn('slow', function(event){});
});

$('.inventory').on('click', function(event){
	//Checks if the element clicked was a section.
	//This means that I cannot use any more sections for the charms display!
	var classes = event.target.classList;
	if(classes.contains("inventory")){
		$('.inventory').fadeOut('slow', function(event){});
	}else if(classes.contains("nail-img")){
		var str = classes.item(classes.length - 1);
		localStorage.setItem("nail", str + "-nail");
		updateDamage();
	}
});

function setChevron(gray){
	
}

function getHealth(){
	var str = $('.health').text();
	str = str.substring(8, str.length);

	return parseInt(str);
}

function updateDamage() {
	updateNail();
	updateFireball();
	//updateDive();
	//updateScream();
	//NEED TO CONSIDER SHAMAN STONE!!!!!
}

function updateFireball() {
	var damage = 0;

	//get damage of current fireball selection
	if(hasCharm("shaman")){
		if(hasCharm("flukenest")){
			if(hasCharm("crest")){
				damage = 58;
			}else{
				if(localStorage.getItem("fireball") == "shade-soul"){
					//Shaman, flukenest, shade
					damage = 80;
				}else{
					//Shaman, flukenest, vengeful
					damage = 45;
				}
			}
		}else{
			if(localStorage.getItem("fireball") == "shade-soul"){
				//Shaman, shade
				damage = 40;
			}else{
				//Shaman, vengeful
				damage = 20;
			}
		}
	}else{
		if(hasCharm("flukenest")){
			if(hasCharm("crest")){
				damage = 44;
			}else{
				if(localStorage.getItem("fireball") == "shade-soul"){
					//Flukenest, shade
					damage = 64;
				}else{
					//Flukenest, vengeful
					damage = 36;
				}
			}
		}else{
			if(localStorage.getItem("fireball") == "shade-soul"){
				//No charms, shade
				damage = 30;
			}else{
				//No charms, vengeful
				damage = 15;
			}
		}
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
