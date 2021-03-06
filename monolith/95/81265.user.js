// ==UserScript==
// @name        MouseHunt AutoBot
// @author      Ooi Keng Siang
// @version    	1.13
// @namespace   http://www.ooiks.com/mini-projects/mousehunt-autobot
// @description An advance user script to automate sounding the hunter horn in MouseHunt application in Facebook with MouseHunt version 3.0 (Longtail) supported and many other features.
// @include     http://apps.facebook.com/mousehunt/*
// @include     http://www.facebook.com/common/error.html
// @include		http://apps.facebook.com/sorry.php?msg=account
// ==/UserScript==

// ===========================UserPreferenceSetting===========================
// The variable in this section contain option that enable user to modify to suit personal preference.
// Reload MouseHunt page manually if edit this script while running it for immediate effect.

// Display timer and message in page title. (true/false)
var showTimerInTitle = true;

// Embed a timer in page to show next hunter horn timer, highly recommanded to turn on. (true/false)
var showTimerInPage = false;

// Extra delay time to sound the horn. (in seconds)
var hornTimeDelayMin = 10;
var hornTimeDelayMax = 15;

// Ignore all safety measure such as check horn image visible before sounding it, highly recommanded to turn off. (true/false)
var aggressiveMode = false;

// Enable trap check once an hour. (true/false)
var enableTrapCheck = true;

// Extra delay time to trap check. Workable if enableTrapCheck is turn on. (in seconds)
var checkTimeDelayMin = 0;
var checkTimeDelayMax = 60;

// Interval time between two King's Reward, use in King's Reward related calculation. (in seconds)
var kingTimeIntervalMin = 7200;

// Play sound when encounter king's reward. (true/false)
var isKingWarningSound = true;

// Default time to reload the page when bot encounter error. (in seconds)
var errorReloadTime = 10;

// ===========================/UserPreferenceSetting===========================

// =====================UserPreferenceSetting(Experiment)=====================
// The variable in this section contain features that are still under experiement state.
// By default it should not cause any problem to normal execution script.
// Edit the variable here if you want to try out the experiemental features.

// Pause the script before it encounter King's Reward (true/false)
var pauseBeforeKing = false;

// Duration of pausing the script before King's Reward before resume it again. (in seconds)
var scriptPauseTimeMax = 18000;

// The script will pause if player at different location that hunt location set before (true/false)
// Make sure you set showTimerInPage to true in order to know what is happening.
var pauseAtInvalidLocation = false;

// =====================/UserPreferenceSetting(Experiment)=====================


// WARNING - Do not modify the code below unless you know what you are doing.

// All global variable declaration and default value
var scriptVersion = "1.13";
var hornTime = 900;
var hornTimeDelay = 0;
var checkTime;
var checkTimeDelay = 0;
var isKingReward = false;
var nextKingTime = kingTimeIntervalMin;
var kingPauseTime = scriptPauseTimeMax;
var baitQuantity = -1;
var huntLocation;
var currentLocation;
var today = new Date();
var checkTime = 3600 - (today.getMinutes() * 60 + today.getSeconds());
today = null;

// element in page
var titleElement;
var nextHornTimeElement;
var checkTimeElement;
var kingTimeElement;
var optionElement;
var travelElement;

// start executing script
exeScript();

function exeScript()
{
	if (window.location.href == "http://www.facebook.com/common/error.html" ||
		window.location.href == "http://apps.facebook.com/sorry.php?msg=account")
	{
		// facebook encounter error
		document.title = "Encounter error. Reloading in " + timeformat(errorReloadTime);
		window.setTimeout(function () { window.location.href = "http://apps.facebook.com/mousehunt/" }, errorReloadTime * 1000);
	}
	else if (window.location.href == "http://apps.facebook.com/mousehunt/" || 
		window.location.href == "http://apps.facebook.com/mousehunt/#" || 
		window.location.href.indexOf(".facebook.com/mousehunt/?ref=bookmarks") != -1 || 
		window.location.href.indexOf(".facebook.com/mousehunt/?ref=canvas_bkmk_top") != -1 || 
		window.location.href.indexOf(".facebook.com/mousehunt/index.php") !=  -1 || 
		window.location.href.indexOf(".facebook.com/mousehunt/mousehunt/index.php") !=  -1 ||
		window.location.href.indexOf(".facebook.com/mousehunt/turn.php") != -1)
	{
		// check if the page don't have resume button, if got just click on it.
		if (!checkResumeButton())
		{
			// this is the page to execute the script
			if (retrieveDataFirst())
			{
				// embed a place where timer show
				embedTimer(true);
				
				// start script action
				action();
			}
			else
			{
				// fail to retrieve data
				document.title = "Fail to retrieve data. Reloading in " + timeformat(errorReloadTime);
				window.setTimeout(function () { window.location.href = "http://apps.facebook.com/mousehunt/" }, errorReloadTime * 1000);
			}
		}
	}
	else if (window.location.href.indexOf(".facebook.com/mousehunt/travel.php") != -1 || 
		window.location.href.indexOf(".facebook.com/mousehunt/travel.php#") != -1)
	{
		// other page just show the title of autobot version
		embedTimer(false);
	}
	else
	{
		// other page just show the title of autobot version
		embedTimer(false);
	}
}

function retrieveDataFirst()
{
	var gotHornTime = false;
	var gotPuzzle = false;
	var gotBaitQuantity = false;
	var retrieveSuccess = false;
	
	var scriptElementList = document.getElementsByTagName('script');
	if (scriptElementList)
	{
		var i;
		for (i = 0; i < scriptElementList.length; ++i)
		{
			var scriptString = scriptElementList[i].innerHTML;
			
			if (!aggressiveMode)
			{
				var activeTurnWaitStartIndex = scriptString.indexOf("activeturn_wait_seconds");
				if (activeTurnWaitStartIndex >= 0)
				{
					activeTurnWaitStartIndex += 26;
					var activeTurnWaitEndIndex = scriptString.indexOf(",", activeTurnWaitStartIndex);
					var activeTurnWaitString = scriptString.substring(activeTurnWaitStartIndex, activeTurnWaitEndIndex);
					var activeTurnWait = parseInt(activeTurnWaitString);
					
					var lastActiveTurnStartIndex = scriptString.indexOf("last_activeturn_timestamp");
					if (lastActiveTurnStartIndex >= 0)
					{
						lastActiveTurnStartIndex += 28;
						var lastActiveTurnEndIndex = scriptString.indexOf(",", lastActiveTurnStartIndex);
						var lastActiveTurnString = scriptString.substring(lastActiveTurnStartIndex, lastActiveTurnEndIndex);
						var lastActiveTurn = parseInt(lastActiveTurnString);
						var timeNow = parseInt((new Date()).getTime().toString().substring(0, 10));
						
						hornTimeDelay = hornTimeDelayMin + Math.round(Math.random() * (hornTimeDelayMax - hornTimeDelayMin));
						
						// safety mode, include extra delay like time in horn image appear
						hornTime = activeTurnWait - (timeNow - lastActiveTurn) + 3 + hornTimeDelay;
						
						gotHornTime = true;
						
						lastActiveTurnStartIndex = null;
						lastActiveTurnEndIndex = null;
						lastActiveTurnString = null;
						lastActiveTurn = null;
						timeNow = null;
					}
					
					activeTurnWaitStartIndex = null;
					activeTurnWaitEndIndex = null;
					activeTurnWaitString = null;
					activeTurnWait = null;
				}
			}
			else
			{
				// get next horn time
				var hornTimeStartIndex = scriptString.indexOf("next_activeturn_seconds");
				if (hornTimeStartIndex >= 0)
				{
					var nextActiveTime = 900;
				
					hornTimeStartIndex += 26;
					var hornTimeEndIndex = scriptString.indexOf(",", hornTimeStartIndex);
					var hornTimerString = scriptString.substring(hornTimeStartIndex, hornTimeEndIndex);
					nextActiveTime = parseInt(hornTimerString);
					
					hornTimeDelay = hornTimeDelayMin + Math.round(Math.random() * (hornTimeDelayMax - hornTimeDelayMin));
					
					// aggressive mode, no extra delay like time in horn image appear
					hornTime = nextActiveTime + hornTimeDelay;
					
					gotHornTime = true;
					
					hornTimeStartIndex = null;
					hornTimeEndIndex = null;
					hornTimerString = null;
					nextActiveTime = null;
				}
			}
			
			// get is king's reward or not
			var hasPuzzleStartIndex = scriptString.indexOf("has_puzzle");
			if (hasPuzzleStartIndex >= 0)
			{
				hasPuzzleStartIndex += 13;
				var hasPuzzleEndIndex = scriptString.indexOf(",", hasPuzzleStartIndex);
				var hasPuzzleString = scriptString.substring(hasPuzzleStartIndex, hasPuzzleEndIndex);
				isKingReward = (hasPuzzleString == 'false') ? false : true;
				
				gotPuzzle = true;
				
				hasPuzzleStartIndex = null;
				hasPuzzleEndIndex = null;
				hasPuzzleString = null;
			}
			
			// get cheese quantity
			var baitQuantityStartIndex = scriptString.indexOf("bait_quantity");
			if (baitQuantityStartIndex >= 0)
			{
				baitQuantityStartIndex += 16;
				var baitQuantityEndIndex = scriptString.indexOf(",", baitQuantityStartIndex);
				var baitQuantityString = scriptString.substring(baitQuantityStartIndex, baitQuantityEndIndex);
				baitQuantity = parseInt(baitQuantityString);
				
				gotBaitQuantity = true;
				
				baitQuantityStartIndex = null;
				baitQuantityEndIndex = null;
				baitQuantityString = null;
			}
			
			var locationStartIndex = scriptString.indexOf("location\\\":\\\"");
			if (locationStartIndex >= 0)
			{
				locationStartIndex += 13;
				var locationEndIndex = scriptString.indexOf("\\", locationStartIndex);
				var locationString = scriptString.substring(locationStartIndex, locationEndIndex);
				currentLocation = locationString;
				
				locationStartIndex = null;
				locationEndIndex = null;
				locationString = null;
			}
			
			scriptString = null;
		}
		i = null;
	}
	scriptElementList = null;
	
	if (gotHornTime && gotPuzzle && gotBaitQuantity)
	{
		// get trap check time
		if (enableTrapCheck)
		{
			var today = new Date();
			checkTimeDelay = checkTimeDelayMin + Math.round(Math.random() * (checkTimeDelayMax - checkTimeDelayMin));
			checkTime = 3600 - (today.getMinutes() * 60 + today.getSeconds()) + checkTimeDelay;
			today = null;
		}
	
		// get next king's reward time
		var nowDate = (new Date()).getTime();
		var lastKingRewardDate = getCookie("lastKingReward");
		if (lastKingRewardDate == " ")
		{
			setCookie("lastKingReward", nowDate, 1);
			nextKingTime = kingTimeIntervalMin;
		}
		else
		{
			var timeLeft = kingTimeIntervalMin - parseInt((nowDate - lastKingRewardDate) / 1000);
			if (timeLeft < 0)
			{
				setCookie("lastKingReward", nowDate, 1);
				nextKingTime = kingTimeIntervalMin;
			}
			else
			{
				nextKingTime = timeLeft;
			}
			timeLeft = null;
		}
		nowDate = null;
		lastKingRewardDate = null;
		
		// get last location
		var huntLocationCookie = getCookie("huntLocation");
		if (huntLocationCookie == " ")
		{
			huntLocation = currentLocation;
			setCookie("huntLocation", currentLocation, 90);
		}
		else
		{
			huntLocation = huntLocationCookie;
			setCookie("huntLocation", huntLocation, 90);
		}
		huntLocationCookie = null;
		
		retrieveSuccess = true;
	}
	else
	{
		retrieveSuccess = false;
	}
	
	// clean up
	gotHornTime = null;
	gotPuzzle = null;
	gotBaitQuantity = null;
	
	return (retrieveSuccess);
}

function retrieveData()
{
	// check if the tiny mouse is there
	var imgElementList = document.getElementsByTagName('img');
	if (imgElementList)
	{
		var i;
		for (i = 0; i < imgElementList.length; ++i)
		{
			// data timed out
			if (imgElementList[i].getAttribute('src') == 'http://mousehunt.facebook.hitgrab.com/images/ui/splash/tiny_230.jpg')
			{
				// update timer
				displayTimer("Data timed out. Reloading...", "Data timed out. Reloading...", "Data timed out. Reloading...", "Data timed out. Reloading...");
			
				// the tiny mouse is there (data fetch fail), reload the page!
				window.location.href = "http://apps.facebook.com/mousehunt/";
			}
		}
		i = null;
	}
	imgElementList = null;
	
	// get next horn time
	hornTimeDelay = hornTimeDelayMin + Math.round(Math.random() * (hornTimeDelayMax - hornTimeDelayMin));
	var activeTurnWait;
	var nextActiveTime;
	var lastActiveTurn;
	try
	{
		// for firefox + greasmonkey
		activeTurnWait = unsafeWindow.a10337532241_user.activeturn_wait_seconds;
		nextActiveTime = unsafeWindow.a10337532241_user.next_activeturn_seconds;
		lastActiveTurn = unsafeWindow.a10337532241_user.last_activeturn_timestamp;
		isKingReward = unsafeWindow.a10337532241_user.has_puzzle;
		baitQuantity = unsafeWindow.a10337532241_user.bait_quantity;
		currentLocation = unsafeWindow.a10337532241_user.location;
	}
	catch(e)
	{
		try
		{
			// for opera
			activeTurnWait = a10337532241_user.activeturn_wait_seconds;
			nextActiveTime = a10337532241_user.next_activeturn_seconds;
			lastActiveTurn = a10337532241_user.last_activeturn_timestamp;
			isKingReward = a10337532241_user.has_puzzle;
			baitQuantity = a10337532241_user.bait_quantity;
			currentLocation = a10337532241_user.location;
		}
		catch(e)
		{
			try
			{
				// chrome
				activeTurnWait = parseInt(getPageVariableForChrome("a10337532241_user.activeturn_wait_seconds"));
				nextActiveTime = parseInt(getPageVariableForChrome("a10337532241_user.next_activeturn_seconds"));
				lastActiveTurn = parseInt(getPageVariableForChrome("a10337532241_user.last_activeturn_timestamp"));
				isKingReward = (getPageVariableForChrome("a10337532241_user.has_puzzle").toString() == "false") ? false : true;
				baitQuantity = parseInt(getPageVariableForChrome("a10337532241_user.bait_quantity"));
				currentLocation = getPageVariableForChrome("a10337532241_user.location");
			}
			catch(e)
			{
				// update timer
				displayTimer("Fail to retrieve data. Reloading...", "Fail to retrieve data. Reloading...", "Fail to retrieve data. Reloading...", "Fail to retrieve data. Reloading...");
			
				// if everything fail... refresh the page...
				window.location.href = "http://apps.facebook.com/mousehunt/";
			}
		}
	}
	
	if (nextActiveTime != 0 && (nextActiveTime == "" || isNaN(nextActiveTime)))
	{
		// fail to retrieve data, might be due to slow network
		
		// update timer
		displayTimer("Fail to retrieve data. Reloading...", "Fail to retrieve data. Reloading...", "Fail to retrieve data. Reloading...", "Fail to retrieve data. Reloading...");
		
		// reload the page to see it fix the problem
		window.location.href = "http://apps.facebook.com/mousehunt/";
	}
	else
	{
		// got the timer right!
	
		if (!aggressiveMode)
		{
			var timeNow = parseInt((new Date()).getTime().toString().substring(0, 10));
		
			// safety mode, include extra delay like time in horn image appear
			hornTime = activeTurnWait - (timeNow - lastActiveTurn) + 3 + hornTimeDelay;
			
			timeNow = null;
		}
		else
		{
			// aggressive mode, no extra delay like time in horn image appear
			hornTime = nextActiveTime + hornTimeDelay;
		}
	}
	nextActiveTime = null;
	lastActiveTurn = null;
	
	// get trap check time
	if (enableTrapCheck)
	{
		var today = new Date();
		checkTimeDelay = checkTimeDelayMin + Math.round(Math.random() * (checkTimeDelayMax - checkTimeDelayMin));
		checkTime = 3600 - (today.getMinutes() * 60 + today.getSeconds()) + checkTimeDelay;
		today = null;
	}
}

function action()
{
	if (isKingReward)
	{
		// update timer
		displayTimer("King's Reward!", "-", "-", "Now!");
		displayLocation("-");
		
		// play music if needed
		if (isKingWarningSound)
		{
			var kingSound = document.createElement("div");
			kingSound.innerHTML = "<embed name=\"kingreward\" src=\"http://images.norack.info/prodigy_-_girls.mid\" type=\"audio/midi\" autostart=\"true\" hidden=\"true\" loop=\"true\" mastersound enablejavascript=\"true\"><noembed><bgsound src=\"http://images.norack.info/prodigy_-_girls.mid\" loop=\"infinite\"></noembed></embed>";
			document.getElementById("content").appendChild(kingSound);
		}
		
		// focus on the answer input
		var answerElement = document.getElementById('app10337532241_puzzle_answer');
		if (answerElement)
		{
			answerElement.focus();
		}
		answerElement = null;
		
		// remove king's reward time
		setCookie("lastKingReward", "", -1);
	}
	else if (pauseAtInvalidLocation && (huntLocation != currentLocation))
	{
		// update timer
		displayTimer("Out of pre-defined hunting location...", "Out of pre-defined hunting location...", "Out of pre-defined hunting location...", "Out of pre-defined hunting location...");
		displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='var d=new Date();d.setDate(d.getDate());document.cookie=\"huntLocation=cancel;expires=\"+d.toGMTString();d=null;' href='http://apps.facebook.com/mousehunt\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
		
		// pause script
	}
	else if (baitQuantity == 0)
	{
		// update timer
		displayTimer("No more cheese!", "Cannot hunt without the cheese...", "Cannot hunt without the cheese...", "-");
		displayLocation(huntLocation);
		
		// pause the script
	}
	else
	{
		// update location
		displayLocation(huntLocation);
	
		var isHornSounding = false;
	
		// check if the horn image is visible
		var headerElement = document.getElementById('app10337532241_header');
		if (headerElement)
		{
			var headerStatus = headerElement.getAttribute('class');
			if (headerStatus.indexOf("hornready") != -1)
			{
				// if the horn image is visible, why do we need to wait any more, sound the horn!
				soundHorn();
				
				// make sure the timer don't run twice!
				isHornSounding = true;
			}
			headerStatus = null;
		}
		headerElement = null;
	
		if (isHornSounding == false)
		{
			// start timer
			window.setTimeout(function () { countdownTimer() }, 1000);
		}
		
		isHornSounding = null;
	}
}

function countdownTimer()
{
	if (isKingReward)
	{
		// update timer
		displayTimer("King's Reward!", "-", "-", "Now!");
		
		// record king's reward time
		setCookie("lastKingReward", "", -1);
		
		// reload the page so that the sound can be play
		// simulate mouse click on the camp button
		fireEvent(document.getElementsByClassName('campbutton')[0].firstChild, 'click');
		window.setTimeout(function () { window.location.href = "http://apps.facebook.com/mousehunt/"; }, 5000);
	}
	else if (pauseAtInvalidLocation && (huntLocation != currentLocation))
	{
		// update timer
		displayTimer("Out of pre-defined hunting location...", "Out of pre-defined hunting location...", "Out of pre-defined hunting location...", "Out of pre-defined hunting location...");
		displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='var d=new Date();d.setDate(d.getDate());document.cookie=\"huntLocation=cancel;expires=\"+d.toGMTString();d=null;' href='http://apps.facebook.com/mousehunt\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
		
		// pause script
	}
	else if (baitQuantity == 0)
	{
		// update timer
		displayTimer("No more cheese!", "Cannot hunt without the cheese...", "Cannot hunt without the cheese...", "-");
		displayLocation(huntLocation);
		
		// pause the script
	}
	else
	{
		if (hornTime <= 0)
		{
			// blow the horn!
			soundHorn();
		}
		else if (enableTrapCheck && checkTime <= 0)
		{
			// update timer
			displayTimer("Checking The Trap...", "Checking trap now...", "Checking trap now...", "Checking trap now...");
			
			// simulate mouse click on the camp button
			fireEvent(document.getElementsByClassName('campbutton')[0].firstChild, 'click');
			window.setTimeout(function () { window.location.href = "http://apps.facebook.com/mousehunt/"; }, 5000);
		}
		else if (pauseBeforeKing && nextKingTime <= 0)
		{
			kingPauseTime = scriptPauseTimeMax;
			countdownPauseTimer();
		}
		else
		{
			if (enableTrapCheck)
			{
				--hornTime;
				--checkTime;
				--nextKingTime;
				
				// update timer
				if (!aggressiveMode)
				{
					displayTimer("Horn: " + timeformat(hornTime) + " | Check: " + timeformat(checkTime) + " | King: " + timeformat(nextKingTime), 
						timeformat(hornTime) + "  <i>(included extra " + timeformat(hornTimeDelay) + " delay & +/- 5 seconds different from MouseHunt timer)</i>", 
						timeformat(checkTime) + "  <i>(included extra " + timeformat(checkTimeDelay) + " delay)</i>", 
						timeformat(nextKingTime) + "  <i>(approximately)</i>");
				}
				else
				{
					displayTimer("Horn: " + timeformat(hornTime) + " | Check: " + timeformat(checkTime) + " | King: " + timeformat(nextKingTime), 
						timeformat(hornTime) + "  <i>(included extra " + timeformat(hornTimeDelay) + " delay & lot faster than MouseHunt timer)</i>", 
						timeformat(checkTime) + "  <i>(included extra " + timeformat(checkTimeDelay) + " delay)</i>", 
						timeformat(nextKingTime) + "  <i>(approximately)</i>");
				}
			}
			else
			{
				--hornTime;
				--nextKingTime;
				
				// update timer
				if (!aggressiveMode)
				{
					displayTimer("Horn: " + timeformat(hornTime) + " | King: " + timeformat(nextKingTime), 
						timeformat(hornTime) + "  <i>(included extra " + timeformat(hornTimeDelay) + " delay & +/- 5 seconds different from MouseHunt timer)</i>", 
						"-", 
						timeformat(nextKingTime) + "  <i>(approximately)</i>");
				}
				else
				{
					displayTimer("Horn: " + timeformat(hornTime) + " | King: " + timeformat(nextKingTime), 
						timeformat(hornTime) + "  <i>(included extra " + timeformat(hornTimeDelay) + " delay & lot faster than MouseHunt timer)</i>", 
						"-", 
						timeformat(nextKingTime) + "  <i>(approximately)</i>");
				}
			}
			window.setTimeout(function () { (countdownTimer)() }, 1000);
		}
	}
}

function countdownPauseTimer()
{
	if (pauseBeforeKing)
	{
		if (kingPauseTime <= 0)
		{
			// update timer
			displayTimer("Pause before King's Reward - Resuming...", "-", "-", "Pause before King's Reward - Resuming...");
			
			// simulate mouse click on the camp button
			fireEvent(document.getElementsByClassName('campbutton')[0].firstChild, 'click');
			window.setTimeout(function () { window.location.href = "http://apps.facebook.com/mousehunt/"; }, 5000);
		}
		else
		{
			--kingPauseTime;
			
			// update timer
			displayTimer("Pause before King's Reward - Resume in " + timeformat(kingPauseTime), 
				"-", 
				"-", 
				"Resume in " + timeformat(kingPauseTime));
			
			window.setTimeout(function () { (countdownPauseTimer)() }, 1000);
		}
	}
}

function embedTimer(targetPage)
{
	if (showTimerInPage)
	{
		var headerElement = document.getElementById('app10337532241_noscript');
		if (headerElement)
		{
			var timerDivElement = document.createElement('div');
			
			var hr1Element = document.createElement('hr');
			timerDivElement.appendChild(hr1Element);
			
			titleElement = document.createElement('div');
			titleElement.setAttribute('id', 'titleElement');
			if (targetPage && aggressiveMode)
			{
				titleElement.innerHTML = "<b>MouseHunt AutoBot (version " + scriptVersion + ")</b> - <font color='red'>Aggressive Mode</font>";
			}
			else
			{
				titleElement.innerHTML = "<b>MouseHunt AutoBot (version " + scriptVersion + ")</b>";
			}
			timerDivElement.appendChild(titleElement);
			
			if (targetPage)
			{
				nextHornTimeElement = document.createElement('div');
				nextHornTimeElement.setAttribute('id', 'nextHornTimeElement');
				nextHornTimeElement.innerHTML = "<b>Next Hunter Horn Time:</b> Loading...";
				timerDivElement.appendChild(nextHornTimeElement);
				
				checkTimeElement = document.createElement('div');
				checkTimeElement.setAttribute('id', 'checkTimeElement');
				checkTimeElement.innerHTML = "<b>Next Trap Check Time:</b> Loading...";
				timerDivElement.appendChild(checkTimeElement);
				
				kingTimeElement = document.createElement('div');
				kingTimeElement.setAttribute('id', 'kingTimeElement');
				kingTimeElement.innerHTML = "<b>Next King's Reward Time:</b> Loading...";
				timerDivElement.appendChild(kingTimeElement);
				
				// get pause before king value
				var pauseBeforeKingCookie = getCookie("pauseBeforeKing");
				if (pauseBeforeKingCookie == " ")
				{
					setCookie("pauseBeforeKing", pauseBeforeKing, 90);
				}
				else
				{
					pauseBeforeKing = (pauseBeforeKingCookie == 'true') ? true : false;
					setCookie("pauseBeforeKing", pauseBeforeKing, 90);
				}
				pauseBeforeKingCookie = null;
				
				optionElement = document.createElement('div');
				optionElement.setAttribute('id', 'optionElement');
				if (pauseBeforeKing)
				{
					optionElement.innerHTML = "<b>King's Reward Option:</b> Pause before King's Reward [<a onclick='var d=new Date();d.setDate(d.getDate()+1);document.cookie=\"pauseBeforeKing=false;expires=\"+d.toGMTString();d=null;' href='http://apps.facebook.com/mousehunt'>Enable</a>] - <i>King's Reward timer maybe inaccurate and may still trigger King's Reward if use incorrectly.</i>";
				}
				else
				{
					optionElement.innerHTML = "<b>King's Reward Option:</b> Pause before King's Reward [<a onclick='var d=new Date();d.setDate(d.getDate()+1);document.cookie=\"pauseBeforeKing=true;expires=\"+d.toGMTString();d=null;' href='http://apps.facebook.com/mousehunt'>Disable</a>]";
				}
				timerDivElement.appendChild(optionElement);
				
				if (pauseAtInvalidLocation)
				{
					// location information
					travelElement = document.createElement('div');
					travelElement.setAttribute('id', 'travelElement');
					travelElement.innerHTML = "<b>Hunt Location:</b> Loading...";
					timerDivElement.appendChild(travelElement);
				}
			}
			else
			{
				var helpTextElement = document.createElement('div');
				helpTextElement.setAttribute('id', 'helpTextElement');
				helpTextElement.innerHTML = "<b>Note:</b> MouseHunt AutoBot will only run at <a href='http://apps.facebook.com/mousehunt/'>Hunter Camp</a>. This is to prevent the bot from interfering user's activity.";
				timerDivElement.appendChild(helpTextElement);
				
				helpTextElement = null;
			}
			
			var hr2Element = document.createElement('hr');
			timerDivElement.appendChild(hr2Element);
			
			headerElement.parentNode.insertBefore(timerDivElement, headerElement);
			
			timerDivElement = null;
			hr1Element = null;
			titleElement = null;
			hr2Element = null;
		}
		headerElement = null;
	}
}

function displayTimer(title, nextHornTime, checkTime, kingTime)
{
	if (showTimerInTitle)
	{
		document.title = title;
	}
	
	if (showTimerInPage)
	{
		nextHornTimeElement.innerHTML = "<b>Next Hunter Horn Time:</b> " + nextHornTime;
		checkTimeElement.innerHTML = "<b>Next Trap Check Time:</b> " + checkTime;
		kingTimeElement.innerHTML = "<b>Next King's Reward Time:</b> " + kingTime;
	}
	
	title = null;
	nextHornTime = null;
	checkTime = null;
	kingTime = null;
}

function displayLocation(locStr)
{
	if (showTimerInPage && pauseAtInvalidLocation)
	{
		travelElement.innerHTML = "<b>Hunt Location:</b> " + locStr;
	}
}

function timeformat(time)
{
	var timeString;
	var hr = Math.floor(time / 3600);
	var min = Math.floor((time % 3600) / 60);
	var sec = (time % 3600 % 60) % 60;
	
	if (hr > 0)
	{
		timeString = hr.toString() + " hr " + min.toString() + " min " + sec.toString() + " sec";
	}
	else if (min > 0)
	{
		timeString = min.toString() + " min " + sec.toString() + " sec";
	}
	else
	{
		timeString = sec.toString() + " sec";
	}
	
	time = null;
	hr = null;
	min = null;
	sec = null;
	
	return (timeString);
}

function setCookie(c_name, value, expiredays)
{
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	
	document.cookie = c_name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires=" + exdate.toGMTString());
	
	c_name = null;
	value = null;
	expiredays = null;
	exdate = null;
}

function getCookie(c_name)
{
	var value = " ";

	if (document.cookie.length > 0)
	{
		var c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1)
		{
			c_start = c_start + c_name.length + 1;
			var c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1)
			{
				c_end = document.cookie.length;
			}
			value = unescape(document.cookie.substring(c_start, c_end));
			c_end = null;
		}
		c_start = null;
	}
	
	c_name = null;
	
	return value;
}

function escapeChar(oriStr)
{
	var escapeStr = "";
	var i;
	for (i = 0; i < oriStr.length; ++i)
	{
		if (oriStr[i] == "'")
		{
			escapeStr += "\\" + oriStr[i];
		}
		else
		{
			escapeStr += oriStr[i];
		}
	}
	i = null;
	
	return (escapeStr);
}

function fireEvent(element, event)
{
	if (document.createEventObject)
	{
		// dispatch for IE
		var evt = document.createEventObject();
		return element.fireEvent('on' + event, evt)
	}
	else
	{
		// dispatch for firefox + others
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent(event, true, true ); // event type,bubbling,cancelable
		return !element.dispatchEvent(evt);
	}
}

function getPageVariableForChrome(variableName)
{
	// google chrome only
	var scriptElement = document.createElement("script");
	scriptElement.setAttribute('id', "scriptElement");
	scriptElement.setAttribute('type', "text/javascript");
	scriptElement.innerHTML = "document.getElementById('scriptElement').innerText=" + variableName + ";";
	document.body.appendChild(scriptElement);
	
	var value = scriptElement.innerHTML;
	document.body.removeChild(scriptElement);
	scriptElement = null;
	
	return value;
}

function checkResumeButton()
{
	var found = false;
	var linkElementList = document.getElementsByTagName('a');
	if (linkElementList)
	{
		var i;
		for (i = 0; i < linkElementList.length; ++i)
		{
			// check if it is a resume button
			if (linkElementList[i].getAttribute('href') == "http://apps.facebook.com/mousehunt/index.php" && linkElementList[i].getAttribute('class') == "active")
			{
				// found resume button
				
				// simulate mouse click on the horn
				fireEvent(linkElementList[i], 'click');
				
				// reload url if click fail
				window.setTimeout(function () { window.location.href = "http://apps.facebook.com/mousehunt/"; }, 5000);
				
				found = true;
			}
		}
		i = null;
	}
	
	linkElementList = null;
	
	return (found);
}

function soundHorn()
{
	// update timer
	displayTimer("Ready to Blow The Horn...", "Ready to Blow The Horn...", "Ready to Blow The Horn...", "Ready to Blow The Horn...");
	
	if (!aggressiveMode)
	{
		// safety mode, check the horn image is there or not before sound the horn
	
		var headerElement = document.getElementById('app10337532241_header');
		if (headerElement)
		{
			// need to make sure that the horn image is ready before we can click on it
			var headerStatus = headerElement.getAttribute('class');
			if (headerStatus.indexOf("hornready") != -1)
			{
				// found the horn image, let's sound the horn!
				
				// update timer
				displayTimer("Blowing The Horn...", "Blowing The Horn...", "Blowing The Horn...", "Blowing The Horn...");
				
				// simulate mouse click on the horn
				fireEvent(document.getElementsByClassName('hornbutton')[0].firstChild, 'click');
				
				// double check if the horn was already sounded
				window.setTimeout(function () { afterSoundingHorn() }, 5000);
			}
			else if (headerStatus.indexOf("hornsounding") != -1 || headerStatus.indexOf("hornsounded") != -1)
			{
				// some one just sound the horn...
				
				// update timer
				displayTimer("Synchronizing Data...", "Someone had just sound the horn. Synchronizing data...", "Someone had just sound the horn. Synchronizing data...", "Someone had just sound the horn. Synchronizing data...");
				
				// load the new data
				window.setTimeout(function () { afterSoundingHorn() }, 5000);
			}
			else
			{
				// no horn appear!?!
				
				// update timer
				displayTimer("Synchronizing Data...", "Hunter horn not found. Synchronizing data...", "Hunter horn not found. Synchronizing data...", "Hunter horn not found. Synchronizing data...");
				
				// sync the time again, maybe user already click the horn
				retrieveData();
				
				// loop again
				window.setTimeout(function () { countdownTimer() }, 1000);
			}
			headerStatus = null;
		}
		else
		{
			// something wrong, can't even found the header...
					
			// reload the page see if thing get fixed
			window.location.href = "http://apps.facebook.com/mousehunt/";
		}
		headerElement = null;
	}
	else
	{
		// aggressive mode, ignore whatever horn image is there or not, just sound the horn!
		
		// simulate mouse click on the horn
		fireEvent(document.getElementsByClassName('hornbutton')[0].firstChild, 'click');
		
		// double check if the horn was already sounded
		window.setTimeout(function () { afterSoundingHorn() }, 3000);
	}
}

function afterSoundingHorn()
{
	var headerElement = document.getElementById('app10337532241_header');
	if (headerElement)
	{
		// double check if the horn image is still visible after the script already sound it
		var headerStatus = headerElement.getAttribute('class');
		if (headerStatus.indexOf("hornready") != -1)
		{
			// seen like the horn is not functioning well
			
			// update timer
			displayTimer("Blowing The Horn Again...", "Blowing The Horn Again...", "Blowing The Horn Again...", "Blowing The Horn Again...");
			
			// simulate mouse click on the horn
			fireEvent(document.getElementsByClassName('hornbutton')[0].firstChild, 'click');
			
			// check again later
			window.setTimeout(function () { afterSoundingHorn() }, 1000);
		}
		else if (headerStatus.indexOf("hornsounding") != -1)
		{
			// the horn is already sound, but the network seen to slow on fetching the data
			
			// update timer
			displayTimer("The horn sounding taken extra longer than normal...", "The horn sounding taken extra longer than normal...", "The horn sounding taken extra longer than normal...", "The horn sounding taken extra longer than normal...");
			
			// check again later
			window.setTimeout(function () { afterSoundingHorn() }, 1000);
		}
		else
		{
			// everything look ok
			
			// update timer
			displayTimer("Horn sounded. Synchronizing Data...", "Horn sounded. Synchronizing data...", "Horn sounded. Synchronizing data...", "Horn sounded. Synchronizing data...");
			
			// reload data
			retrieveData();
			
			// script continue as normal
			window.setTimeout(function () { countdownTimer() }, 1000);
		}
		headerStatus = null;
	}
	headerElement = null;
}
