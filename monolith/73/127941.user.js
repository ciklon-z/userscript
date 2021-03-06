// ==UserScript==
// @name           best
// @namespace      best
// @include        http://*pokemonvortex.org/*
// @exclude        http://*pokemonvortex.org/adv.php*
// ==/UserScript==

var legends = [
	// Custom
	'Mystic Sableye',
	'Mystic Spiritomb',


	// Grass
	'Shaymin (Sky)',
	'Celebi',
	'Latios',
	'Latias',
	'Rayquaza',
	'Shaymin',
	'Mew',
	'Cresselia',
	'Azelf',
	'Uxie',
	'Mesprit',
	'Virizion',
	'Genesect',
	'Mystic Shaymin (Sky)',
	'Mystic Celebi',
	'Mystic Latios',
	'Mystic Latias',
	'Mystic Rayquaza',
	'Mystic Shaymin',
	'Mystic Mew',
	'Mystic Cresselia',
	'Mystic Azelf',
	'Mystic Uxie',
	'Mystic Mesprit',
	'Mystic Virizion',
	'Mystic Genesect',
	'Shiny Shaymin (Sky)',
	'Shiny Celebi',
	'Shiny Latios',
	'Shiny Latias',
	'Shiny Rayquaza',
	'Shiny Shaymin',
	'Shiny Mew',
	'Shiny Cresselia',
	'Shiny Azelf',
	'Shiny Uxie',
	'Shiny Mesprit',
	'Shiny Virizion',
	'Shiny Genesect',
	'Dark Shaymin (Sky)',
	'Dark Celebi',
	'Dark Latios',
	'Dark Latias',
	'Dark Rayquaza',
	'Dark Shaymin',
	'Dark Mew',
	'Dark Cresselia',
	'Dark Azelf',
	'Dark Uxie',
	'Dark Mesprit',
	'Dark Virizion',
	'Dark Genesect',
	'Ancient Shaymin (Sky)',
	'Ancient Celebi',
	'Ancient Latios',
	'Ancient Latias',
	'Ancient Rayquaza',
	'Ancient Shaymin',
	'Ancient Mew',
	'Ancient Cresselia',
	'Ancient Azelf',
	'Ancient Uxie',
	'Ancient Mesprit',
	'Ancient Virizion',
	'Ancient Genesect',



	// Grass (water)
	'Manaphy',
	'Phione',
	'Suicune',
	'Keldeo',
	
	// Ice
	'Articuno',
	'Suicune',
	'Lugia',
	'Regice',
	'Kyurem',
	'Mystic Articuno',
	'Mystic Suicune',
	'Mystic Lugia',
	'Mystic Regice',
	'Mystic Kyurem',
	'Shiny Articuno',
	'Shiny Suicune',
	'Shiny Lugia',
	'Shiny Regice',
	'Shiny Kyurem',
	'Dark Articuno',
	'Dark Suicune',
	'Dark Lugia',
	'Dark Regice',
	'Dark Kyurem',
	'Ancient Articuno',
	'Ancient Suicune',
	'Ancient Lugia',
	'Ancient Regice',
	'Ancient Kyurem',
	

	
	

	
	// Cave (land)
	'Groudon',
	'Arceus',
	'Regigigas',
	'Palkia',
	'Dialga',
	'Deoxys',
	'Jirachi',
	'Registeel',
	'Regirock',
	'Mewtwo',
	'Cobalion',
	'Terrakion',
	'Virizion',
	'Reshiram',
	'Zekrom',
	'Kyurem',
	'Genesect',
	'Tornadus',
	'Landorus',
	'Mystic Groudon',
	'Mystic Arceus',
	'Mystic Regigigas',
	'Mystic Palkia',
	'Mystic Dialga',
	'Mystic Deoxys',
	'Mystic Jirachi',
	'Mystic Registeel',
	'Mystic Regirock',
	'Mystic Mewtwo',
	'Mystic Cobalion',
	'Mystic Terrakion',
	'Mystic Virizion',
	'Mystic Reshiram',
	'Mystic Zekrom',
	'Mystic Kyurem',
	'Mystic Genesect',
	'Mystic Tornadus',
	'Mystic Landorus',
	'Shiny Groudon',
	'Shiny Arceus',
	'Shiny Regigigas',
	'Shiny Palkia',
	'Shiny Dialga',
	'Shiny Deoxys',
	'Shiny Jirachi',
	'Shiny Registeel',
	'Shiny Regirock',
	'Shiny Mewtwo',
	'Shiny Cobalion',
	'Shiny Terrakion',
	'Shiny Virizion',
	'Shiny Reshiram',
	'Shiny Zekrom',
	'Shiny Kyurem',
	'Shiny Genesect',
	'Shiny Tornadus',
	'Shiny Landorus',
	'Dark Groudon',
	'Dark Arceus',
	'Dark Regigigas',
	'Dark Palkia',
	'Dark Dialga',
	'Dark Deoxys',
	'Dark Jirachi',
	'Dark Registeel',
	'Dark Regirock',
	'Dark Mewtwo',
	'Dark Cobalion',
	'Dark Terrakion',
	'Dark Virizion',
	'Dark Reshiram',
	'Dark Zekrom',
	'Dark Kyurem',
	'Dark Genesect',
	'Dark Tornadus',
	'Dark Landorus',


	// Cave (water)
	'Kyogre',
	'Lugia',
	'Keldeo',
	
	// Ghost
	'Mew',
	'Giratina',
	'Rotom',
	'Mesprit',
	'Azelf',
	'Uxie',
	'Celebi',
	'Darkrown',
	'Darkrai',
	'Shiny Mew',
	'Shiny Giratina',
	'Shiny Rotom',
	'Shiny Mesprit',
	'Shiny Azelf',
	'Shiny Uxie',
	'Shiny Celebi',
	'Shiny Darkrown',
	'Shiny Darkrai',
	'Dark Mew',
	'Dark Giratina',
	'Dark Rotom',
	'Dark Mesprit',
	'Dark Azelf',
	'Dark Uxie',
	'Dark Celebi',
	'Dark Darkrown',
	'Dark Darkrai',
	'Mystic Mew',
	'Mystic Giratina',
	'Mystic Rotom',
	'Mystic Mesprit',
	'Mystic Azelf',
	'Mystic Uxie',
	'Mystic Celebi',
	'Mystic Darkrown',
	'Mystic Darkrai',
	'Ancient Mew',
	'Ancient Giratina',
	'Ancient Rotom',
	'Ancient Mesprit',
	'Ancient Azelf',
	'Ancient Uxie',
	'Ancient Celebi',
	'Ancient Darkrown',
	'Ancient Darkrai',
	
	// Electric
	'Zapdos',
	'Raikou',
	'Jirachi',
	'Darkrai',
	'Darkrown',
	'Thundurus',
	'Zekrom',
	'Genesect',
	
	// Fire
	'Heatran',
	'Ho-oh',
	'Moltres',
	'Entei',
	'Reshiram',
	'Victini'
];
var settings = {
	'keys': ['autoBattle', 'findRare', 'findLegendary','catchPok','findNewpoke'],
	'data': {},
	'save': function() {
		for (var i = 0; i < this.keys.length; i++) {
			GM_setValue(this.keys[i], this.data[this.keys[i]]);
		}
	},
	'load': function() {
		for (var i = 0; i < this.keys.length; i++) {
			this.data[this.keys[i]] = GM_getValue(this.keys[i], false);
		}
	}
};
var movPos = 0;

function moveAround() {
	movPos += 10;
	if (movPos > 360) {
		movPos = 0;
	}
	
	var xpos = parseInt(Math.sin(movPos * (Math.PI / 180))*10);
	var ypos = parseInt(Math.cos(movPos * (Math.PI / 180))*10);
	unsafeWindow.PlayRequest(xpos + 14, ypos + 14, parseInt(Math.random()*8)+1);
/*	var btnArrow = unsafeWindow.document.querySelector('#arrows img[onclick]')
	if (btnArrow) {
		btnArrow.click();
	} else {
		unsafeWindow.console.info('No buttons?');
	}*/
}

function catchPok() {
	try {
		var btnPo = unsafeWindow.document.querySelector('#battleForm input[type="submit"][value="Continue"]');
		if (btnPo) {
			btnPo.click();
		}

		var radMaster = unsafeWindow.document.querySelector('#itemForm input[type="radio"][value="Master Ball"]');
		if (radMaster) {
			radMaster.click();
		}
		
		var btnItem = unsafeWindow.document.querySelector('#itemForm input[type="submit"][value="Use Item"]');
		if (btnItem) {
			btnItem.click();
		}
		
		var btnCont2 = unsafeWindow.document.querySelector('#battleForm input[type="submit"][value="Continue!"]');
		if (btnCont2) {
			btnCont2.click();
		}

		var linkReturnToMap = unsafeWindow.document.querySelector('.optionsList a');
		if (linkReturnToMap && linkReturnToMap.textContent.trim() == 'Return to the Map') {
			settings.data.nextBattle = new Date().getTime() + 10000;
			unsafeWindow.location.href = linkReturnToMap.href;
		}
	}catch (e) {
		unsafeWindow.console.warn('Exception: ', e);
	}
}

function findNewpoke() {
	var aPoke = unsafeWindow.document.querySelector('#appear p');
	var oldPoke = unsafeWindow.document.querySelector('#appear strong');
	var searchPoke = unsafeWindow.document.querySelector('#alert p')
	if (!aPoke) {
		moveAround();
		return;
	}
	else if (oldPoke) {
		moveAround();
		return;
	}
	else if (searchPoke) {
		moveAround();
		return;
	}
	else {
		var btnDo = unsafeWindow.document.querySelector('input[type="submit"][value="Battle!"]');
		if (btnDo) {
			btnDo.click();
			}
		catchPok();
		return;
	}
}

function findLegendary() {
	var wildText = unsafeWindow.document.querySelector('#appear p');
	if (!wildText) {
		moveAround();
		return;
	}
	
	wildText = wildText.textContent.trim();
	for (var i = 0; i < legends.length; i++) {
		if (wildText.match(legends[i])) {
			var btnDo = unsafeWindow.document.querySelector('input[type="submit"][value="Battle!"]');
			if (btnDo) {
				btnDo.click();
				}
			catchPok();
			return;
		}
	}

	moveAround();	
}

function findRare() {
	var wildText = unsafeWindow.document.querySelector('#appear p');
	if (!wildText) {
		moveAround();
		return;
	}
	
	wildText = wildText.textContent.trim();
	if (!wildText.match(/Wild (Dark|Shiny|Ancient|Mystic)/)) {
		moveAround();
		return;
	}
	
	unsafeWindow.console.info('Rare found ', wildText);
}

function autoBattle() {
	try {
		var btnContinue = unsafeWindow.document.querySelector('#battleForm input[type="submit"][value="Continue"]');
		if (btnContinue) {
			btnContinue.click();
		}
		
		var btnContinue2 = unsafeWindow.document.querySelector('#battleForm input[type="submit"][value="Continue!"]');
		if (btnContinue2) {
			btnContinue2.click();
		}
	
		var btnAttack = unsafeWindow.document.querySelector('#battleForm input[type="submit"][value="Attack!"]');
		if (btnAttack) {
			btnAttack.click();
		}
		
		var linkReturnToMap = unsafeWindow.document.querySelector('.optionsList a');
		if (linkReturnToMap && linkReturnToMap.textContent.trim() == 'Return to the Map') {
			settings.data.nextBattle = new Date().getTime() + 15000000000;
			unsafeWindow.location.href = linkReturnToMap.href;
		}
		
		// check for battle button
		var btnBattle = unsafeWindow.document.querySelector('#appear form input[type="submit"][value="Battle!"]');
		var linkRebattle = unsafeWindow.document.querySelector('.optionsList a');
		if (btnBattle) {
			// wait until 10000000000 seconds since last battle
			//var delay = GM_getValue('lastBattle');
			window.setTimeout(function() {
				btnBattle.click();
			}, 1000000000000);
		} else if (linkRebattle && linkRebattle.textContent.trim() == 'Rebattle Opponent') {
			window.setTimeout(function() {
				unsafeWindow.location.href = linkRebattle.href;
			}, 1000000000000);
		} else {
			// if not found, click a direction
			var btnArrow = unsafeWindow.document.querySelector('#arrows img[onclick]')
			console.info('arrow', btnArrow);
			if (btnArrow) {
				btnArrow.click();
			}
		}
	} catch (e) {
		unsafeWindow.console.warn('Exception: ', e);
	}
}

function autoContinue() {
	if (settings.data.findRare) {
		findRare();
	}

	if (settings.data.autoBattle) {
		autoBattle();
	}
	
	if (settings.data.findLegendary) {
		findLegendary();
	}
	if (settings.data.catchPok) {
		catchPok();
	}
	if (settings.data.findNewpoke) {
		findNewpoke();
	}
}

unsafeWindow.AjaxRequest = function () {
	if (!this.xmlhttp) {
		try {
			// Try to create object for Firefox, Safari, IE7, etc.
			this.xmlhttp = new XMLHttpRequest();
		} catch (e) {
			try {
				// Try to create object for later versions of IE.
				this.xmlhttp = new ActiveXObject('MSXML2.XMLHTTP');
			} catch (e) {
				try {
					// Try to create object for early versions of IE.
					this.xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
				} catch (e) {
					// Could not create an XMLHttpRequest object.
					return false;
				}
			}
		}
	}
	this.method = 'post';
	this.async = true;
	this.url;
	this.query = '';
	this.data = '';
	this.reponseText;
	this.reponseXML;
	this.responseHandler;
	this.abortHandler;
	this.showLoading = false;
	this.send = function () {
		if (this.method && this.url) {
			var self = this;
			this.xmlhttp.onreadystatechange = function () {
				if (self.xmlhttp.readyState == 4) {
					if (self.xmlhttp.status && (self.xmlhttp.status == 200 || self.xmlhttp.status == 304)) {
						//unsafeWindow.console.info('success', self);
						
						self.responseText = self.xmlhttp.responseText;
						if (self.xmlhttp.responseXML) {
							self.responseXML = self.xmlhttp.responseXML;
						} else {
							self.responseXML = null;
						}
						if (self.responseHandler) {
							self.responseHandler();
							
							var evt = document.createEvent('Event');
							evt.initEvent('gm:ajaxhook', false, true);
							document.dispatchEvent(evt);
							
							//autoContinue();
						}
					} else {
						showAlert('<p>An error occured while requesting the data.</p><p>Status Msg: ' + self.xmlhttp.statusText + '</p><p><input type="button" name="ok" value="OK" onclick="removeAlert();" id="alertFocus"></p>');
					}
					if (self.showLoading && self.loading) {
						self.loading.style.visibility = 'hidden';
					}
				}
			}
			if (this.showLoading) {
				this.displayLoading();
			}
			this.xmlhttp.open(this.method, this.url + '?' + encodeURI(this.query), this.async);
			if (this.method == 'post') {
				this.xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			}
			this.xmlhttp.send(encodeURI(this.data));
		} else {
			showAlert("<p>An error occured while requesting the data.</p><p>No method, URL, and/or query string provided.</p><p><input type=\"button\" name=\"ok\" value=\"OK\" onclick=\"removeAlert();\" id=\"alertFocus\"></p>");
		}
	}
	this.abort = function () {
		this.xmlhttp.onreadystatechange = function () {};
		this.xmlhttp.abort();
		if (this.abortHandler) {
			this.abortHandler();
		}
	}
	this.getFormValues = function (form) {
		for (i = 0; i < form.elements.length; i++) {
			switch (form.elements[i].type) {
			case 'text':
			case 'hidden':
			case 'password':
			case 'textarea':
				this.data += form.elements[i].name + "=" + form.elements[i].value + "&";
				break;
			case 'checkbox':
			case 'radio':
				if (form.elements[i].checked) this.data += form.elements[i].name + "=" + form.elements[i].value + "&";
				break;
			case 'select-one':
				this.data += form.elements[i].name + "=" + form.elements[i].options[form.elements[i].selectedIndex].value + "&";
				break;
			}
		}
		this.data = this.data.substr(0, (this.data.length - 1));
	}
	this.appendHTML = function (object, flag) {
		if (this.xmlhttp.responseText) {
			if (flag) {
				object.innerHTML = this.responseText;
			} else {
				object.innerHTML += this.responseText;
			}
		} else {}
	}
	this.displayLoading = function () {
		if (this.showLoading == 'sidebar') {
			this.loading = document.getElementById('sidebarLoading');
			this.loading.style.height = document.getElementById('sidebar').offsetHeight - 2 + 'px';
			this.loading.style.width = document.getElementById('sidebarContent').offsetWidth + 'px';
			this.loading.innerHTML = '<p style="text-align: center; margin-top: 150px;"><img src="http://static.pokemonvortex.org/images/loading.gif" width="100" height="100" alt="Loading..." /></p>';
		} else if (this.showLoading == 'message') // message
		{
			this.loading = document.getElementById('messageContent');
			this.loading.style.height = document.getElementById('message').offsetHeight + 'px';
			this.loading.style.width = document.getElementById('message').offsetWidth + 'px';
			this.loading.innerHTML = '<p style="text-align: center; margin-top: 75px;"><img src="http://static.pokemonvortex.org/images/loading.gif" width="100" height="100" alt="Loading..." /></p>';
		} else if (this.showLoading == 'messageList') // message list
		{
			this.loading = document.getElementById('messageList');
			this.loading.style.height = document.getElementById('messageList').offsetHeight + 'px';
			this.loading.style.width = document.getElementById('messageList').offsetWidth + 'px';
			this.loading.innerHTML = '<p style="text-align: center; margin-top: 50px;"><img src="http://static.pokemonvortex.org/images/loading.gif" width="100" height="100" alt="Loading..." /></p>';
		} else if (this.showLoading == 'map') // map
		{
			this.loading = document.getElementById('mapLoading')
			this.loading.innerHTML = '<p style="text-align: center; margin-top: 150px;"><img src="http://static.pokemonvortex.org/images/loading_white.gif" width="100" height="100" alt="Loading..." /></p>';
		} else if (this.showLoading == 'live') {
			this.loading = document.getElementById('loading');
			this.loading.style.height = document.getElementById('scroll').offsetHeight + 'px';
			if (document.getElementById('scrollContent')) {
				this.loading.style.width = document.getElementById('scrollContent').offsetWidth + 'px';
			} else {
				this.loading.style.width = document.getElementById('scroll').offsetWidth + 'px';
			}
			this.loading.innerHTML = '<p class="large" style="margin-top: 75px; text-align: center;"><strong>Waiting for the other user to respond...</strong></p><p style="text-align: center;">You have been waiting <span id="waitTime">0 seconds</span>.</p>';
			waitTime(0);
		} else // main
		{
			this.loading = document.getElementById('loading');
			this.loading.style.height = document.getElementById('scroll').offsetHeight + 'px';
			if (document.getElementById('scrollContent')) {
				this.loading.style.width = document.getElementById('scrollContent').offsetWidth + 'px';
			} else {
				this.loading.style.width = document.getElementById('scroll').offsetWidth + 'px';
			}
			this.loading.innerHTML = '<p style="text-align: center; margin-top: 150px;"><img src="http://static.pokemonvortex.org/images/loading.gif" width="100" height="100" alt="Loading..." /></p>';
		}
		this.loading.style.visibility = 'visible';
	}
}

function createToggler(container, title, varname) {
	var toggleEnable = unsafeWindow.document.createElement('p');
	container.appendChild(toggleEnable);
	toggleEnable.innerHTML = title + ' <b>' + (settings.data[varname] ? 'Enabled' : 'Disabled') + '</b>';
	toggleEnable.addEventListener('click', function() {
		settings.data[varname] = !settings.data[varname];
		toggleEnable.innerHTML = title + ' <b>' + (settings.data[varname] ? 'Enabled' : 'Disabled') + '</b>';
		settings.save();
		autoContinue();
	}, false);
}

function init() {
	var iframes = unsafeWindow.document.getElementsByTagName('iframe');
	for (var i = 0; i < iframes.length; i++) {
		iframes[i].parentNode.removeChild(iframes[i]);
	}
	var sty = unsafeWindow.document.createElement('style');
	unsafeWindow.document.querySelector('head').appendChild(sty);
	sty.textContent = '#fscctrl { background: green; border: 1px solid yellow; cursor:pointer; margin: auto; padding: 10px; width: 1010px; } #fscctrl p { margin: 0; } #alert{position:absolute; z-index: 1; background:#ffc; padding: 0 10px; right: 0; width: 100px;} #alert p { margin: 0; } #loading {z-index: 0; top: 0; height: 200px;} #loading p {margin-top:0 !important;} #header{ height: 70px; }';
	unsafeWindow.disableSubmitButton = function(form) {
		for (i = 0; i < form.elements.length; i++) {
			if (form.elements[i].type == 'submit') {
				form.elements[i].value = 'Please Wait... or click again - by Percius';
			}
		}
		return true;
	} 
	
	settings.load();
	
	document.addEventListener('gm:ajaxhook', function() {
		autoContinue();
	}, false);
	
	var container = unsafeWindow.document.createElement('div');
	unsafeWindow.document.body.insertBefore(container, unsafeWindow.document.body.firstChild);
	container.setAttribute('id', 'fscctrl');

	createToggler(container, 'Auto-battle', 'autoBattle');
	createToggler(container, 'Find Rare', 'findRare');
	createToggler(container, 'Find Legendary', 'findLegendary');
	createToggler(container, 'Catch Pokemon', 'catchPok');
	createToggler(container, 'Find New Pokemon', 'findNewpoke');

	autoContinue();
}

init();
